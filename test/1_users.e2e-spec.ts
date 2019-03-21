import gql from 'graphql-tag';
import {createClient} from './apollo-client';
import ApolloClient from 'apollo-client/ApolloClient';
import { NormalizedCacheObject} from 'apollo-cache-inmemory';
import { commons } from './commons';
import { Blob } from 'apollo-upload-client'
import {FileLogger} from 'typeorm';

describe('Users', () => {
    let token;
    let client: ApolloClient<NormalizedCacheObject>;
    let authClient: ApolloClient<NormalizedCacheObject>;
    let friendId;

    beforeAll(() => {
        client = createClient({});
        process['data'] = {hello: 'Time'};
    });

    it('should create user', async () => {

        file.name = 'bar.txt';

        const result = await client.mutate({
            mutation: gql`
                mutation($file: Upload!) {
                    uploadFile(file: $file) {
                    _id,
                  }
                }
              `,
            variables: { file }
        });
    });
});