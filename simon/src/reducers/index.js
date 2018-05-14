// @flow

import { combineReducers } from "redux";

import test from "./test.js";
import user from "./user.js";
import training from "./training.js";
import environment from "./environment.js";

export default combineReducers({
  test,
  user,
  training,
  environment
});
