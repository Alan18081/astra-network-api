import gql from 'graphql-tag';
import {createClient} from './apollo-client';
import ApolloClient from 'apollo-client/ApolloClient';
import {NormalizedCacheObject} from 'apollo-cache-inmemory';


describe('Users', () => {
  let authClient: ApolloClient<NormalizedCacheObject>;

  beforeAll(async () => {
     const client = createClient({});
  });

  it('should do', () => {
      console.log(process['data']);
  });

});