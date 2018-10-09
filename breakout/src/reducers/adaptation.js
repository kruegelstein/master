// @flow
import { SET_NEW_SPEED } from "../constants/ActionTypes.js";

const initialState = {
  dimension: "speed",
  speed: 3
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NEW_SPEED:
      return {
        ...state,
        speed: state.speed + 1
      };
    default:
      return { ...state };
  }
};

export default adaptation;
