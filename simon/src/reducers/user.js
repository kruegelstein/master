// @flow

// Constants
import {
  SET_USER_ID,
  SET_NEW_SPEED,
  SET_NEW_OPACITY,
  SET_ROLLBACK,
  GO_TO_USER_ID_INPUT,
  SET_DIMENSION,
  ADD_POINTS,
  NEXT_ROUND
} from "../constants/ActionTypes.js";

// Helper
import { getNewSpeed, getNewOpacity } from "../utils/lightUp";

const initialState = {
  id: null,
  dimension: "",
  rollback: false,
  speed: 3000,
  opacity: 1,
  points: 0
};

export const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id
      };
    case ADD_POINTS:
      const round = action.payload.round;
      const points = round * 5;
      return {
        ...state,
        points: state.points + points
      };
    case NEXT_ROUND:
      return {
        ...state,
        points: 0
      };
    case SET_DIMENSION:
      const dimension = action.payload.dimension;
      if (dimension !== "Speed") {
        return {
          ...state,
          dimension,
          speed: 1000
        };
      }
      return {
        ...state,
        dimension: action.payload.dimension
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
      const speedRollback = action.payload.rollback;
      const newSpeed = getNewSpeed(currentSpeed, speedRollback);
      return {
        ...state,
        speed: newSpeed
      };
    case SET_NEW_OPACITY:
      const currentOpacity = action.payload.currentOpacity;
      const opacityRollback = action.payload.rollback;
      const newOpacity = getNewOpacity(currentOpacity, opacityRollback);
      return {
        ...state,
        opacity: newOpacity
      };
    default:
      return { ...state };
  }
};

export default user;
