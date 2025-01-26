import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UsersService } from '../providers/users.service';
import { User } from '../user.entity';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return this.usersService.getUsers();
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
