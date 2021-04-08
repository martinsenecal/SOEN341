import axios from 'axios';
import 'regenerator-runtime/runtime';
const fetchFeed = require('../utils/fetchFeed');

jest.mock('axios');

test('fetches successfully data for feed', async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve(data));
  await expect(fetchFeed()).resolves.toEqual(data);
});

test('fetches erroneously data from an API', async () => {
  axios.get.mockImplementation(() => {
    throw new Error('Invalid Profile');
  });

  const result = await fetchFeed();
  expect(result).toEqual(false);
});

const data = [
  {
    _id: '6054110f76164c4d0d4811fa',
    description: 'From my trip in Europe',
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
];
