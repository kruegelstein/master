// @flow

// Constants
import { SET_USER_ID } from "../constants/ActionTypes.js";

const initialState = {
  id: null
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    default:
      return { ...state };
  }
};

export default user;
