"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var namespace = 'Friendship';
exports.SEND_FRIENDSHIP_REQUEST = "[" + namespace + "] Send request";
exports.NEW_FRIENDSHIP_REQUEST = "[" + namespace + "] New request";
exports.NEW_ACCEPTED_FRIENDSHIP_REQUEST = "[" + namespace + "] New accepted request";
exports.ACCEPT_FRIENDSHIP_REQUEST = "[" + namespace + "] Accept request";
exports.REMOVE_FRIENDSHIP_REQUEST = "[" + namespace + "] Remove request";
exports.FETCH_INCOMING_FRIENDSHIP_REQUESTS = "[" + namespace + "] Fetch incoming requests";
exports.FETCH_OUTGOING_FRIENDSHIP_REQUESTS = "[" + namespace + "] Fetch outgoing requests";
var NewFriendshipRequest = /** @class */ (function () {
    function NewFriendshipRequest(data) {
        this.data = data;
        this.event = exports.NEW_FRIENDSHIP_REQUEST;
    }
    return NewFriendshipRequest;
}());
exports.NewFriendshipRequest = NewFriendshipRequest;
var AcceptFriendshipRequest = /** @class */ (function () {
    function AcceptFriendshipRequest(friend) {
        this.event = exports.ACCEPT_FRIENDSHIP_REQUEST;
        this.data = { friend: friend };
    }
    return AcceptFriendshipRequest;
}());
exports.AcceptFriendshipRequest = AcceptFriendshipRequest;
var FetchIncomingFriendshipRequests = /** @class */ (function () {
    function FetchIncomingFriendshipRequests(data) {
        this.data = data;
        this.event = exports.FETCH_INCOMING_FRIENDSHIP_REQUESTS;
    }
    return FetchIncomingFriendshipRequests;
}());
exports.FetchIncomingFriendshipRequests = FetchIncomingFriendshipRequests;
var FetchOutgoingFriendshipRequests = /** @class */ (function () {
    function FetchOutgoingFriendshipRequests(data) {
        this.data = data;
        this.event = exports.FETCH_OUTGOING_FRIENDSHIP_REQUESTS;
    }
    return FetchOutgoingFriendshipRequests;
}());
exports.FetchOutgoingFriendshipRequests = FetchOutgoingFriendshipRequests;
