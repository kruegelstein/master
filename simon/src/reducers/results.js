// Constants
import { WRITE_TO_RESULTS } from "../constants/ActionTypes.js";

import { getErrors, getTime } from "../utils/results.js";

const initialState = {};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_TO_RESULTS: {
      const pattern = action.payload.results.pattern;
      const patternSize = action.payload.results.patternSize;
      const userInput = action.payload.results.userInput;
      const startTime = action.payload.results.startTime;
      const endTime = action.payload.results.endTime;
      const errors = getErrors(pattern, userInput);
      const errorRate = errors / patternSize * 100;
      const correct = patternSize - errors;
      const successRate = correct / patternSize * 100;
      const timeTakenInSec = getTime(startTime, endTime);

      const results = {
        pattern,
        patternSize,
        userInput,
        startTime,
        endTime,
        errors,
        correct,
        errorRate,
        successRate,
        timeTakenInSec
      };
      return {
        ...state,
        [action.payload.round]: results
      };
    }
    default:
      return { ...state };
  }
};

export default results;
