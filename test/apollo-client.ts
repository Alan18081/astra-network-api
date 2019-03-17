import {SubscriptionClient} from 'subscriptions-transport-ws';
import {split} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {OperationDefinitionNode} from 'graphql';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';
import ApolloClient from 'apollo-client/ApolloClient';
import * as ws from 'ws';
import fetch from 'node-fetch';

export const createClient = (headers) => {
    const subscriptionClient = new SubscriptionClient('ws://localhost:4000/gwraphql', {
        reconnect: true
    }, ws);

    const httpLink = new HttpLink({
        uri: 'http://localhost:4000/graphql',
        fetch,
        headers
    });

    const wsLink = new WebSocketLink(subscriptionClient);

    const link = split(
        ({ query }) => {
            const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
            return kind === 'OperationDefinition' && operation === 'subscription';
        },
        wsLink,
        httpLink,
    );

    return new ApolloClient({
        link,
        cache: new InMemoryCache()
    });
};

