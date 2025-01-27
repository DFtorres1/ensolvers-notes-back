import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersModule } from './users.module';
import { UsersService } from './providers/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';

@Module({
  imports: [UsersModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class UsersHttpModule {}
