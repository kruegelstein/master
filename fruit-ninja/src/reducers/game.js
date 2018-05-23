// @flow

// Constants
import { ADD_POINT, GAIN_LIVE, LOSE_LIVE } from "../constants/ActionTypes.js";

const initialState = {
  level: 1,
  points: 0,
  live: 3
};

export const game = (state = initialState, action = {}) => {
  switch (action.type) {
    case ADD_POINT:
      return {
        ...state,
        points: state.points + 1
      };
    case GAIN_LIVE:
      return {
        ...state,
        live: state.live + 1
      };
    case LOSE_LIVE:
      return {
        ...state,
        live: state.live - 1
      };
    default:
      return { ...state };
  }
};

export default game;
