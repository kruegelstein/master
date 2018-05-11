// @flow

// Constants
import { START_TRAINING } from "../constants/ActionTypes.js";

const initialStartedState = {
  started: false,
  pattern: {}
};

export const training = (state = initialStartedState, action = {}) => {
  switch (action.type) {
    case START_TRAINING:
      return {
        ...state,
        started: true
      };
    default:
      return { ...state };
  }
};

export default training;
