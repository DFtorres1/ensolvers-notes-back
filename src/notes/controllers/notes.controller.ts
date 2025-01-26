import { Controller, Delete, Get, Param } from '@nestjs/common';
import { NotesService } from '../providers/notes.service';
import { Note } from '../note.entity';

@Controller()
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getNotes(): string {
    return this.notesService.getNotes();
  }

  @Get()
  async findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.notesService.remove(id);
  }
}
