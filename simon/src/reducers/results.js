// Constants
import { SAVE_RESULT } from "../constants/ActionTypes.js";

const initialState = {};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_RESULT: {
      return {
        ...state,
        [action.payload.round]: action.payload.results
      };
    }
    default:
      return { ...state };
  }
};

export default results;
