import { ResolverFn } from 'graphql-subscriptions';
export declare const idEqualsFilter: <T extends {
    _id: string;
}>(id: string, resolverFn: ResolverFn) => ResolverFn;
