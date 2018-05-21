// @flow

// Constants
import {
  WRITE_ELEMENTS_TO_STATE,
  WRITE_PATTERN_TO_STATE,
  START_TRAINING,
  START_USER_INPUT,
  SHOW_RESULTS
} from "../constants/ActionTypes.js";

const initialState = {
  elements: null,
  patternSize: null,
  pattern: null,
  training: false,
  userInput: false,
  results: false
};

export const environment = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_ELEMENTS_TO_STATE:
      return {
        ...state,
        elements: action.payload.elements
      };
    case WRITE_PATTERN_TO_STATE:
      return {
        ...state,
        patternSize: action.payload.pattern.length,
        pattern: action.payload.pattern
      };
    case START_TRAINING:
      return {
        ...state,
        training: true
      };
    case START_USER_INPUT:
      return {
        ...state,
        userInput: true,
        training: false
      };
    case SHOW_RESULTS:
      return {
        ...state,
        results: true,
        userInput: false,
        training: false
      };
    default:
      return { ...state };
  }
};

export default environment;
