// @flow

import { DUMMY } from "../constants/ActionTypes.js";

export const dummyAction = id => ({ type: DUMMY, payload: { id } });
