import { BaseEntity } from 'src/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Note } from './note.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', length: 63 })
  name: string;

  @Column({ nullable: true })
  color?: string;

  @ManyToOne(() => Note, (note) => note.tags, { nullable: true })
  note?: Note;
  
  @ManyToOne(() => User, (user) => user.tags)
  user: User;
}
