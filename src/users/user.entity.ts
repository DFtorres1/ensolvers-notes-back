import { BaseEntity } from 'src/base.entity';
import { Note } from 'src/notes/note.entity';
import { Tag } from 'src/notes/tag.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Note, (note) => note.user, { cascade: true })
  notes: Note[];

  @OneToMany(() => Tag, (tag) => tag.user, { cascade: true })
  tags: Tag[];
}
