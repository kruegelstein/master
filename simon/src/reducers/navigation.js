// Constants
import {
  GO_TO_INTRO,
  PRE_TRAINING,
  START_TRAINING,
  START_COUNTDOWN,
  START_USER_INPUT,
  NEXT_ROUND
} from "../constants/ActionTypes.js";

const initialState = {
  intro: false,
  preTraining: false,
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
    case PRE_TRAINING:
      return {
        ...state,
        intro: false,
        preTraining: true
      };
    case START_TRAINING:
      return {
        ...state,
        preTraining: false,
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
    case NEXT_ROUND:
      return {
        ...state,
        round: state.round + 1,
        userInput: false,
        preTraining: true
      };
    default:
      return { ...state };
  }
};

export default navigation;
