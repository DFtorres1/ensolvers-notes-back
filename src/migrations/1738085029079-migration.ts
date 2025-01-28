import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738085029079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager.save('user', {
      id: 20,
      firstName: 'Jhon',
      lastName: 'Doe',
      username: 'userjhon',
      password: 'doe',
    });

    const note1 = await queryRunner.manager.save('note', {
      id: 60,
      title: 'First Note',
      content: 'This is the first note.',
      isActive: true,
      user: { id: user.id },
    });

    const note2 = await queryRunner.manager.save('note', {
      id: 61,
      title: 'Second Note',
      content: 'This is the second note.',
      isActive: false,
      user: { id: user.id },
    });

    await queryRunner.manager.save('tag', {
      name: 'to-do',
      color: '33adb8',
      note: { id: note1.id },
      user: { id: user.id },
    });

    await queryRunner.manager.save('tag', {
      name: 'shop list',
      color: '5ebd29',
      note: { id: note2.id },
      user: { id: user.id },
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('tag', {
      name: 'to-do',
      color: '33adb8',
    });

    await queryRunner.manager.delete('tag', {
      name: 'shop list',
      color: '5ebd29',
    });

    await queryRunner.manager.delete('note', { id: 60 });
    await queryRunner.manager.delete('note', { id: 61 });

    await queryRunner.manager.delete('user', { id: 20 });
  }
}
