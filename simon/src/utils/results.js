export const getErrors = (pattern, userInput) => {
  let errors = 0;
  userInput.map((input, index) => {
    if (input !== pattern[index]) {
      errors = errors + 1;
    }
  });
  return errors;
};

export const getTime = (start, end) => {
  return (end - start) / 1000;
};
