// @flow
import { SET_NEW_SPEED, SET_DIMENSION } from "../constants/ActionTypes.js";

const initialState = {
  dimension: "",
  speed: 3
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NEW_SPEED:
      return {
        ...state,
        speed: state.speed + 1
      };
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
