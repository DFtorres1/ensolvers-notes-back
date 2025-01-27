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
import { NotesService } from '../providers/notes.service';
import { Note } from '../note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { FindOptionsOrderValue } from 'typeorm';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(
    @Headers('authorization') authHeader: string,
    @Query('order') order: FindOptionsOrderValue,
    @Query('orderBy') orderBy: string,
    @Query('archiveView') archiveView: string,
  ): Promise<Note[]> {
    return this.notesService.findAll(authHeader, order, orderBy, archiveView);
  }

  @Get(':id')
  async findOne(
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
  ): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<void> {
    this.notesService.create(createNoteDto);
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: number,
    @Body() createNoteDto: UpdateNoteDto,
  ): Promise<void> {
    this.notesService.update(id, createNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.notesService.remove(id);
  }
}
