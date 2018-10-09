import React, { Component } from "react";
import { withTheme } from "styled-components";
import Hammer from "hammerjs";

// Components
import Canvas from "./Canvas.js";

// Utils
import { createBricks } from "../../utils/game.js";

// Constants
import { brickColors } from "../../constants/Colors.js";

class Game extends Component {
  constructor(props) {
    super(props);
    this.width = null;
    this.height = null;
    this.canvas = null;
    this.ctx = null;
    this.brickWidth = null;
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
    // Setup the game elements
    this.width = this.props.theme.game.width;
    this.height = this.props.theme.game.height;
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.brickWidth = this.props.theme.game.bricks.brickWidth;
    this.ball = {
      x: this.width / 2 - 3,
      y: this.height / 2 - 3,
      radius: 6,
      speedX: 0,
      speedY: 6
    };
    this.paddle = {
      w: 100,
      h: 10,
      x: this.width / 2 - 100 / 2, // 100 is paddle.w
      y: this.height - 10,
      speed: 6
    };
    this.bricks = [];
    this.bonuses = [];
    this.ballOn = false;
    this.color;
    this.gameOver = 0; // 1 you lost - 2 you win

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
        if (e.keyCode == keyCode) callback(e);
      });
    };
    this.keys = new KeyListener();

    var mc = new Hammer(this.canvas);

    // Listen to touch events...
    mc.on("tap", () => {
      // Start game on tap
      this.ballOn = true;
      this.gameOver = 0;
    });

    mc.on("panleft", event => {
      // move left
      if (this.paddle.x > 0) {
        this.paddle.x -= this.paddle.speed;
      }
    });
    mc.on("panright", event => {
      // move right
      if (this.paddle.x + this.paddle.w < this.width) {
        this.paddle.x += this.paddle.speed;
      }
    });
    // Create bricks
    this.bricks = createBricks();
    requestAnimationFrame(this.loop);
  }

  loop = () => {
    this.move();
    this.draw();
    // this.animation(this.loop());
    requestAnimationFrame(this.loop);
  };

  animation = loop => {
    requestAnimationFrame(loop);
  };

  move = () => {
    // bonus fall
    for (var i = 0; i < this.bonuses.length; i++) {
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
    // paddle movement
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
    // ball movement
    if (this.ballOn === true) {
      this.ball.x += this.ball.speedX;
      this.ball.y += this.ball.speedY;
      // check ball hit ceiling
      if (this.ball.y <= 0) {
        this.ball.speedY = -this.ball.speedY;
      }
      // check ball hit paddle and angle
      if (
        this.ball.y + this.ball.radius >= this.paddle.y &&
        this.ball.x - this.ball.radius >= this.paddle.x &&
        this.ball.x + this.ball.radius <= this.paddle.x + this.paddle.w
      ) {
        this.ball.speedY = -this.ball.speedY;
        let deltaX = this.ball.x - (this.paddle.x + this.paddle.w / 2);
        this.ball.speedX = deltaX * 0.15;
      }
      // check ball hit wall left-right
      if (this.ball.x >= this.width || this.ball.x <= 0) {
        this.ball.speedX = -this.ball.speedX;
      }
      // check if lost
      if (this.ball.y > this.height) {
        this.gameOver = 1;
        this.newGame();
      }
      this.destroyBrick();
      // check if win
      if (this.bricks.length < 1) {
        this.gameOver = 2;
        this.newGame();
      }
    }
  };

  draw = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#333";
    this.ctx.fillRect(0, 0, this.width, this.height);
    // paddle
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(
      this.paddle.x,
      this.paddle.y,
      this.paddle.w,
      this.paddle.h
    );

    if (this.ballOn === false) {
      this.ctx.font = "14px Roboto Mono";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "Press spacebar to start a new game.",
        this.width / 2,
        this.height / 2 - 25
      );
      this.ctx.font = "12px Roboto Mono";
      this.ctx.fillText(
        "Move with arrow keys or A & D.",
        this.width / 2,
        this.height / 2 + 25
      );
      if (this.gameOver === 1) {
        this.ctx.font = "52px Roboto Mono";
        this.ctx.fillText("YOU LOST!", this.width / 2, this.height / 2 - 90);
        this.ctx.font = "36px Roboto Mono";
        this.ctx.fillText("Keep trying!", this.width / 2, this.height / 2 - 50);
      } else if (this.gameOver === 2) {
        this.ctx.font = "52px Roboto Mono";
        this.ctx.fillText("YOU WON!", this.width / 2, this.height / 2 - 90);
        this.ctx.font = "36px Roboto Mono";
        this.ctx.fillText(
          "Congratulations!",
          this.width / 2,
          this.height / 2 - 50
        );
      }
    }
    // ball
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
    //bricks
    for (var i = 0; i < this.bricks.length; i++) {
      this.ctx.fillStyle = this.bricks[i].color;
      this.ctx.fillRect(
        this.bricks[i].x,
        this.bricks[i].y,
        this.bricks[i].w,
        this.bricks[i].h
      );
    }
    for (var i = 0; i < this.bonuses.length; i++) {
      // reduce paddle
      if (this.bonuses[i].type === 1) {
        this.color = "#c0392b";
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
          this.bonuses[i].x,
          this.bonuses[i].y,
          this.bonuses[i].w,
          this.bonuses[i].h
        );
      } else if (this.bonuses[i].type === 2) {
        // increase paddle
        this.color = "#27ae60";
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(
          this.bonuses[i].x - this.bonuses[i].w / 2,
          this.bonuses[i].y,
          this.bonuses[i].w * 2,
          this.bonuses[i].h
        );
      } else if (this.bonuses[i].type === 3) {
        // ball speedY --
        this.color = "#2980b9";
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(
          this.bonuses[i].x,
          this.bonuses[i].y,
          this.ball.radius - 2,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      } else {
        // ball speedY ++
        this.color = "#f1c40f";
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(
          this.bonuses[i].x,
          this.bonuses[i].y,
          this.ball.radius + 2,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    }
  };

  newGame = () => {
    this.bricks = [];
    this.bonuses = [];
    this.bricks = createBricks();
    this.ball.x = this.width / 2 - 3;
    this.ball.y = this.height / 2 - 3;
    this.ball.speedX = 0;
    this.ballOn = false;
    this.ball = {
      x: this.width / 2 - 3,
      y: this.height / 2 - 3,
      radius: 6,
      speedX: 0,
      speedY: 6
    };
    this.paddle = {
      w: 100,
      h: 10,
      x: this.width / 2 - 100 / 2, // 100 is paddle.w
      y: this.height - 10,
      speed: 6
    };
  };

  destroyBrick = () => {
    for (var i = 0; i < this.bricks.length; i++) {
      if (this.checkCollision(this.ball, this.bricks[i])) {
        this.ball.speedY = -this.ball.speedY;
        this.createBonus(this.bricks[i]);
        this.bricks.splice(i, 1);
      }
    }
  };

  checkCollision = (obj1, obj2) => {
    if (obj1 != this.ball) {
      if (
        obj1.y >= obj2.y &&
        obj1.y <= obj2.y + obj2.h &&
        obj1.x >= obj2.x &&
        obj1.x <= obj2.x + obj2.w
      ) {
        return true;
      }
    } else {
      if (
        obj1.y + obj1.radius >= obj2.y &&
        obj1.y - obj1.radius <= obj2.y + obj2.h &&
        obj1.x - obj1.radius >= obj2.x &&
        obj1.x + obj1.radius <= obj2.x + obj2.w
      ) {
        return true;
      }
    }
  };

  // create bonus block
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
