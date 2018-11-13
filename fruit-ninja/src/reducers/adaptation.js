// @flow
import {
  SET_DIMENSION,
  GO_TO_USER_ID_INPUT,
  NEXT_ROUND,
  CHANGE_INCENTIVES
} from "../constants/ActionTypes.js";

const initialState = {
  dimension: "",
  round: 1,
  incentives: 10,
  points: 0
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
    case CHANGE_INCENTIVES:
      if (action.payload.rollback) {
        return {
          ...state,
          incentives: state.incentives - 5
        };
      }
      return {
        ...state,
        incentives: state.incentives + 10
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default adaptation;
