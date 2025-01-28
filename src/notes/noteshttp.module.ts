import { Module } from '@nestjs/common';
import { NotesModule } from './notes.module';
import { NotesService } from './providers/notes.service';
import { NotesController } from './controllers/notes.controller';
import { UsersHttpModule } from 'src/users/usershttp.module';
import { TagsService } from './providers/tags.service';
import { TagsController } from './controllers/tags.controller';

@Module({
  imports: [NotesModule, UsersHttpModule],
  controllers: [NotesController, TagsController],
  providers: [NotesService, TagsService],
})
export class NotesHttpModule {}
