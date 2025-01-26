import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  getNotes(): string {
    return 'notes';
  }

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
