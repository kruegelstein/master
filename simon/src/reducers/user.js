// @flow

// Constants
import { SET_USER_ID, SET_NEW_SPEED } from "../constants/ActionTypes.js";

// Helper
import { getNewSpeed } from "../utils/lightUp";

const initialState = {
  id: null,
  speed: 3000
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    case SET_NEW_SPEED:
      const currentSpeed = action.payload.currentSpeed;
      const newSpeed = getNewSpeed(currentSpeed);
      return {
        ...state,
        speed: newSpeed
      };
    default:
      return { ...state };
  }
};

export default user;
