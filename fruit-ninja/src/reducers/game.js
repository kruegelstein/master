// @flow

// Constants

const initialState = {
  level: 1,
  points: 0,
  live: 3
};

export const game = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default game;
