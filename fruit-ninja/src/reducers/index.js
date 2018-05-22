// @flow

import { combineReducers } from "redux";

import user from "./user.js";
import game from "./game.js";

export default combineReducers({
  user,
  game
});
