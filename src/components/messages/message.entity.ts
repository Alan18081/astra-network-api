import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../users/user.entity';
// import {Chat} from '../chats/chat.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  text: string;

  @Column()
  createdAt: string;

  @ManyToOne(type => User, user => user.messages)
  @JoinColumn()
  author: User;

  // @ManyToOne(type => Chat, chat => chat.messages)
  // @JoinColumn('chatId')
  // chat: Chat;
}