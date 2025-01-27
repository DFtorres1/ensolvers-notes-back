import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../note.entity';
import { FindOptionsOrderValue, Repository } from 'typeorm';
import { decode } from 'jsonwebtoken';
import { CreateNoteDto } from '../dto/create-note.dto';
import { User } from 'src/users/user.entity';
import { UpdateNoteDto } from '../dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    @InjectRepository(User) private userRepository: Repository<User>,
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

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new NotAcceptableException('Header not allowed');
    }

    const tokenMatch = authHeader.match(/^Bearer\s+(\S+)$/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      throw new NotFoundException('Token not found');
    }

    const decodedToken = decode(token);

    const userId = decodedToken.userId;

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.noteRepository.find({
      order: { id: order },
      where: { isActive: !archiveViewBoolean, user: { id: user.id } },
    });
  }

  findOne(id: number): Promise<Note | null> {
    return this.noteRepository.findOneBy({ id });
  }

  async create(createNoteDto: CreateNoteDto): Promise<void> {
    if (!createNoteDto.userId) {
      throw new NotFoundException('Not user provided');
    }

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
