// @flow

import { combineReducers } from "redux";

import user from "./user.js";
import adaptation from "./adaptation.js";
import game from "./game.js";

export default combineReducers({
  user,
  adaptation,
  game
});
