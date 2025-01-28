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

  @Post()
  async createNote(
    @Headers('authorization') authHeader: string,
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<void> {
    await this.notesService.create(authHeader, createNoteDto);
  }

  @Put(':id')
  async updateNote(
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<void> {
    await this.notesService.update(authHeader, id, updateNoteDto);
  }

  @Delete(':id')
  async remove(
    @Headers('authorization') authHeader: string,
    @Param('id') id: number,
  ): Promise<void> {
    return this.notesService.remove(authHeader, id);
  }
}
