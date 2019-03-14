import { ResolverFn, withFilter } from 'graphql-subscriptions';

export const idEqualsFilter = <T extends { _id: string }>(id: string, resolverFn: ResolverFn): ResolverFn => {
  return withFilter(
    resolverFn,
    (payload: T) => payload._id === id);
};