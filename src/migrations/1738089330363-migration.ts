import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1738089330363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager.save('user', {
      id: 30,
      firstName: 'Jhon',
      lastName: 'Doe',
      username: 'jhonuser',
      password: 'doe',
    });

    const note1 = await queryRunner.manager.save('note', {
      id: 70,
      title: 'First Note',
      content: 'This is the first note.',
      isActive: true,
      user: { id: user.id },
    });

    const note2 = await queryRunner.manager.save('note', {
      id: 71,
      title: 'Second Note',
      content: 'This is the second note.',
      isActive: false,
      user: { id: user.id },
    });

    await queryRunner.manager.save('tag', {
      name: 'to-do',
      color: '33adb8',
      user: { id: user.id },
      notes: [note1],
    });

    await queryRunner.manager.save('tag', {
      name: 'shop list',
      color: '5ebd29',
      user: { id: user.id },
      notes: [note2],
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete('tag', { name: 'to-do', color: '33adb8' });
    await queryRunner.manager.delete('tag', {
      name: 'shop list',
      color: '5ebd29',
    });

    await queryRunner.manager.delete('note', { id: 70 });
    await queryRunner.manager.delete('note', { id: 71 });

    await queryRunner.manager.delete('user', { id: 30 });
  }
}
