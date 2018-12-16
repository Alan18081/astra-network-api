import { Column, Entity, Index, ManyToMany, OneToMany } from 'typeorm';
import {BaseEntity} from '../core/base.entity';
import { Chat } from '../chats/chat.entity';
import { Note } from '../notes/note.entity';
import { Expose } from 'class-transformer';

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ nullable: true })
  age?: number;

  @Column()
  @Index()
  email: string;

  @Expose()
  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  googleId?: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  phoneVerified: boolean;

  @ManyToMany(type => Chat, chat => chat.users)
  chats?: Chat[];

  @Column({ type: 'boolean', default: false })
  online: boolean;

  @OneToMany(type => Note, note => note.user)
  notes?: Note[];

  @ManyToMany(type => User, user => user.friends)
  friends: User[];



}