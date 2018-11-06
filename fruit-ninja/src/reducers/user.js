// @flow

// Constants
import {
  SET_USER_ID,
  GO_TO_USER_ID_INPUT,
  SET_ROLLBACK
} from "../constants/ActionTypes.js";

const initialState = {
  id: null,
  rollback: false
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    case SET_ROLLBACK:
      return {
        ...state,
        rollback: true
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default user;
