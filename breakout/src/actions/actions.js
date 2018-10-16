// @flow

import { SET_USER_ID, SET_NEW_SPEED } from "../constants/ActionTypes.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });

export const setNewSpeed = () => ({ type: SET_NEW_SPEED, payload: {} });
