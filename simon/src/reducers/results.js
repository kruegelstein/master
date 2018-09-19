// Constants
import { WRITE_TO_RESULTS } from "../constants/ActionTypes.js";

const initialState = {};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_TO_RESULTS: {
      return {
        ...state,
        [action.payload.round]: {
          results: action.payload.results,
          speed: action.payload.speed
        }
      };
    }
    default:
      return { ...state };
  }
};

export default results;
