import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from '../controllers/notes.controller';
import { NotesService } from '../providers/notes.service';

describe('NotesController', () => {
  let notesController: NotesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();

    notesController = app.get<NotesController>(NotesController);
  });

  describe('root', () => {
    it('should return notes', () => {
      expect(notesController.getNotes()).toBe('notes');
    });
  });
});
