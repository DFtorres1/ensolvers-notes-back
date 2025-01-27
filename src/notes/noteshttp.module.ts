import { Module } from '@nestjs/common';
import { NotesModule } from './notes.module';
import { NotesService } from './providers/notes.service';
import { NotesController } from './controllers/notes.controller';
import { UsersHttpModule } from 'src/users/usershttp.module';

@Module({
  imports: [NotesModule, UsersHttpModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesHttpModule {}
