import {WsResponse} from '@nestjs/websockets';
import { User } from '../users/user.entity';
import { FriendshipRequest } from './friendship-request.entity';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';

export const SEND_FRIENDSHIP_REQUEST = 'SEND_FRIENDSHIP_REQUEST';
export const NEW_FRIENDSHIP_REQUEST = 'NEW_FRIENDSHIP_REQUEST';
export const ACCEPT_FRIENDSHIP_REQUEST = 'ACCEPT_FRIENDSHIP_REQUEST';
export const REMOVE_FRIENDSHIP_REQUEST = 'REMOVE_FRIENDSHIP_REQUEST';
export const FETCH_INCOMING_FRIENDSHIP_REQUESTS = 'FETCH_INCOMING_FRIENDSHIP_REQUESTS';
export const FETCH_OUTGOING_FRIENDSHIP_REQUESTS = 'FETCH_OUTGOING_FRIENDSHIP_REQUESTS';

export class NewFriendshipRequest implements WsResponse {
  readonly event = NEW_FRIENDSHIP_REQUEST;
  constructor(public data: FriendshipRequest) {}
}

export class AcceptFriendshipRequest implements WsResponse {
  readonly event = ACCEPT_FRIENDSHIP_REQUEST;
  data: { friend: User | undefined };

  constructor(friend: User | undefined) {
    this.data = { friend };
  }

}

export class FetchIncomingFriendshipRequests implements WsResponse {
  readonly event = FETCH_INCOMING_FRIENDSHIP_REQUESTS;
  constructor( public data: FriendshipRequest[] | PaginatedResult<FriendshipRequest>) {}
}

export class FetchOutgoingFriendshipRequests implements WsResponse {
  readonly event = FETCH_OUTGOING_FRIENDSHIP_REQUESTS;
  constructor( public data: FriendshipRequest[] | PaginatedResult<FriendshipRequest>) {}
}