// Constants
import {
  WRITE_PATTERN_TO_STATE,
  NEXT_ROUND
} from "../constants/ActionTypes.js";

const initialState = {
  pattern: [],
  patternSize: null
};

export const currentRound = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_PATTERN_TO_STATE:
      return {
        ...state,
        patternSize: action.payload.pattern.length,
        pattern: action.payload.pattern
      };
    case NEXT_ROUND:
      return initialState;
    default:
      return { ...state };
  }
};

export default currentRound;
