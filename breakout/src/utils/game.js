// Constants
import { theme } from "../constants/Theme.js";

export const createBricks = () => {
  const bricks = [];
  let brickX = 2;
  let brickY = 10;
  let j = 0;
  let i = 0;
  for (i; i < theme.game.bricks.numberOfBricks; i++) {
    let brick = {
      x: brickX,
      y: brickY,
      w: theme.game.bricks.brickWidth,
      h: 10,
      color: "#000"
      // Use line below to use other brickColors
      // import { brickColors } from "../constants/Colors.js";
      // color: brickColors[j]
    };
    bricks.push(brick);
    brickX += theme.game.bricks.brickWidth + 2;
    if (brickX + theme.game.bricks.brickWidth + 2 > theme.game.width) {
      brickY += 12;
      brickX = 2;
      j++;
    }
  }
  return bricks;
};

export const ballColors = [
  "rgb(0, 94, 255)",
  "rgb(26, 110, 255)",
  "rgb(51, 126, 255)",
  "rgb(77, 142, 255)",
  "rgb(102, 158, 255)",
  "rgb(128, 174, 255)",
  "rgb(153, 190, 255)",
  "rgb(179, 207, 255)",
  "rgb(204, 223, 255)",
  "rgb(230, 239, 255)"
];
