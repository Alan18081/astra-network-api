import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mockRepository } from '../../../helpers/test-helpers/mock-repository';
import { FriendshipRequest } from '../friendship-request.entity';
import { FriendshipRequestsService } from '../friendship-requests.service';

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

  describe('findIncomingRequests', () => {

    it('should call "find" method on repository with proper arguments', async () => {
      const spy = jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockRequests);
      const userId = 5;

      await friendshipRequestsService.findIncomingRequests(userId);
      expect(spy).toBeCalledWith({ where: { receiverId: userId }, relations: ['sender'] });
    });

    it('should return array of requests', async () => {
      jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockRequests);
      const userId = 5;

      expect(await friendshipRequestsService.findIncomingRequests(userId)).toBe(mockRequests);
    });

  });

  describe('findOutgoingRequests', () => {

    it('should call "find" method on repository with proper arguments', async () => {
      const spy = jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockRequests);
      const userId = 5;

      await friendshipRequestsService.findOutgoingRequests(userId);
      expect(spy).toBeCalledWith({ where: { senderId: userId }, relations: ['receiver'] });
    });

    it('should return array of requests', async () => {
      jest.spyOn(mockRepository, 'find').mockImplementation(async () => mockRequests);
      const userId = 5;

      expect(await friendshipRequestsService.findIncomingRequests(userId)).toBe(mockRequests);
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