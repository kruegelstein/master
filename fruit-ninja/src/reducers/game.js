// @flow

// Constants
import { START_GAME } from "../constants/ActionTypes.js";

const initialState = {
  started: false
};

export const game = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        started: true
      };
    default:
      return { ...state };
  }
};

export default game;
