// Constants
import { GO_TO_INTRO, START_TRAINING } from "../constants/ActionTypes.js";

const initialState = {
  stage: {
    intro: false,
    training: false,
    userInput: false
  }
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
    default:
      return { ...state };
  }
};

export default navigation;
