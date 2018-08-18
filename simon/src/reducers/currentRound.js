// Constants
import {
  START_TIME,
  STOP_TIME,
  SAVE_INPUT,
  WRITE_PATTERN_TO_STATE,
  NEXT_ROUND
} from "../constants/ActionTypes.js";

const initialState = {
  pattern: [],
  patternSize: null,
  startTime: null,
  endTime: null,
  userInput: null
};

export const currentRound = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_PATTERN_TO_STATE:
      return {
        ...state,
        patternSize: action.payload.pattern.length,
        pattern: action.payload.pattern
      };
    case START_TIME:
      return {
        ...state,
        startTime: Date.now()
      };
    case STOP_TIME:
      return {
        ...state,
        endTime: Date.now()
      };
    case SAVE_INPUT:
      return {
        ...state,
        userInput: action.payload.userInput
      };
    case NEXT_ROUND:
      return initialState;
    default:
      return { ...state };
  }
};

export default currentRound;
