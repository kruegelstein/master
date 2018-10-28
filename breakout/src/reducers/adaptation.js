// @flow
import {
  SET_NEW_SPEED,
  SET_DIMENSION,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  dimension: "",
  round: 1,
  speed: 3
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_NEW_SPEED:
      return {
        ...state,
        speed: state.speed + 1,
        round: state.round + 1
      };
    case SET_DIMENSION:
      return {
        ...state,
        dimension: action.payload.dimension
      };
    case GO_TO_USER_ID_INPUT:
      return { initialState };
    default:
      return { ...state };
  }
};

export default adaptation;
