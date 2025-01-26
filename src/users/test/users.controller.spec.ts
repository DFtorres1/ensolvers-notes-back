import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../providers/users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('root', () => {
    it('should return users', () => {
      expect(usersController.getUsers()).toBe('users');
    });
  });
});
