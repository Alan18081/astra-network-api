import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';
import { FriendshipRequest } from '../friendship-request.entity';
import { FriendshipRequestsService } from '../friendship-requests.service';
import { FriendshipRequestsType } from '../friendship-requests-type.enum';

describe('FriendshipRequestsService', () => {
  let friendshipRequestsService;
  const mockRequests = [new FriendshipRequest({}), new FriendshipRequest({})];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [FriendshipRequestsService, { provide: getRepositoryToken(FriendshipRequest), useValue: mockRepository }]
    }).compile();

    friendshipRequestsService = module.get<FriendshipRequestsService>(FriendshipRequestsService);
  });

  describe('findMany', () => {
    const userId = 5;

    it('should call "find" on repository with "sender" as relations and "receiverId" as key of where clause if type is INCOMING', async () => {
      const spy = jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockRequests);

      await friendshipRequestsService.findMany(userId, FriendshipRequestsType.INCOMING);
      expect(spy).toBeCalledWith({
        where: {
          receiverId: userId
        },
        relations: ['sender']
      });
    });

    it('should call "find" on repository with "receiver" as relations and "senderId" as key of where clause if type is OUTGOING', async () => {
      const spy = jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockRequests);

      await friendshipRequestsService.findMany(userId, FriendshipRequestsType.OUTGOING);
      expect(spy).toBeCalledWith({
        where: {
          senderId: userId
        },
        relations: ['receiver']
      });
    });

    it('should return array of requests', async () => {
      jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockRequests);

      expect(await friendshipRequestsService.findMany(userId)).toBe(mockRequests);
    });

  });

  describe('findOne', () => {
    const mockRequest = new FriendshipRequest({});

    it('should call "findOne" method on repository with userId', async () => {
      const spy = jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => mockRequest);
      const userId = 5;

      await friendshipRequestsService.findOne(userId);
      expect(spy).toBeCalledWith(userId);
    });

    it('should return request', async () => {
      jest.spyOn(mockRepository, 'findOne').mockImplementation(async () => mockRequest);
      const userId = 5;

      expect(await friendshipRequestsService.findOne(userId)).toBe(mockRequest);
    });

  });

  describe('createOne', () => {
    const mockRequest = new FriendshipRequest({});
    const senderId = 6;
    const receiverId = 4;
    const message = 'Hello';

    const result = new FriendshipRequest({
      senderId,
      receiverId,
      message
    });

    it('should call "save" method on repository with new request', async () => {
      const spy = jest.spyOn(mockRepository, 'save').mockImplementation(async () => mockRequest);

      await friendshipRequestsService.createOne(senderId, receiverId, message);
      expect(spy).toBeCalledWith(result);
    });

    it('should return request', async () => {
      jest.spyOn(mockRepository, 'save').mockImplementation(async () => mockRequest);

      expect(await friendshipRequestsService.createOne(senderId, receiverId, message)).toBe(mockRequest);
    });

  });

  describe('deleteOne', () => {
    const id = 6;

    it('should call "delete" method on repository with proper arguments', async () => {
      const spy = jest.spyOn(mockRepository, 'delete').mockImplementation(async () => {});

      await friendshipRequestsService.deleteOne(id);
      expect(spy).toBeCalledWith({ id });
    });

  });


});