// @flow

// Constants
import {
  SET_USER_ID,
  SET_NEW_SPEED,
  SET_ROLLBACK,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

// Helper
import { getNewSpeed } from "../utils/lightUp";

const initialState = {
  id: null,
  rollback: false,
  speed: 3000
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    case GO_TO_USER_ID_INPUT:
      return initialState;
    case SET_ROLLBACK:
      return {
        ...state,
        rollback: true
      };
    case SET_NEW_SPEED:
      const currentSpeed = action.payload.currentSpeed;
      const rollback = action.payload.rollback;
      const newSpeed = getNewSpeed(currentSpeed, rollback);
      return {
        ...state,
        speed: newSpeed
      };
    default:
      return { ...state };
  }
};

export default user;
