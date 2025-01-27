import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, decode } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { TokenInterface } from '../interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<{ token: string } | null> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token: string = sign({ userId: user?.id }, 'super-secret-key', {
      expiresIn: '1h',
    });

    return { token };
  }

  async register(registerDto: RegisterDto): Promise<void> {
    const { firstName, lastName, username, password } = registerDto;

    const user = await this.usersRepository.findOneBy({ username });

    if (user) {
      throw new NotFoundException('The username is already registered');
    }

    const registerUser = this.usersRepository.create({
      firstName,
      lastName,
      username,
      password,
    });

    await this.usersRepository.save(registerUser);
  }

  async getUserFromAuthHeader(authHeader: string): Promise<User> {
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new NotAcceptableException('Authorization header is not valid');
    }

    const tokenMatch = authHeader.match(/^Bearer\s+(\S+)$/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      throw new NotFoundException('Authorization token not found');
    }

    const decodedToken: TokenInterface | null = decode(
      token,
    ) as TokenInterface | null;
    
    if (!decodedToken || !decodedToken.userId) {
      throw new NotFoundException('Invalid token: userId not found');
    }

    const userId: number = decodedToken.userId;

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
