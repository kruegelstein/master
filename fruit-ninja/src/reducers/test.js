// @flow

// Constants
import { TEST } from "../constants/ActionTypes.js";

const initialState = {
  test: true
};

export const test = (state = initialState, action = {}) => {
  switch (action.type) {
    case TEST:
      return {
        ...state
      };
    default:
      return { ...state };
  }
};

export default test;
