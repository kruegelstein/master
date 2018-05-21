// @flow

import {
  DUMMY,
  SET_USER_ID,
  START_TRAINING,
  WRITE_ELEMENTS_TO_STATE,
  WRITE_PATTERN_TO_STATE,
  SELECT_ELEMENT,
  START_USER_INPUT,
  SHOW_RESULTS
} from "../constants/ActionTypes.js";

export const dummyAction = id => ({ type: DUMMY, payload: { id } });

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });

export const startTraining = () => ({ type: START_TRAINING, payload: {} });

export const writeElementsToState = elements => ({
  type: WRITE_ELEMENTS_TO_STATE,
  payload: { elements }
});

export const writePatternToState = pattern => ({
  type: WRITE_PATTERN_TO_STATE,
  payload: { pattern }
});

export const selectElement = key => ({
  type: SELECT_ELEMENT,
  payload: { key }
});

export const startUserInput = () => ({
  type: START_USER_INPUT,
  payload: {}
});

export const showResults = () => ({
  type: SHOW_RESULTS,
  payload: {}
});
