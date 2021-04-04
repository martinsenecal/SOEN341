import axios from 'axios';
import 'regenerator-runtime/runtime';
const addComment = require('../utils/addComment');

jest.mock('axios');

test('posts comment successfully ', async () => {
  const postID = '6054110f76164c4d0d4811fa';
  const formData = 'Test Comment';
  axios.post.mockImplementationOnce(() => Promise.resolve(data));
  await expect(addComment(postID, formData)).resolves.toEqual(data);
});

test('error when posting comment', async () => {
  const postID = '6054110f76164c4d0d4811fa';
  const formData = '';

  axios.post.mockImplementation(() => {
    throw new Error('Empty Comment');
  });

  const result = await addComment(postID, formData);
  expect(result).toEqual(false);
});

const data = {
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
};
