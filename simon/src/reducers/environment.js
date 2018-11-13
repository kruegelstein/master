//  

// Constants
import { WRITE_ELEMENTS_TO_STATE } from "../constants/ActionTypes.js";

const initialState = {
  elements: null
};

export const environment = (state = initialState, action = {}) => {
  switch (action.type) {
    case WRITE_ELEMENTS_TO_STATE:
      return {
        ...state,
        elements: action.payload.elements
      };
    default:
      return { ...state };
  }
};

export default environment;
