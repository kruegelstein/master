// Constants
import {
  GO_TO_INTRO,
  START_TRAINING,
  START_COUNTDOWN,
  START_USER_INPUT
} from "../constants/ActionTypes.js";

const initialState = {
  intro: false,
  training: false,
  countdown: false,
  userInput: false,
  round: 1
};

export const navigation = (state = initialState, action = {}) => {
  switch (action.type) {
    case GO_TO_INTRO:
      return {
        ...state,
        intro: true
      };
    case START_TRAINING:
      return {
        ...state,
        intro: false,
        training: true
      };
    case START_COUNTDOWN:
      return {
        ...state,
        training: false,
        countdown: true
      };
    case START_USER_INPUT:
      return {
        ...state,
        countdown: false,
        userInput: true
      };
    default:
      return { ...state };
  }
};

export default navigation;
