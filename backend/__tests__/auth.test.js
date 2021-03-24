
    const request = require('supertest');
    const app = require('../server'); // the express server

    /*
      declare the token variable in a scope accessible
      by the entire test suite
    */
    let token;

    beforeAll((done) => {
      request(app)
        .post('/api/auth')
        .send({
          username: "kim@gmail.com",
          password: "123456",
        })
        .end((err, response) => {
          token = response.body.token; // save the token!
          done();
        });
    });

    describe('GET /', () => {
        // token not being sent - should respond with a 401
        test('It should require authorization', () => {
          return request(app)
            .get('/api/feed')
            .then((response) => {
              expect(response.statusCode).toEqual(401);
            });
        });

        // send the token - should respond with a 200
        test('It responds with JSON', () => {
          return request(app)
            .get('/api/feed')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
              expect(response.statusCode).toEqual(401);
              expect(response.type).toBe('application/json');
            });
  
        });
    });
              

// const express = require('express')
// const app = express()

// const request = require('supertest');
// it('gets the test endpoint', async done => {
//     const config = {
//      headers: {
//        'Content-Type': 'application/json',
//      }
//     }

//     const data = { email:'kim@gmail.com', password: '123456'}

//     const response = await request.post('/api/auth', data, config);
  
//     expect(response.status).toBe(200)
//     //expect(response.body.message).toBe('pass!')
//     done()
//   })

// //   const config = {
// //     headers: {
// //       'Content-Type': 'application/json',
// //     },
// //   };
// //   try {
// //     const res = await axios.post('/api/auth', data, config);