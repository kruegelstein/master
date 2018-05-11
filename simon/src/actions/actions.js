// @flow

import {
  DUMMY,
  SET_USER_ID,
  START_TRAINING
} from "../constants/ActionTypes.js";

export const dummyAction = id => ({ type: DUMMY, payload: { id } });

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });

export const startTraining = () => ({ type: START_TRAINING, payload: {} });
