const validateFile = require('../utils/validateFile');

let file1 = new File([' '], 'foo.txt', {
  type: 'text/plain',
});

test('test1', () => {
  expect(validateFile(file1)).toBe(false);
});

let file2 = new File([' '], 'foo.png', {
  type: 'image/png',
});

test('test2', () => {
  expect(validateFile(file2)).toBe(true);
});
