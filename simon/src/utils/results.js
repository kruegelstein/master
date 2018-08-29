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
  // Calculate score
  const pointScore = correct * 1.5;
  const timeScore = getTimeScore(timeTakenInSec);
  const score = pointScore + timeScore;

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
    timeTakenInSec,
    score
  };

  return enrichedResults;
};
