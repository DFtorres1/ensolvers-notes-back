import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from '../controllers/notes.controller';
import { NotesService } from '../providers/notes.service';
import { Note } from '../note.entity';

describe('NotesController', () => {
  let notesController: NotesController;

  beforeEach(async () => {
    const mockNotesService = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: 1,
          title: 'Test Note',
          content: 'This is a test note',
          isActive: true,
        } as Note,
      ]),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [{ provide: NotesService, useValue: mockNotesService }],
    }).compile();

    notesController = app.get<NotesController>(NotesController);
  });

  describe('root', () => {
    it('should return notes', async () => {
      const authHeader = 'Bearer some-valid-token';
      const order = 'ASC';
      const orderBy = 'id';
      const archiveView = 'true';

      const result = await notesController.findAll(
        authHeader,
        order,
        orderBy,
        archiveView,
      );

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 1,
        title: 'Test Note',
        content: 'This is a test note',
        isActive: true,
      });
    });
  });
});
