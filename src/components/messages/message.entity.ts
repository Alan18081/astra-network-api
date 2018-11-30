import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import {User} from '../users/user.entity';
import { Chat } from '../chats/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  text: string;

  @Column()
  createdAt: string;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToOne(type => Chat, chat => chat.messages)
  @JoinColumn()
  chat: Chat;
}