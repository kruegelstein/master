const initialState = {
  dimension: "speed",
  speed: 3000
};

export const adaptation = (state = initialState, action = {}) => {
  switch (action.type) {
    default:
      return { ...state };
  }
};

export default adaptation;
