//ToDo

const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

let randomUser = uuidv4();

let token;

describe('Create User and get token', () => {
  it('should create a new user and return a token with status 200', async () => {
    const res = await axios.post('http://localhost:5000/api/auth', {
      username: randomUser,
      name: 'Name',
      email: `${randomUser}@gmail.com`,
      password: '123456$',
    });
    token = res.data.token;
    expect(res.status).toEqual(200);
  });
});
