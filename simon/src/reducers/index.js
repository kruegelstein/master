// @flow

import { combineReducers } from "redux";

import input from "./input.js";
import user from "./user.js";
import training from "./training.js";
import environment from "./environment.js";

export default combineReducers({
  input,
  user,
  training,
  environment
});
