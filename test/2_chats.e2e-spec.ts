import gql from 'graphql-tag';
import {createClient} from './apollo-client';
import ApolloClient from 'apollo-client/ApolloClient';
import {NormalizedCacheObject} from 'apollo-cache-inmemory';
import { data } from './data';

describe('Users', () => {
  let client: ApolloClient<NormalizedCacheObject>;

  beforeAll(() => {
     // client = createClient({
     //     Authorization: `Bearer ${jest.globals.data}`
     // });
  });

  it('should do', () => {
      console.log(process['data']);
  });

  // it('should create user', async done => {
  //
  //   client.subscribe({
  //       query: gql`
  //          subscription MessageAdded {
  //              messageAdded(chatId: "5c8b8a58aa66a13e015487e9") {
  //                  _id,
  //                  text
  //              }
  //          }
  //      `,
  //   }).subscribe(data => {
  //       console.log('result data', data);
  //       done();
  //   });
  //
  //     await client.query({
  //       query: gql`
  //         mutation {
  //           sendMessage(input: { chatId: "5c8b8a58aa66a13e015487e9", text: "Hello, my dear friend" }) {
  //             _id,
  //             text
  //               }
  //         }
  //       `,
  // });
  // });

});