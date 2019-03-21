"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var apollo_link_1 = require("apollo-link");
var apollo_link_ws_1 = require("apollo-link-ws");
var apollo_link_http_1 = require("apollo-link-http");
var apollo_upload_client_1 = require("apollo-upload-client");
var apollo_cache_inmemory_1 = require("apollo-cache-inmemory");
var apollo_utilities_1 = require("apollo-utilities");
var ApolloClient_1 = require("apollo-client/ApolloClient");
var ws = require("ws");
var node_fetch_1 = require("node-fetch");
exports.createClient = function (headers) {
    var subscriptionClient = new subscriptions_transport_ws_1.SubscriptionClient('ws://localhost:4000/gwraphql', {
        reconnect: true
    }, ws);
    var httpLink = new apollo_link_http_1.HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch: node_fetch_1.default,
        headers: headers
    });
    var wsLink = new apollo_link_ws_1.WebSocketLink(subscriptionClient);
    var link = apollo_link_1.split(function (_a) {
        var query = _a.query;
        var _b = apollo_utilities_1.getMainDefinition(query), kind = _b.kind, operation = _b.operation;
        return kind === 'OperationDefinition' && operation === 'subscription';
    }, wsLink, httpLink);
    return new ApolloClient_1.default({
        link: apollo_upload_client_1.createUploadLink(),
        cache: new apollo_cache_inmemory_1.InMemoryCache()
    });
};
