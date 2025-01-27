import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../note.entity';
import { Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { User } from 'src/users/user.entity';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id });
  }

  async create(createNoteDto: CreateNoteDto): Promise<void> {
    const user = await this.userRepository.findOneBy({
      id: createNoteDto.userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const note = this.noteRepository.create({
      title: createNoteDto.title,
      content: createNoteDto.content,
      user,
    });

    await this.noteRepository.save(note);
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<void> {
    const { title, content, isActive } = updateNoteDto;
    await this.noteRepository.update(id, {
      title,
      content,
      isActive,
    });
  }

  async remove(id: number): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
