import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { AuthService } from 'src/users/providers/auth.service';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    private authService: AuthService,
  ) {}

  async findAll(
    authHeader: string,
    order: FindOptionsOrderValue,
    orderBy: string,
  ): Promise<Tag[]> {
    if (!order || !orderBy) {
      throw new NotFoundException('Parameters not found');
    }

    const user = await this.authService.getUserFromAuthHeader(authHeader);

    return this.tagRepository.find({
      order: { id: order },
      where: { user: { id: user.id } },
    });
  }

  async create(authHeader: string, createTagDto: CreateTagDto): Promise<void> {
    const user = await this.authService.getUserFromAuthHeader(authHeader);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tag = this.tagRepository.create({
      name: createTagDto.name,
      color: createTagDto.color,
      user,
    });

    await this.tagRepository.save(tag);
  }

  async update(
    authHeader: string,
    id: number,
    updateTagDto: UpdateTagDto,
  ): Promise<void> {
    const { name, color } = updateTagDto;

    const user = await this.authService.getUserFromAuthHeader(authHeader);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tags = await this.tagRepository.find({
      where: { user: { id: user.id } },
    });

    if (!tags.some((tag) => tag.id === id)) {
      throw new NotFoundException('Tag does not belong to provided user');
    }

    await this.tagRepository.update(id, {
      name,
      color,
    });
  }

  async remove(authHeader: string, id: number): Promise<void> {
    const user = await this.authService.getUserFromAuthHeader(authHeader);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tags = await this.tagRepository.find({
      where: { user: { id: user.id } },
    });

    if (!tags.some((tag) => tag.id === id)) {
      throw new NotFoundException('Tag does not belong to provided user');
    }

    await this.tagRepository.delete(id);
  }
}
