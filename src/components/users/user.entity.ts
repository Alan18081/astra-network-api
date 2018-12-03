import { Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import {BaseEntity} from '../core/base.entity';
import { Chat } from '../chats/chat.entity';
import { Note } from '../notes/note.entity';
import { Group } from '../groups/group.entity';

@Entity()
export class User extends BaseEntity {

  @Column({ type: 'varchar' })
  firstName: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  @Index()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ type: 'boolean', default: false })
  emailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  phoneVerified: boolean;

  @ManyToMany(type => Chat, chat => chat.users)
  chats: Chat[];

  @Column({ type: 'boolean', default: false })
  online: boolean;

  @OneToMany(type => Note, note => note.user)
  notes: Note[];

  @ManyToMany(type => Group, group => group.participants)
  groups: Group[];
}