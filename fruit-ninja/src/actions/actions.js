// @flow

import { SET_USER_ID, SET_DIMENSION } from "../constants/ActionTypes.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });
export const selectDimension = dimension => ({
  type: SET_DIMENSION,
  payload: { dimension }
});
