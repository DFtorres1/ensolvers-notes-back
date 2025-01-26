import { BaseEntity } from 'src/base.entity';
import { Note } from 'src/notes/note.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];
}
