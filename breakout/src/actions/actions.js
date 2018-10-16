// @flow

import {
  SET_USER_ID,
  SET_NEW_SPEED,
  SET_DIMENSION
} from "../constants/ActionTypes.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });

export const setNewSpeed = () => ({ type: SET_NEW_SPEED, payload: {} });

export const selectDimension = dimension => ({
  type: SET_DIMENSION,
  payload: { dimension }
});
