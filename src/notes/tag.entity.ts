import { BaseEntity } from 'src/base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Note } from './note.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', length: 63 })
  name: string;

  @Column({ nullable: true })
  color?: string;

  @ManyToMany(() => Note, { nullable: true })
  @JoinTable()
  notes?: Note[];

  @ManyToOne(() => User, (user) => user.tags)
  user: User;
}
