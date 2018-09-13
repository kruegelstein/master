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

export const getEnrichedResults = results => {
  // Results
  const pattern = results.pattern;
  const patternSize = results.patternSize;
  const selectedElements = results.selectedElements;
  const startTime = results.startTime;
  const endTime = results.endTime;
  // Calculate error, success, timeTaken
  const errors = getErrors(pattern, selectedElements);
  const errorRate = errors / patternSize * 100;
  const correct = patternSize - errors;
  const successRate = correct / patternSize * 100;
  const timeTakenInSec = getTime(startTime, endTime);

  const enrichedResults = {
    pattern,
    patternSize,
    selectedElements,
    startTime,
    endTime,
    errors,
    correct,
    errorRate,
    successRate,
    timeTakenInSec
  };

  return enrichedResults;
};

export const getAnswerScore = (
  lastRoundCorrectAnswers,
  thisRoundCorrectAnswers
) => {
  return lastRoundCorrectAnswers - thisRoundCorrectAnswers;
};

export const getTimeScore = (lastRoundTime, thisRoundTime) => {
  return lastRoundTime - thisRoundTime;
};
