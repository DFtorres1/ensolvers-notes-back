import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../note.entity';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import { AuthService } from 'src/users/providers/auth.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    private authService: AuthService,
  ) {}

  async findAll(
    authHeader: string,
    order: FindOptionsOrderValue,
    orderBy: string,
    archiveView: string,
  ): Promise<Note[]> {
    if (!order || !orderBy || !archiveView) {
      throw new NotFoundException('Parameters not found');
    }
    const archiveViewBoolean = archiveView === 'true';

    const user = await this.authService.getUserFromAuthHeader(authHeader);

    return this.noteRepository.find({
      order: { id: order },
      where: { isActive: !archiveViewBoolean, user: { id: user.id } },
    });
  }

  async create(
    authHeader: string,
    createNoteDto: CreateNoteDto,
  ): Promise<void> {
    const user = await this.authService.getUserFromAuthHeader(authHeader);

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

  async update(
    authHeader: string,
    id: number,
    updateNoteDto: UpdateNoteDto,
  ): Promise<void> {
    const { title, content, isActive } = updateNoteDto;
    await this.noteRepository.update(id, {
      title,
      content,
      isActive,
    });
  }

  async remove(authHeader: string, id: number): Promise<void> {
    await this.noteRepository.delete(id);
  }
}
