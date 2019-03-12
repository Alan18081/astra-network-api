import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import {BaseEntity} from '../core/base.entity';
import { Chat } from '../chats/chat.entity';
import { Note } from '../notes/note.entity';
import { Expose } from 'class-transformer';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age?: number;

  @Column()
  email: string;

  @Expose()
  @Column()
  password?: string;

  @Column()
  googleId?: string;

  @Column()
  emailVerified: boolean;

  @Column()
  phoneVerified: boolean;

  @ManyToMany(type => Chat, chat => chat.users)
  chats?: Chat[];

  @Column()
  online: boolean;

  @OneToMany(type => Note, note => note.user)
  notes?: Note[];

  @ManyToMany(type => User, user => user.friends)
  friends: User[];



}