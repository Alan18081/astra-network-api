import { ApolloFetch, createApolloFetch } from 'apollo-fetch';

describe('Users', () => {
  let test: ApolloFetch;

  beforeAll(async () => {
    test = createApolloFetch({
      uri: 'http://localhost:4000/graphql'
    })
  });

  it('should create user', async done => {
    const client = createApolloFetch({
      uri: 'http://localhost:4000/graphql'
    });
    client.useAfter(({ response }, next) => {
      console.log(response);
      done();
      next();
    });
    client({
      query: `
        subscription {
          messageAdded(chatId: "5c8b8a58aa66a13e015487e9") {
            _id,
            text
          }
        }
      `,
    });
    await test({
      query: `
        mutation {
          sendMessage(input: { chatId: "5c8b8a58aa66a13e015487e9", text: "Hello, my dear friend" }) {
            _id,
            text
          }
        }
      `,
    });
  });

});