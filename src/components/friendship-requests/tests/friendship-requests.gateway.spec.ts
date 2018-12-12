import { Test } from '@nestjs/testing';
import { FriendshipRequestsGateway } from '../friendship-requests.gateway';
import { UsersService } from '../../users/users.service';
import { FriendshipRequestsService } from '../friendship-requests.service';
import { FriendshipRequest } from '../friendship-request.entity';
import {
  AcceptFriendshipRequest,
  FetchIncomingFriendshipRequests,
  FetchOutgoingFriendshipRequests
} from '../friendship-requests.actions';
import { ClientsStoreService } from '../../core/services/clients-store.service';
import { WsException } from '@nestjs/websockets';
import { Messages } from '../../../helpers/enums/messages.enum';
import { User } from '../../users/user.entity';
import { FriendshipRequestsType } from '../friendship-requests-type.enum';
import { PaginationDto } from '../../core/dto/pagination.dto';

const mockUsersService = {
  async addFriend() {}
};

const mockFriendshipRequestsService = {
  async findIncomingRequests() {},
  async findOutgoingRequests() {},
  async findOne() {},
  async createOne() {},
  async deleteOne() {}
};

describe('FriendshipRequestsGateway', () => {
  let friendshipRequestsGateway;
  const mockRequests = [new FriendshipRequest({}), new FriendshipRequest({})];
  const client = {
    user: { id: 10 }
  };
  const pagination: Required<PaginationDto> = {
    page: 5,
    limit: 6
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [FriendshipRequestsGateway],
    }).overrideProvider(UsersService)
      .useValue(mockUsersService)
      .overrideProvider(FriendshipRequestsService)
      .useValue(mockFriendshipRequestsService)
      .overrideProvider(ClientsStoreService)
      .useValue(new ClientsStoreService())
      .compile();

    friendshipRequestsGateway = module.get<FriendshipRequestsGateway>(FriendshipRequestsGateway);
  });

  describe('onFetchIncomingFriendshipRequests', () => {

    it('should call "fetchFriendshipRequests"', async () => {
      const spy = jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(async () => mockRequests);

      await friendshipRequestsGateway.onFetchIncomingFriendshipRequests(client, pagination);
      expect(spy).toBeCalledWith(client.user.id, pagination, FriendshipRequestsType.INCOMING);
    });

    it('should return array of requests', async () => {
      jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(async () => mockRequests);

      expect(await friendshipRequestsGateway.onFetchIncomingFriendshipRequests(client, pagination)).toEqual(new FetchIncomingFriendshipRequests(mockRequests));
    });

  });

  describe('onFetchOutgoingFriendshipRequests', () => {

    it('should call "fetchFriendshipRequests"', async () => {
      const spy = jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(async () => mockRequests);

      await friendshipRequestsGateway.onFetchOutgoingFriendshipRequests(client, pagination);
      expect(spy).toBeCalledWith(client.user.id, pagination, FriendshipRequestsType.OUTGOING);
    });

    it('should return array of requests', async () => {
      jest.spyOn(friendshipRequestsGateway, 'fetchFriendshipRequests').mockImplementation(async () => mockRequests);

      expect(await friendshipRequestsGateway.onFetchOutgoingFriendshipRequests(client, pagination)).toEqual(new FetchOutgoingFriendshipRequests(mockRequests));
    });

  });

  describe('onSendFriendshipRequest', () => {
    const mockRequest = new FriendshipRequest({});
    const payload = { receiverId: 5, message: 'Hello' };

    it('should call "sendFriendshipRequest" on friendshipRequestsService with proper arguments', async () => {
      const spy = jest.spyOn(mockFriendshipRequestsService, 'createOne').mockImplementation(async () => mockRequest);

      await friendshipRequestsGateway.onSendFriendshipRequest(client, payload);
      expect(spy).toBeCalledWith(client.user.id, payload.receiverId, payload.message);
    });

  });

  describe('onAcceptFriendshipRequest', () => {
    const mockRequest = new FriendshipRequest({
      id: 5,
      receiverId: client.user.id
    });
    const payload = { id: 5 };

    it('should call "findOne" on friendshipRequestsService with requestId', async () => {
      const spy = jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(async () => mockRequest);

      await friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload);
      expect(spy).toBeCalledWith(payload.id);
    });

    it('should throw an error if request is not found', async () => {
      jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(async () => undefined);

      try {
        await friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new WsException(Messages.FRIENDSHIP_REQUEST_NOT_FOUND)));
      }

    });

    it('should throw an error if receiverId is not equal to provided userId', async () => {
      const mockRequest = new FriendshipRequest({
        receiverId: 60
      });
      jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(async () => mockRequest);

      try {
        await friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new WsException(Messages.PROVIDED_USER_IS_NOT_RECEIVER)));
      }

    });

    it('should call "addFriend: on usersService twice', async () => {
      jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(async () => mockRequest);

      const spy = jest.spyOn(mockUsersService, 'addFriend');

      await friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload);
      expect(spy).toBeCalledTimes(2);
    });

    it('should call "deleteOne" on friendshipRequestsService twice', async () => {

      jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(async () => mockRequest);

      const spy = jest.spyOn(mockFriendshipRequestsService, 'deleteOne');

      await friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload);
      expect(spy).toBeCalledWith(mockRequest.id);
    });

    it('should returns new friend', async () => {
      const friend = new User();
      jest.spyOn(mockFriendshipRequestsService, 'findOne').mockImplementation(async () => mockRequest);
      jest.spyOn(mockFriendshipRequestsService, 'deleteOne');

      jest.spyOn(mockUsersService, 'addFriend').mockImplementation(async () => friend);

      expect(await friendshipRequestsGateway.onAcceptFriendshipRequest(client, payload)).toEqual(new AcceptFriendshipRequest(friend));
    });

  });

});