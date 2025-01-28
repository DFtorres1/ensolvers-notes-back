import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Tag } from './tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Tag])],
  exports: [TypeOrmModule],
})
export class NotesModule {}
