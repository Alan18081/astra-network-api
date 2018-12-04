import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreModule } from '../../core/core.module';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';
import { Message } from '../message.entity';
import { MessagesService } from '../messages.service';

describe('MessagesService', () => {
  let messagesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [MessagesService, { provide: getRepositoryToken(Message), useValue: mockRepository }]
    }).compile();

    messagesService = module.get<MessagesService>(MessagesService);
  });

  describe('findOne', () => {
    it('should return message', async () => {
      const result = {
        ...new Message(),
        id: 12,
        text: 10,
        userId: 11,
      };

      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => result);

      expect(await messagesService.findOne(result.id, {})).toEqual(result);
    });
  });

  describe('createOne', () => {
    it('should create new message hash and return it', async () => {
      const userId = 5;
      const chatId = 10;
      const text = 'Hello, I am text of message';

      const result = {
        ...new Message(),
        userId,
        text,
        chatId,
        createdAt: new Date().toISOString()
      };

      jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);
      jest.spyOn(messagesService, 'findOne').mockImplementation(async () => result);

      expect(await messagesService.createOne(userId, chatId, text)).toEqual(result);
    });
  });

  describe('updateOne', () => {
    it('should update message and return updated version', async () => {
      const userId = 5;
      const chatId = 10;
      const text = 'Hello, I am text of message';

      const result = {
        ...new Message(),
        userId,
        text,
        chatId,
        createdAt: new Date().toISOString()
      };

      jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);
      jest.spyOn(messagesService, 'findOne').mockImplementation(async () => result);

      expect(await messagesService.updateOne(userId, {})).toEqual(result);
    });
  });

});