// Constants
import { START_TIME } from "../constants/ActionTypes.js";

const initialState = {
  rounds: {}
};

export const results = (state = initialState, action = {}) => {
  switch (action.type) {
    case START_TIME:
      const time = Date.now();
      const round = action.payload.currentRound;
      return {
        ...state,
        rounds: {
          [round]: {
            startTime: time
          }
        }
      };
    default:
      return { ...state };
  }
};

export default results;
