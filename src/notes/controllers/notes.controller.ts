import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NotesService } from '../providers/notes.service';
import { Note } from '../note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<void> {
    this.notesService.create(createNoteDto);
  }
  
  @Put(':id')
  async updateNote(@Param('id') id: number, @Body() createNoteDto: UpdateNoteDto): Promise<void> {
    this.notesService.update(id, createNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.notesService.remove(id);
  }
}
