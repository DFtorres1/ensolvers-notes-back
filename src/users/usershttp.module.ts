import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UsersService } from './providers/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class UsersHttpModule {}
