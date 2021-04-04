import axios from 'axios';
import 'regenerator-runtime/runtime';
const signUp = require('../utils/signUp');

jest.mock('axios');

const user1 = {
  username: 'test01',
  name: 'test',
  email: 'tester@gmail.com',
  password: '123456',
};

test('test1', async () => {
  axios.post.mockResolvedValue(true);

  const result = await signUp(user1);
  expect(result).toEqual(true);
});

const user2 = {
  username: 'test01',
  name: 'test',
  email: 'tester@gmail.com',
  password: '1234',
};

test('test2', async () => {
  axios.post.mockImplementation(() => {
    throw new Error('User already exists');
  });

  const result = await signUp(user2);
  expect(result).toEqual(false);
});

const user3 = {
  username: 'test01',
  name: 'test',
  email: 'tester@.com',
  password: '1234',
};

test('test3', async () => {
  axios.post.mockImplementation(() => {
    throw new Error('Invalid email');
  });

  const result = await signUp(user3);
  expect(result).toEqual(false);
});
