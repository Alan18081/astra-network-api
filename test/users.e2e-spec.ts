// import * as request from 'supertest';
// import { Test } from '@nestjs/testing';
// import { AppModule } from '../src/app.module';
// import gql from 'graphql-tag';
// import { createApolloFetch } from 'apollo-fetch';
// import { print } from 'graphql/language/printer';
//
// describe('Users', () => {
//   let test;
//   const user = {
//     firstName: 'Alex',
//     lastName: 'Markus',
//     email: 'markus4315@gmail.com',
//     password: '123456'
//   };
//
//   beforeAll(async () => {
//     const module = await Test.createTestingModule({
//       imports: [AppModule]
//     }).compile();
//     const app = module.createNestApplication();
//     await app.init();
//     test = request(app.getHttpServer());
//   });
//
//   // it('should create user', async () => {
//   //   const res = await test.post('/graphql').send({
//   //     query: print(gql`
//   //       mutation {
//   //         createUser(input: {
//   //           firstName: "${user.firstName}",
//   //           lastName: "${user.lastName}",
//   //           email: "${user.email}",
//   //           password: "${user.password}"
//   //         }) {
//   //           _id,
//   //           firstName,
//   //           lastName,
//   //           email,
//   //         }
//   //       }
//   //     `)
//   //   });
//   //   const data = res.data;
//   //   expect(data.createUser).toBeDefined();
//   //   expect(data.createUser._id).toBe('string');
//   //   expect(data.createUser.firstName).toEqual(user.firstName);
//   //   expect(data.createUser.lastName).toEqual(user.lastName);
//   //   expect(data.createUser.email).toEqual(user.email);
//   // });
//
// 	it('should login user', async () => {
// 		const res = await test.post('/graphql').send({
// 			query: print(gql`
//           mutation {
//               login(input: {
//                   email: "${user.email}",
//                   password: "${user.password}"
//               }) {
//                   accessToken,
//                   refreshToken,
//                   expiresIn
//               }
//           }
//       `)
// 		});
//
//     const data = res.data;
//     console.log(data);
// 	});
// });