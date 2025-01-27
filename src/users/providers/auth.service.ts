import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
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
}
