// @flow

import {
  GO_TO_INTRO,
  SET_USER_ID,
  PRE_TRAINING,
  START_TRAINING,
  WRITE_ELEMENTS_TO_STATE,
  WRITE_PATTERN_TO_STATE,
  START_USER_INPUT,
  SHOW_RESULTS,
  START_COUNTDOWN,
  NEXT_ROUND,
  WRITE_TO_RESULTS,
  SET_NEW_SPEED
} from "../constants/ActionTypes.js";

export const goToIntro = () => ({ type: GO_TO_INTRO, payload: {} });

export const startCountdown = () => ({ type: START_COUNTDOWN, payload: {} });

export const showPreTraining = () => ({
  type: PRE_TRAINING,
  payload: {}
});

export const writeToResults = (results, round) => ({
  type: WRITE_TO_RESULTS,
  payload: { results, round }
});

export const nextRound = score => ({
  type: NEXT_ROUND,
  payload: { score }
});

export const setNewSpeed = currentSpeed => ({
  type: SET_NEW_SPEED,
  payload: { currentSpeed }
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

export const startUserInput = () => ({
  type: START_USER_INPUT,
  payload: {}
});

export const showResults = () => ({
  type: SHOW_RESULTS,
  payload: {}
});
