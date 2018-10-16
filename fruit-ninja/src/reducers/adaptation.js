// @flow
import { SET_DIMENSION } from "../constants/ActionTypes.js";

const initialState = {
  dimension: ""
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_DIMENSION:
      return {
        ...state,
        dimension: action.payload.dimension
      };
    default:
      return { ...state };
  }
};

export default adaptation;
