// @flow

// Constants
import { SELECT_ELEMENT } from "../constants/ActionTypes.js";

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
    default:
      return { ...state };
  }
};

export default selected;
