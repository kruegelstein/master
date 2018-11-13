//  

// Constants
import {
  START_GAME,
  RESET_HITS_AND_MISSES,
  HIT_ELEMENT,
  MISS_ELEMENT
} from "../constants/ActionTypes.js";

const initialState = {
  started: false,
  hits: 0,
  misses: 0
};

export const game = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        started: true
      };
    case RESET_HITS_AND_MISSES:
      return {
        ...state,
        hits: 0,
        misses: 0
      };
    case HIT_ELEMENT:
      return {
        ...state,
        hits: state.hits + 1
      };
    case MISS_ELEMENT:
      return {
        ...state,
        misses: state.misses + 1
      };
    default:
      return { ...state };
  }
};

export default game;
