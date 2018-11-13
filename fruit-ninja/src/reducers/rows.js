// @flow
import {
  CHANGE_NUMBER_OF_ACTIVE_ROWS,
  CHANGE_ACTIVE_ROWS,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  rows: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  activeRows: [],
  numberOfActivesRows: 1
};

export const rows = (state = initialState, action = {}) => {
  switch (action.type) {
    case GO_TO_USER_ID_INPUT:
      return initialState;
    case CHANGE_ACTIVE_ROWS:
      return {
        ...state,
        activeRows: action.payload.activeRows
      };
    case CHANGE_NUMBER_OF_ACTIVE_ROWS:
      if (action.payload.rollback) {
        return {
          ...state,
          numberOfActivesRows: state.numberOfActivesRows - 1
        };
      }
      return {
        ...state,
        numberOfActivesRows: state.numberOfActivesRows + 1
      };
    default:
      return { ...state };
  }
};

export default rows;
