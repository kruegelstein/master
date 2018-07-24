// Constants
import { START_TIME, STOP_TIME, SAVE_INPUT } from "../constants/ActionTypes.js";

const initialState = {
  rounds: {}
};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_TIME:
      const startTime = Date.now();
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [action.payload.currentRound]: {
            ...state.rounds[action.payload.currentRound],
            startTime: startTime
          }
        }
      };
    case STOP_TIME:
      const endTime = Date.now();
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [action.payload.currentRound]: {
            ...state.rounds[action.payload.currentRound],
            stopTime: endTime
          }
        }
      };
    case SAVE_INPUT:
      const userInput = action.payload.userInput;
      return {
        ...state,
        rounds: {
          ...state.rounds,
          [action.payload.currentRound]: {
            ...state.rounds[action.payload.currentRound],
            userInput: userInput
          }
        }
      };
    default:
      return { ...state };
  }
};

export default results;
