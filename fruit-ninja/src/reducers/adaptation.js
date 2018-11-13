// @flow
import {
  SET_DIMENSION,
  GO_TO_USER_ID_INPUT,
  NEXT_ROUND
} from "../constants/ActionTypes.js";

const initialState = {
  dimension: "",
  round: 1
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_DIMENSION:
      return {
        ...state,
        dimension: action.payload.dimension
      };
    case NEXT_ROUND:
      return {
        ...state,
        round: state.round + 1
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default adaptation;
