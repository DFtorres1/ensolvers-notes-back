import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../note.entity';
import { FindOptionsOrderValue, In, Repository } from 'typeorm';
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
    let note;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (createNoteDto.tagsIds && createNoteDto.tagsIds.length > 0) {
      const tags = await this.noteRepository.find({
        where: { id: In(createNoteDto.tagsIds) },
      });

      if (tags.length !== createNoteDto.tagsIds.length) {
        throw new NotFoundException('One or more tags not found');
      }
      note = await this.noteRepository.create({
        title: createNoteDto.title,
        content: createNoteDto.content,
        tags,
        user,
      });
    } else {
      note = this.noteRepository.create({
        title: createNoteDto.title,
        content: createNoteDto.content,
        user,
      });
    }

    await this.noteRepository.save(note);
  }

  async update(
    authHeader: string,
    id: number,
    updateNoteDto: UpdateNoteDto,
  ): Promise<void> {
    const { title, content, isActive, tagsIds } = updateNoteDto;

    const user = await this.authService.getUserFromAuthHeader(authHeader);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notes = await this.noteRepository.find({
      where: { user: { id: user.id } },
    });

    if (!notes.some((note) => note.id === id)) {
      throw new NotFoundException('Note does not belong to provided user');
    }

    if (tagsIds && tagsIds.length > 0) {
      const tags = await this.noteRepository.find({
        where: { id: In(tagsIds) },
      });

      if (tags.length !== tagsIds.length) {
        throw new NotFoundException('One or more tags not found');
      }
      await this.noteRepository.update(id, {
        title,
        content,
        isActive,
        tags,
      });
    } else {
      await this.noteRepository.update(id, {
        title,
        content,
        isActive,
      });
    }
  }

  async remove(authHeader: string, id: number): Promise<void> {
    const user = await this.authService.getUserFromAuthHeader(authHeader);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const notes = await this.noteRepository.find({
      where: { user: { id: user.id } },
    });

    if (!notes.some((note) => note.id === id)) {
      throw new NotFoundException('Note does not belong to provided user');
    }

    await this.noteRepository.delete(id);
  }
}
