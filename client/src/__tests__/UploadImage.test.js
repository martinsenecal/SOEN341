const validateFile = require ('../utils/validateFile')

let file1 = new File([" "], "foo.txt", {
    type: "text/plain",
  });

test ('testing', () => {
    expect(validateFile(file1)).toBe(false)
})
