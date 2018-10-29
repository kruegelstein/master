import React, { Component } from "react";
import { withTheme } from "styled-components";
import Hammer from "hammerjs";

// Components
import Canvas from "./Canvas.js";

// Sounds
import beep from "../../sound/Beep.mov";

// Utils
import { createBricks, ballColors } from "../../utils/game.js";

const BALL_OFFSET = 8;
// Interval to adapt is 15sec
const ADAPTION_INTERVAL = 15000;

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
    this.ballOn = null;
    this.color = null;
    this.gameOver = null;
    this.keys = null;
    this.pressedKeys = null;
    this.interval = null;
    this.ballColor = ballColors[0];
    this.clicking = new Audio(beep);
  }
  state = {
    brickCount: 0,
    losses: 0
  };

  componentDidMount() {
    this.setup();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.speed !== this.props.speed) {
      // Consider the current direction of the ball when adapting the speed
      if (this.ball.speedY > 0) {
        this.ball.speedY = nextProps.speed;
      } else {
        this.ball.speedY = -nextProps.speed;
      }
    }
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
      setInterval(this.adapt, ADAPTION_INTERVAL);
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

  increaseBallSpeed = () => {
    // Only increase the ball speed if the game is active
    if (this.gameOver === 0) {
      // Save results for the round
      this.saveRound(this.state);
      this.setState({ brickCount: 0, losses: 0 });
      // stop adapting after 8 rounds
      if (this.props.round === 10) {
        this.props.goToResults();
        return;
      }
      this.props.onSetNewSpeed();
    }
  };

  changeBallColor = () => {
    // Only change the ball color if the game is active
    if (this.gameOver === 0) {
      // Save results for the round
      this.saveRound(this.state);
      this.setState({ brickCount: 0, losses: 0 });
      // stop adapting after 8 rounds
      if (this.props.round === 10) {
        this.props.goToResults();
        return;
      }
      this.ballColor = ballColors[this.props.round - 1];
    }
  };

  saveRound = state => {
    const destroyedBricks = state.brickCount;
    const losses = state.losses;
    const round = this.props.round;
    const speed = this.props.speed;
    this.props.onSaveRound(round, destroyedBricks, losses, speed);
  };

  setupGameElements = () => {
    this.ball = {
      x: this.width / 2 - 1, // -1 => move the ball slightly to give him a starting direction
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
    this.ballOn = false;
    this.bricks = createBricks();
  };

  continue = () => {
    // New ball in the middle of the screen (paddle stays where it was)
    this.ball = {
      x: this.width / 2 - 1, // -1 => move the ball slightly to give him a starting direction
      y: this.height / 2,
      radius: 6,
      speedX: 0,
      speedY: this.props.speed
    };
    // Spawn ball immediately after lost
    this.ballOn = true;
  };

  loop = () => {
    // Movements
    this.move();

    // Drawings
    this.draw(this.ballColor);

    // Looping
    requestAnimationFrame(this.loop);
  };

  animation = loop => {
    requestAnimationFrame(loop);
  };

  move = () => {
    // Paddle movement - only for keyboard inputs
    this.movePaddleWithKeys();

    // Ball movement
    this.moveBall();
  };

  movePaddleWithKeys = () => {
    if (
      (this.keys.isPressed(65) || this.keys.isPressed(37)) &&
      this.paddle.x > 0
    ) {
      // Left
      this.paddle.x -= this.paddle.speed;
    } else if (
      (this.keys.isPressed(68) || this.keys.isPressed(39)) &&
      this.paddle.x + this.paddle.w < this.width
    ) {
      // Right
      this.paddle.x += this.paddle.speed;
    }
    // Start game with space key
    if (this.keys.isPressed(32) && this.ballOn === false) {
      this.ballOn = true;
      this.gameOver = 0;
      this.interval = setInterval(this.adapt, ADAPTION_INTERVAL);
    }
  };

  adapt = () => {
    // Play sound to rate app
    this.clicking.play();
    switch (this.props.adaptationDimension) {
      case "Speed":
        this.increaseBallSpeed();
        break;
      case "Object clarity":
        this.changeBallColor();
        break;
      default:
        null;
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
      this.ball.y + this.ball.radius >= this.paddle.y - BALL_OFFSET &&
      this.ball.x - this.ball.radius >= this.paddle.x - BALL_OFFSET &&
      this.ball.x + this.ball.radius <=
        this.paddle.x + this.paddle.w + BALL_OFFSET
    ) {
      this.ball.speedY = -this.ball.speedY;
      const angle = this.ball.x - (this.paddle.x + this.paddle.w / 2);
      this.ball.speedX = angle * 0.15;
    }
  };

  checkLost = (ball, height) => {
    if (ball.y > height) {
      this.gameOver = 1;
      this.setState({ losses: this.state.losses + 1 });
      this.newGame();
    }
  };

  checkWin = bricks => {
    if (bricks.length < 1) {
      this.gameOver = 2;
      this.newGame();
    }
  };

  draw = ballColor => {
    // Game
    this.drawGame();

    // Paddle
    this.drawPaddle();

    // Text
    this.drawText();

    // Ball
    this.drawBall(ballColor);

    // Bricks
    this.drawBricks();
  };

  drawGame = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.width, this.height);
  };

  drawPaddle = () => {
    this.ctx.fillStyle = "#000";
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
      "Move the paddle by sliding your finger over the screen.",
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

  drawBall = ballColor => {
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = ballColor;

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

  newGame = () => {
    // Setup the elements again
    this.continue();
  };

  destroyBrick = () => {
    for (var i = 0; i < this.bricks.length; i++) {
      if (this.checkCollision(this.ball, this.bricks[i])) {
        this.ball.speedY = -this.ball.speedY;
        this.bricks.splice(i, 1);
        this.setState({ brickCount: this.state.brickCount + 1 });
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

  render() {
    if (!this.props.isResults) {
      return (
        <Canvas
          width={this.props.theme.game.width}
          height={this.props.theme.game.height}
          id="gameCanvas"
          userId={this.props.userId}
        />
      );
    }
    return null;
  }
}

export default withTheme(Game);
