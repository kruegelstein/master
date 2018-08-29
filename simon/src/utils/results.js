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

export const getTimeScore = sec => {
  if (sec < 5) return 5;
  if (sec < 10) return 4;
  if (sec < 15) return 3;
  if (sec < 20) return 2;
  if (sec < 25) return 1;
  if (sec > 25) return 0;
};
