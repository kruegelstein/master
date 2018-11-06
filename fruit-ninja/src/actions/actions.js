// @flow

import {
  SET_USER_ID,
  SET_DIMENSION,
  SAVE_ROUND,
  GO_TO_RESULTS,
  STORE_IN_DB,
  STORE_IN_DB_SUCCESS,
  STORE_IN_DB_ERROR,
  GO_TO_USER_ID_INPUT,
  NEXT_ROUND,
  SET_ROLLBACK
} from "../constants/ActionTypes.js";

import { firebaseApp } from "../firebase.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });
export const selectDimension = dimension => ({
  type: SET_DIMENSION,
  payload: { dimension }
});
export const goToResults = () => ({ type: GO_TO_RESULTS, payload: {} });

export const goToUserIdInput = () => ({
  type: GO_TO_USER_ID_INPUT,
  payload: {}
});

export const saveRound = (round, hits, misses, clicks, dimensionProperty) => ({
  type: SAVE_ROUND,
  payload: { round, hits, misses, clicks, dimensionProperty }
});
export const nextRound = () => ({
  type: NEXT_ROUND,
  payload: {}
});
export const setRollback = () => ({
  type: SET_ROLLBACK,
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
