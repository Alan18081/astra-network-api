"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe('Users', function () {
    var client;
    beforeAll(function () {
        // client = createClient({
        //     Authorization: `Bearer ${jest.globals.data}`
        // });
    });
    it('should do', function () {
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
