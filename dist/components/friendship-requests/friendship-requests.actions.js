"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const namespace = 'Friendship';
exports.SEND_FRIENDSHIP_REQUEST = `[${namespace}] Send request`;
exports.NEW_FRIENDSHIP_REQUEST = `[${namespace}] New request`;
exports.NEW_ACCEPTED_FRIENDSHIP_REQUEST = `[${namespace}] New accepted request`;
exports.ACCEPT_FRIENDSHIP_REQUEST = `[${namespace}] Accept request`;
exports.REMOVE_FRIENDSHIP_REQUEST = `[${namespace}] Remove request`;
exports.FETCH_INCOMING_FRIENDSHIP_REQUESTS = `[${namespace}] Fetch incoming requests`;
exports.FETCH_OUTGOING_FRIENDSHIP_REQUESTS = `[${namespace}] Fetch outgoing requests`;
class NewFriendshipRequest {
    constructor(data) {
        this.data = data;
        this.event = exports.NEW_FRIENDSHIP_REQUEST;
    }
}
exports.NewFriendshipRequest = NewFriendshipRequest;
class AcceptFriendshipRequest {
    constructor(friend) {
        this.event = exports.ACCEPT_FRIENDSHIP_REQUEST;
        this.data = { friend };
    }
}
exports.AcceptFriendshipRequest = AcceptFriendshipRequest;
class FetchIncomingFriendshipRequests {
    constructor(data) {
        this.data = data;
        this.event = exports.FETCH_INCOMING_FRIENDSHIP_REQUESTS;
    }
}
exports.FetchIncomingFriendshipRequests = FetchIncomingFriendshipRequests;
class FetchOutgoingFriendshipRequests {
    constructor(data) {
        this.data = data;
        this.event = exports.FETCH_OUTGOING_FRIENDSHIP_REQUESTS;
    }
}
exports.FetchOutgoingFriendshipRequests = FetchOutgoingFriendshipRequests;
//# sourceMappingURL=friendship-requests.actions.js.map