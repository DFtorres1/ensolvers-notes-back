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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async login(loginDto: LoginDto): Promise<any | null> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = sign({ userId: user?.id }, 'super-secret-key', {
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

    const decodedToken = decode(token) as { userId: number };
    const userId = decodedToken?.userId;

    if (!userId) {
      throw new NotFoundException('Invalid token: userId not found');
    }

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
