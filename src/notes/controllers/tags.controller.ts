import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TagsService } from '../providers/tags.service';
import { FindOptionsOrderValue } from 'typeorm';
import { Tag } from '../tag.entity';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async findAll(
    @Headers('authorization') authHeader: string,
    @Query('order') order: FindOptionsOrderValue,
    @Query('orderBy') orderBy: string,
    @Query('archiveView') archiveView: string,
  ): Promise<Tag[]> {
    return this.tagsService.findAll(authHeader, order, orderBy);
  }

  @Post()
  async createTag(
    @Headers('authorization') authHeader: string,
    @Body() createTagDto: CreateTagDto,
  ): Promise<void> {
    await this.tagsService.create(authHeader, createTagDto);
  }

  @Put(':id')
  async updateTag(
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<void> {
    await this.tagsService.update(authHeader, id, updateTagDto);
  }

  @Delete(':id')
  async remove(
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
  ): Promise<void> {
    return this.tagsService.remove(authHeader, id);
  }
}
