import axios from 'axios';
import 'regenerator-runtime/runtime';
const FollowUser = require('../utils/followUser');

jest.mock('axios');

const _id1 = '605c199bcd9ab4246a6ca5aa';

test('test1', async () => {
  axios.put.mockResolvedValue(true);

  const result = await FollowUser(_id1);
  expect(result).toEqual(true);
});

const _id2 = '';

test('test2', async () => {
  axios.put.mockImplementation(() => {
    throw new Error('Invalid ID');
  });

  const result = await FollowUser(_id2);
  expect(result).toEqual(false);
});
