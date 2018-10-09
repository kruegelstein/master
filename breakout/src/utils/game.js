// Constants
import { theme } from "../constants/Theme.js";
import { brickColors } from "../constants/Colors.js";

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
      color: brickColors[j]
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
