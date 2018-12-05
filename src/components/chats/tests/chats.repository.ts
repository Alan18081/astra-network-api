import { Repository } from 'typeorm';
import { Chat } from '../chat.entity';

export class ChatsRepository extends Repository<Chat> {}