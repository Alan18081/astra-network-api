import gql from 'graphql-tag';
import {createClient} from './apollo-client';
import ApolloClient from 'apollo-client/ApolloClient';
import { NormalizedCacheObject} from 'apollo-cache-inmemory';


describe('Users', () => {
    const user = {
        firstName: 'Alex',
        lastName: 'Markus',
        email: 'markus4315@gmail.com',
        password: '123456'
    };
    let token;
    let client: ApolloClient<NormalizedCacheObject>;
    let authClient: ApolloClient<NormalizedCacheObject>;
    let friendId;

    beforeAll(() => {
        client = createClient({});
        process['data'] = {hello: 'Time'};
    });

    it('should create user', async () => {
        const result = await client.mutate({
            mutation: gql`
                mutation {
                  createUser(input: {
                    firstName: "${user.firstName}",
                    lastName: "${user.lastName}",
                    email: "${user.email}",
                    password: "${user.password}"
                  }) {
                    _id,
                    firstName,
                    lastName,
                    email,
                  }
                }
              `
        });
        const data = result.data;
        expect(data.createUser).toBeDefined();
        expect(typeof data.createUser._id).toBe('string');
        expect(data.createUser.firstName).toEqual(user.firstName);
        expect(data.createUser.lastName).toEqual(user.lastName);
        expect(data.createUser.email).toEqual(user.email);
    });

    it('should login user', async () => {
		const res = await client.mutate({
          mutation: gql`
              mutation {
                  login(input: {
                      email: "${user.email}",
                      password: "${user.password}"
                  }) {
                      accessToken,
                      refreshToken,
                      expiresIn
                  }
              }
            `
		});

        const data = res.data;
        expect(data.login).toBeDefined();
        expect(typeof data.login.accessToken).toBe('string');
        expect(typeof data.login.refreshToken).toBe('string');
        expect(typeof data.login.expiresIn).toBe('number');

        token = data.login.accessToken;
    });

    it('should get user profile', async () => {
        authClient = createClient({
            Authorization: `Bearer ${token}`
        });
        const res = await authClient.query({
            query: gql`
                query {
                    profile {
                        _id
                        firstName
                        lastName
                        email
                    }
                }
            `,

        });

        const data = res.data;
        expect(data.profile).toBeDefined();
        expect(typeof data.profile._id).toBe('string');
        expect(data.profile.firstName).toEqual(user.firstName);
        expect(data.profile.lastName).toEqual(user.lastName);
        expect(data.profile.email).toEqual(user.email);
    });

    it('should return user by id', async () => {
        const mockUser = {
            firstName: 'Mark',
            lastName: 'Cuper',
            age: 28,
            email: 'cuper123@gmail.com',
            password: '123456'
        };
        const res = await client.mutate({
            mutation: gql`
                mutation {
                    createUser(input: {
                        firstName: "${mockUser.firstName}",
                        lastName: "${mockUser.lastName}",
                        email: "${mockUser.email}",
                        password: "${mockUser.password}",
                    }) {
                        _id,
                        firstName,
                        lastName,
                        email,
                    }
                }
            `,
        });

        const id = res.data.createUser._id;


        const userInfo = await authClient.query({
            query: gql`
                query {
                    user(id: "${id}") {
                        _id
                        firstName
                        lastName
                        email
                        age
                    }
                }
            `,
        });

        const data = userInfo.data;
        expect(data.user).toBeDefined();
        expect(typeof data.user._id).toBe('string');
        expect(data.user.firstName).toEqual(mockUser.firstName);
        expect(data.user.lastName).toEqual(mockUser.lastName);
        expect(data.user.email).toEqual(mockUser.email);

        friendId = data.user._id;
    });

    it('should update user profile', async () => {
        const userData = {
          firstName: 'Vladimir',
          lastName: 'Mocscow',
          age: 30,
        };
        const result = await authClient.mutate({
            mutation: gql`
                mutation {
                    updateProfile(input: {
                        firstName: "${userData.firstName}",
                        lastName: "${userData.lastName}",
                        age: ${userData.age}
                    }) {
                        _id,
                        firstName,
                        lastName,
                        age
                    }
                }
            `
        });
        const data = result.data;
        expect(data.updateProfile).toBeDefined();
        expect(typeof data.updateProfile._id).toBe('string');
        expect(data.updateProfile.firstName).toEqual(userData.firstName);
        expect(data.updateProfile.lastName).toEqual(userData.lastName);
        expect(data.updateProfile.age).toEqual(userData.age);
    });
});