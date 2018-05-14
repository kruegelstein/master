// @flow
import React from "react";

import Square from "../components/square/Square.jsx";
import Circle from "../components/circle/Circle.jsx";

// Constants
import { theme } from "../constants/Theme.js";

export const generateID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export const createElements = numberToCreate => {
  let elements = [];
  let i = 0;
  for (i = 0; i < numberToCreate; i++) {
    if (Math.floor(Math.random() * 2) === 0) {
      elements.push(
        <Square
          active={false}
          key={generateID()}
          color={
            theme.baseColors[
              Object.keys(theme.baseColors)[Math.floor(Math.random() * 6)]
            ]
          }
          size={
            theme.sizes[Object.keys(theme.sizes)[Math.floor(Math.random() * 4)]]
          }
          margin={
            theme.margin[
              Object.keys(theme.margin)[Math.floor(Math.random() * 3)]
            ]
          }
        />
      );
    } else {
      elements.push(
        <Circle
          active={false}
          key={generateID()}
          color={
            theme.baseColors[
              Object.keys(theme.baseColors)[Math.floor(Math.random() * 6)]
            ]
          }
          size={
            theme.sizes[Object.keys(theme.sizes)[Math.floor(Math.random() * 4)]]
          }
          margin={
            theme.margin[
              Object.keys(theme.margin)[Math.floor(Math.random() * 3)]
            ]
          }
        />
      );
    }
  }
  return elements;
};
