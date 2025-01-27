import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../providers/auth.service';
import { LoginDto } from '../dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should return token', async () => {
      const tokenRegex = /^\w+\.\w+\.\w+$/;

      const loginDto = new LoginDto();
      loginDto.username = 'jane';
      loginDto.password = 'doe';

      const result = await authController.login(loginDto);

      expect(result?.token).toMatch(tokenRegex);
    });
  });
});
