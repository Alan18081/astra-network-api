import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { File } from '../files/file.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';
import { BaseEntity } from '../core/base.entity';

@Entity()
export class Note extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToMany(type => File)
  @JoinTable()
  files: File[];

  @OneToMany(type => Comment, comment => comment.note)
  comments: Comment[];

  @Column({ nullable: true })
  userId?: number;

  @Column({ nullable: true })
  groupId?: number;

  @ManyToOne(type => User, user => user.notes)
  @JoinColumn({ name: 'userId' })
  user: User;

}