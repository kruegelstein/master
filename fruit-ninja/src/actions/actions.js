// @flow

import { SET_USER_ID } from "../constants/ActionTypes.js";

export const submitUserId = id => ({ type: SET_USER_ID, payload: { id } });
