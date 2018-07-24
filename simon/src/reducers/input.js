// @flow

// Constants
import { SELECT_ELEMENT, NEXT_ROUND } from "../constants/ActionTypes.js";

const initialState = {
  selected: []
};

export const selected = (state = initialState, action = {}) => {
  switch (action.type) {
    case SELECT_ELEMENT:
      return {
        ...state,
        selected: [...state.selected, action.payload.key]
      };
    case NEXT_ROUND:
      return initialState;
    default:
      return { ...state };
  }
};

export default selected;
