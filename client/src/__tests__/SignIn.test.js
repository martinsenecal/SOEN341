import axios from 'axios';
import 'regenerator-runtime/runtime';
const signIn = require('../utils/signIn');

jest.mock('axios');

const user1 = {
  email: 'tester@gmail.com',
  password: '123456',
};

test('test1', async () => {
  axios.post.mockResolvedValue(true);

  const result = await signIn(user1);
  expect(result).toEqual(true);
});

const user2 = {
  email: 'tester@.com',
  password: '123456',
};

test('test2', async () => {
  axios.post.mockImplementation(() => {
    throw new Error('Invalid email');
  });

  const result = await signIn(user2);
  expect(result).toEqual(false);
});

const user3 = {
  email: 'tester@gmail.com',
  password: '012345',
};

test('test3', async () => {
  axios.post.mockImplementation(() => {
    throw new Error('Invalid Credentials');
  });

  const result = await signIn(user3);
  expect(result).toEqual(false);
});
