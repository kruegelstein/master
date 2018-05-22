// @flow

import {
  SET_USER_ID,
  LOSE_LIVE,
  GAIN_LIVE,
  ADD_POINT
} from "../constants/ActionTypes.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });
export const loseLive = () => ({ type: LOSE_LIVE, payload: {} });
export const gainLive = () => ({ type: GAIN_LIVE, payload: {} });
export const addPoint = () => ({ type: ADD_POINT, payload: {} });
