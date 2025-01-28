import { BaseEntity } from 'src/base.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
export class Note extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.notes)
  user: User;

  @Column({ default: true, type: 'boolean' })
  isActive: boolean;

  @OneToMany(() => Tag, (tag) => tag.note, { cascade: true })
  tags?: Tag[];
}
