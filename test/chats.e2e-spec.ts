import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ChatsModule } from '../src/components/chats/chats.module';
import { INestApplication } from '@nestjs/common';
import * as io from 'socket.io-client';
import { PORT } from '../src/config';
import { Chat } from '../src/components/chats/chat.entity';

describe('Chats', () => {
  let app: INestApplication;
  let socket: any;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ChatsModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    socket = io(`http://localhost:${PORT}/chats`, {
      query: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwiaWQiOjIsImlhdCI6MTU0MzQxMjk3NSwiZXhwIjoxNTQzNDk5Mzc1fQ.pGnuStpJlKEz-Ilb-yGHOBU2_KuVG8ewEK0LNfWlfm0'
      },
    });
  });

  it('should attend chat', () => {
    socket.emit('ADD_NEW_USER', { chatId: 6 });
  });

  afterAll(async () => {
    await app.close();
  });

});