import { BaseEntity } from 'src/base.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
