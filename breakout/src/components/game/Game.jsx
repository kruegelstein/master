import React, { Component } from "react";
import { withTheme } from "styled-components";
import Hammer from "hammerjs";

// Components
import Canvas from "./Canvas.js";

// Utils
import { createBricks } from "../../utils/game.js";

const BALL_OFFSET = 8;

class Game extends Component {
  constructor(props) {
    super(props);
    this.width = null;
    this.height = null;
    this.canvas = null;
    this.ctx = null;
    this.ball = null;
    this.paddle = null;
    this.bricks = null;
    this.bonuses = null;
    this.ballOn = null;
    this.color = null;
    this.gameOver = null;
    this.keys = null;
    this.pressedKeys = null;
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    // Setup game area
    this.width = this.props.theme.game.width;
    this.height = this.props.theme.game.height;
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");

    // Setup game elements
    this.setupGameElements();

    this.gameOver = 0; // 1 => lost; 2 => win

    function KeyListener() {
      this.pressedKeys = [];
      this.keydown = function(e) {
        this.pressedKeys[e.keyCode] = true;
      };
      this.keyup = function(e) {
        this.pressedKeys[e.keyCode] = false;
      };
      document.addEventListener("keydown", this.keydown.bind(this));
      document.addEventListener("keyup", this.keyup.bind(this));
    }
    KeyListener.prototype.isPressed = function(key) {
      return this.pressedKeys[key] ? true : false;
    };
    KeyListener.prototype.addKeyPressListener = function(keyCode, callback) {
      document.addEventListener("keypress", function(e) {
        if (e.keyCode === keyCode) callback(e);
      });
    };
    this.keys = new KeyListener();

    const mc = new Hammer(this.canvas);

    // Listen to touch events...
    mc.on("tap", () => {
      // Start game on tap
      this.ballOn = true;
      this.gameOver = 0;
    });

    mc.on("panleft", event => {
      // Move paddle left
      if (this.paddle.x > 0) {
        this.paddle.x -= this.paddle.speed;
      }
    });
    mc.on("panright", event => {
      // Move paddle right
      if (this.paddle.x + this.paddle.w < this.width) {
        this.paddle.x += this.paddle.speed;
      }
    });

    // Start
    requestAnimationFrame(this.loop);
  }

  setupGameElements = () => {
    this.ball = {
      x: this.width / 2,
      y: this.height / 2,
      radius: 6,
      speedX: 0,
      speedY: this.props.speed
    };
    this.paddle = {
      w: 100,
      h: 10,
      x: this.width / 2 - 100 / 2, // 100 => paddle.w
      y: this.height - 10,
      speed: 6
    };
    this.bricks = [];
    this.bonuses = [];
    this.ballOn = false;
    this.bricks = createBricks();
  };

  loop = () => {
    // Movements
    this.move();

    // Drawings
    this.draw();

    // Looping
    requestAnimationFrame(this.loop);
  };

  animation = loop => {
    requestAnimationFrame(loop);
  };

  move = () => {
    // Bonus fall - not relevant for speed dimension
    this.bonusFall();

    // Paddle movement - only for keyboard inputs
    this.movePaddleWithKeys();

    // Ball movement
    this.moveBall();
  };

  bonusFall = () => {
    for (let i = 0; i < this.bonuses.length; i++) {
      this.bonuses[i].y += 4;
      if (this.checkCollision(this.bonuses[i], this.paddle)) {
        if (this.bonuses[i].type === 1) {
          this.paddle.w -= 10;
        } else if (this.bonuses[i].type === 2) {
          this.paddle.w += 10;
        } else if (this.bonuses[i].type === 3) {
          this.ball.radius -= 1;
        } else {
          this.ball.radius += 1;
        }
        this.bonuses.splice(i, 1);
        return;
      }
      if (this.bonuses[i].y > this.height) {
        this.bonuses.splice(i, 1);
      }
    }
  };

  movePaddleWithKeys = () => {
    if (
      (this.keys.isPressed(65) || this.keys.isPressed(37)) &&
      this.paddle.x > 0
    ) {
      // LEFT
      this.paddle.x -= this.paddle.speed;
    } else if (
      (this.keys.isPressed(68) || this.keys.isPressed(39)) &&
      this.paddle.x + this.paddle.w < this.width
    ) {
      // RIGHT
      this.paddle.x += this.paddle.speed;
    }
    // start ball on space key
    if (this.keys.isPressed(32) && this.ballOn === false) {
      this.ballOn = true;
      this.gameOver = 0;
    }
  };

  moveBall = () => {
    if (this.ballOn === true) {
      this.ball.x += this.ball.speedX;
      this.ball.y += this.ball.speedY;

      // Check if ball hit the ceiling
      this.checkCeilingHit();

      // Check if ball hit the paddle and consider angle
      this.checkPaddleHit();

      // Check if ball hit the wall - left and right
      this.checkWallHit();

      // Check for lost
      this.checkLost(this.ball, this.height);

      // Destroy brick
      this.destroyBrick();

      // Check for win
      this.checkWin(this.bricks);
    }
  };

  checkCeilingHit = () => {
    if (this.ball.y <= 0) {
      this.ball.speedY = -this.ball.speedY;
    }
  };

  checkWallHit = () => {
    if (this.ball.x >= this.width || this.ball.x <= 0) {
      this.ball.speedX = -this.ball.speedX;
    }
  };

  checkPaddleHit = () => {
    if (
      this.ball.y + this.ball.radius >= this.paddle.y &&
      this.ball.x - this.ball.radius >= this.paddle.x &&
      this.ball.x + this.ball.radius <= this.paddle.x + this.paddle.w
    ) {
      this.ball.speedY = -this.ball.speedY;
      let deltaX = this.ball.x - (this.paddle.x + this.paddle.w / 2);
      this.ball.speedX = deltaX * 0.15;
    }
  };

  checkLost = (ball, height) => {
    if (ball.y > height) {
      this.gameOver = 1;
      this.newGame();
    }
  };

  checkWin = bricks => {
    if (bricks.length < 1) {
      this.gameOver = 2;
      this.newGame();
    }
  };

  draw = () => {
    // Game
    this.drawGame();

    // Paddle
    this.drawPaddle();

    // Text
    this.drawText();

    // Ball
    this.drawBall();

    // Bricks
    this.drawBricks();

    // Bonuses
    this.drawBonuses();
  };

  drawGame = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  drawPaddle = () => {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.w,
      this.paddle.h
    );
  };

  drawStartText = () => {
    this.ctx.font = "18px Roboto Mono";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "Tab the screen to start a new game.",
      this.width / 2,
      this.height / 2 - 20
    );
    this.ctx.font = "12px Roboto Mono";
    this.ctx.fillText(
      "Move the paddle sliding your finger over the screen.",
      this.width / 2,
      this.height / 2 + 20
    );
  };

  drawLostText = () => {
    this.ctx.font = "20px Roboto Mono";
    this.ctx.fillText(
      "YOU LOST! Keep trying!",
      this.width / 2,
      this.height / 2 - 50
    );
  };

  drawWinText = () => {
    this.ctx.font = "20px Roboto Mono";
    this.ctx.fillText(
      "Congratulations! YOU WON!",
      this.width / 2,
      this.height / 2 - 50
    );
  };

  drawText = () => {
    if (this.ballOn === false) {
      // Start
      this.drawStartText();

      if (this.gameOver === 1) {
        // Lost
        this.drawLostText();
      } else if (this.gameOver === 2) {
        // Win
        this.drawWinText();
      }
    }
  };

  drawBall = () => {
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
  };

  drawBricks = () => {
    for (var i = 0; i < this.bricks.length; i++) {
      this.ctx.fillStyle = this.bricks[i].color;
      this.ctx.fillRect(
        this.bricks[i].x,
        this.bricks[i].y,
        this.bricks[i].w,
        this.bricks[i].h
      );
    }
  };

  drawBonuses = () => {
    for (var j = 0; j < this.bonuses.length; j++) {
      if (this.bonuses[j].type === 1) {
        // Reduce paddle bonus
        this.reducePaddleLengthBonus(j);
      } else if (this.bonuses[j].type === 2) {
        // Increase paddle bonus
        this.increasePaddleLengthBonus(j);
      } else if (this.bonuses[j].type === 3) {
        // Reduce ball speed bonus
        this.reduceBallSpeedBonus(j);
      } else {
        // Increase ball speed bonus
        this.increaseBallSpeedBonus(j);
      }
    }
  };

  reducePaddleLengthBonus = j => {
    this.color = "#c0392b";
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.bonuses[j].x,
      this.bonuses[j].y,
      this.bonuses[j].w,
      this.bonuses[j].h
    );
  };

  increasePaddleLengthBonus = j => {
    this.color = "#27ae60";
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.bonuses[j].x - this.bonuses[j].w / 2,
      this.bonuses[j].y,
      this.bonuses[j].w * 2,
      this.bonuses[j].h
    );
  };

  reduceBallSpeedBonus = j => {
    this.color = "#2980b9";
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.bonuses[j].x,
      this.bonuses[j].y,
      this.ball.radius - 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  };

  increaseBallSpeedBonus = j => {
    this.color = "#f1c40f";
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(
      this.bonuses[j].x,
      this.bonuses[j].y,
      this.ball.radius + 2,
      0,
      Math.PI * 2
    );
    this.ctx.fill();
  };

  newGame = () => {
    this.setupGameElements();
  };

  destroyBrick = () => {
    for (var i = 0; i < this.bricks.length; i++) {
      if (this.checkCollision(this.ball, this.bricks[i])) {
        this.ball.speedY = -this.ball.speedY;
        // No bonuses in the speed dimension
        if (this.props.adaptationDimension !== "speed") {
          this.createBonus(this.bricks[i]);
        }
        this.bricks.splice(i, 1);
      }
    }
  };

  checkCollision = (obj1, obj2) => {
    if (obj1 !== this.ball) {
      // Bonus and paddle
      if (
        obj1.y >= obj2.y &&
        obj1.y <= obj2.y + obj2.h &&
        obj1.x >= obj2.x &&
        obj1.x <= obj2.x + obj2.w
      ) {
        return true;
      }
    } else {
      // Ball and brick
      if (
        obj1.y + obj1.radius >= obj2.y - BALL_OFFSET &&
        obj1.y - obj1.radius <= obj2.y + obj2.h + BALL_OFFSET &&
        obj1.x - obj1.radius >= obj2.x - BALL_OFFSET &&
        obj1.x + obj1.radius <= obj2.x + obj2.w + BALL_OFFSET
      ) {
        return true;
      }
    }
  };

  // Create bonus block
  createBonus = brick => {
    let chance = Math.floor(Math.random() * (10 - 1 + 1) + 1);
    if (chance === 1) {
      let randomNum = Math.floor(Math.random() * (4 - 1 + 1) + 1),
        bonus = {
          x: brick.x + brick.w / 2 - 5,
          y: brick.y,
          w: 10,
          h: 10,
          type: randomNum
        };
      this.bonuses.push(bonus);
    }
  };

  render() {
    return (
      <Canvas
        width={this.props.theme.game.width}
        height={this.props.theme.game.height}
        id="gameCanvas"
        userId={this.props.userId}
      />
    );
  }
}

export default withTheme(Game);
