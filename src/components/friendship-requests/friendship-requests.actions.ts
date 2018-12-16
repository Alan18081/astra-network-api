import {WsResponse} from '@nestjs/websockets';
import { User } from '../users/user.entity';
import { FriendshipRequest } from './friendship-request.entity';
import { PaginatedResult } from '../../helpers/interfaces/paginated-result.interface';
const namespace = 'Friendship';

export const SEND_FRIENDSHIP_REQUEST = `[${namespace}] Send request`;
export const NEW_FRIENDSHIP_REQUEST = `[${namespace}] New request`;
export const NEW_ACCEPTED_FRIENDSHIP_REQUEST = `[${namespace}] New accepted request`;
export const ACCEPT_FRIENDSHIP_REQUEST = `[${namespace}] Accept request`;
export const REMOVE_FRIENDSHIP_REQUEST = `[${namespace}] Remove request`;
export const FETCH_INCOMING_FRIENDSHIP_REQUESTS = `[${namespace}] Fetch incoming requests`;
export const FETCH_OUTGOING_FRIENDSHIP_REQUESTS = `[${namespace}] Fetch outgoing requests`;

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