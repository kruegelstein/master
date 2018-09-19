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
  SET_NEW_SPEED,
  SET_ROLLBACK,
  STORE_IN_DB,
  STORE_IN_DB_SUCCESS,
  STORE_IN_DB_ERROR,
  GO_TO_USER_ID_INPUT
} from "../constants/ActionTypes.js";

import { firebaseApp } from "../firebase.js";

export const goToUserIdInput = () => ({
  type: GO_TO_USER_ID_INPUT,
  payload: {}
});
export const goToIntro = () => ({ type: GO_TO_INTRO, payload: {} });

export const startCountdown = () => ({ type: START_COUNTDOWN, payload: {} });

export const showPreTraining = () => ({
  type: PRE_TRAINING,
  payload: {}
});

export const writeToResults = (results, round, speed) => ({
  type: WRITE_TO_RESULTS,
  payload: { results, round, speed }
});

export const nextRound = score => ({
  type: NEXT_ROUND,
  payload: { score }
});

export const setNewSpeed = (currentSpeed, rollback) => ({
  type: SET_NEW_SPEED,
  payload: { currentSpeed, rollback }
});

export const setRollback = () => ({
  type: SET_ROLLBACK,
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

export const startUserInput = () => ({
  type: START_USER_INPUT,
  payload: {}
});

export const showResults = () => ({
  type: SHOW_RESULTS,
  payload: {}
});

// Actions to backend (firebase)
export const submitResultsToDB = (
  results,
  userId,
  callback = null
) => dispatch => {
  dispatch(storeInDB(results));
  return firebaseApp
    .database()
    .ref(`/${userId}`)
    .set({ results })
    .then(
      r => {
        if (callback) {
          callback(true, r);
        }
        dispatch(storeInDBSuccess(r));
      },
      e => {
        if (callback) {
          callback(false, e);
        }
        dispatch(storeInDBError(e));
      }
    );
};

// actions recieved by success or error
function storeInDB(results) {
  return {
    type: STORE_IN_DB,
    payload: results
  };
}

function storeInDBSuccess(result) {
  return {
    type: STORE_IN_DB_SUCCESS,
    payload: result
  };
}

function storeInDBError(error) {
  return {
    type: STORE_IN_DB_ERROR,
    payload: error
  };
}
