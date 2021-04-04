import axios from 'axios';
import 'regenerator-runtime/runtime';
const fetchProfile = require('../utils/fetchProfile');

jest.mock('axios');

test('fetches successfully data for profile', async () => {
  const username = 'MimiB';
  axios.get.mockImplementationOnce(() => Promise.resolve(data));
  await expect(fetchProfile(username)).resolves.toEqual(data);
});

test('fetches erroneously data from an API', async () => {
  const username = 'mimi';

  axios.get.mockImplementation(() => {
    throw new Error('Invalid Profile');
  });

  const result = await fetchProfile(username);
  expect(result).toEqual(false);
});

const data = {
  resProfile: {
    profilePicture:
      'https://soen341insta.s3.amazonaws.com/photos/0ec81401-5013-4d2f-a3a9-08e760c127f3.jpeg',
    _id: '605410bf76164c4d0d4811f9',
    username: 'MimiB',
    name: 'Militsa',
    email: 'mimi@gmail.com',
    date: '2021-03-19T02:47:27.222Z',
    following: [
      {
        _id: '606586b32327b312681a5e33',
        user_id: '6054132276164c4d0d481203',
        username: 'Gkillick',
        profilePicture: 'https://i.imgur.com/ruiqShX.png',
      },
      {
        _id: '606586b72327b312681a5e35',
        user_id: '6054114076164c4d0d4811fc',
        username: 'KimDera',
        profilePicture: 'https://i.imgur.com/ruiqShX.png',
      },
      {
        _id: '606586ba2327b312681a5e37',
        user_id: '6054129176164c4d0d4811ff',
        username: 'MSenecal',
        profilePicture:
          'https://soen341insta.s3.amazonaws.com/photos/a0fce1ac-2679-4d3b-b656-85d01a5cbc4f.jpeg',
      },
    ],
    followers: [
      {
        _id: '605c199bcd9ab4246a6ca5aa',
        user_id: '6054132276164c4d0d481203',
        username: 'Gkillick',
        profilePicture: 'https://i.imgur.com/ruiqShX.png',
      },
      {
        _id: '6068f5e421b64c117ee1f4ae',
        user_id: '6054129176164c4d0d4811ff',
        username: 'MSenecal',
        profilePicture:
          'https://soen341insta.s3.amazonaws.com/photos/f927b96a-cb96-45f0-b96a-f71e92cb6b4d.jpeg',
      },
    ],
    __v: '21',
    bio: 'Montreal',
  },

  resPosts: [
    {
      _id: '6054110f76164c4d0d4811fa',
      description: 'From my trip in Europe!',
      user: '605410bf76164c4d0d4811f9',
      postedPicture:
        'https://soen341insta.s3.amazonaws.com/photos/77f7cda8-7ab6-439c-9c22-783ba6c5ed6f.jpeg',
      username: 'MimiB',
      profilePicture: 'https://i.imgur.com/ruiqShX.png',
      likes: [],
      comments: [
        {
          _id: '60541dc52dee0a02539ddcbc',
          text: 'Beautiful!',
          username: 'Gkillick',
          profilePicture: 'https://i.imgur.com/ruiqShX.png',
          user: '6054132276164c4d0d481203',
          date: '2021-03-19T03:43:01.445Z',
        },
      ],
      date: '2021-03-19T02:48:47.383Z',
      __v: 1,
    },
    {
      _id: '605415eb76164c4d0d48120c',
      description: 'I love winter!',
      user: '605410bf76164c4d0d4811f9',
      postedPicture:
        'https://soen341insta.s3.amazonaws.com/photos/57c8a37e-8508-4a43-a04a-dd81d63d2a16.jpeg',
      username: 'MimiB',
      profilePicture: 'https://i.imgur.com/ruiqShX.png',
      likes: [],
      comments: [],
      date: '2021-03-19T03:09:31.112Z',
      __v: 0,
    },
  ],
};
