// @flow
import { combineReducers } from "redux";

// Constants
import { DUMMY } from "../constants/ActionTypes.js";

const initialTest1State = {
  init: true,
  id: null
};

const initialTest2State = {
  init: false
};

export const test1 = (state = initialTest1State, action = {}) => {
  switch (action.type) {
    case DUMMY:
      console.log("+++", action);
      return {
        ...state,
        init: action.type,
        id: action.payload.id
      };
    default:
      return { ...state };
  }
};

export const test2 = (state = initialTest2State, action = {}) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default combineReducers({
  test1,
  test2
});
