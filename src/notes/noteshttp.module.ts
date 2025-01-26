import { Module } from '@nestjs/common';
import { NotesModule } from './notes.module';
import { NotesService } from './providers/notes.service';
import { NotesController } from './controllers/notes.controller';

@Module({
  imports: [NotesModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesHttpModule {}
