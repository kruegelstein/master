// @flow

import {
  GO_TO_INTRO,
  SET_USER_ID,
  PRE_TRAINING,
  START_TRAINING,
  WRITE_ELEMENTS_TO_STATE,
  WRITE_PATTERN_TO_STATE,
  SELECT_ELEMENT,
  START_USER_INPUT,
  SHOW_RESULTS,
  START_COUNTDOWN,
  START_TIME,
  STOP_TIME,
  SAVE_INPUT,
  NEXT_ROUND,
  WRITE_TO_RESULTS
} from "../constants/ActionTypes.js";

export const goToIntro = () => ({ type: GO_TO_INTRO, payload: {} });

export const startCountdown = () => ({ type: START_COUNTDOWN, payload: {} });

export const startTime = round => ({
  type: START_TIME,
  payload: { round }
});

export const showPreTraining = () => ({
  type: PRE_TRAINING,
  payload: {}
});

export const stopTime = round => ({
  type: STOP_TIME,
  payload: { round }
});

export const saveInput = (userInput, round) => ({
  type: SAVE_INPUT,
  payload: { userInput, round }
});

export const writeToResults = (results, round) => ({
  type: WRITE_TO_RESULTS,
  payload: { results, round }
});

export const nextRound = () => ({
  type: NEXT_ROUND,
  payload: {}
});

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
