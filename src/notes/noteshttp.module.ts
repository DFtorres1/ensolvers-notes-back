import { Module } from '@nestjs/common';
import { NotesModule } from './notes.module';
import { NotesService } from './providers/notes.service';
import { NotesController } from './controllers/notes.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [NotesModule, UsersModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesHttpModule {}
