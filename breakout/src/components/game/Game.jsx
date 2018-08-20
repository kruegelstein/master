import React, { Component } from "react";
import {withTheme} from 'styled-components'

// Components
import Canvas from './Canvas.js'

// Utils
import {createBricks} from '../../utils/game.js'

// Constants
import {brickColors} from '../../constants/Colors.js'

 class Game extends Component {
  componentDidMount() {
    this.update();
  }

  update(){
    // Setup the game elements
    const width = this.props.theme.game.width
    const height = this.props.theme.game.height
    const canvas = document.getElementById('gameCanvas')
    const ctx = canvas.getContext('2d')
    const brickWidth = this.props.theme.game.bricks.brickWidth;
    let ball = {
      x: (width/2)-3,
      y: (height/2)-3,
      radius: 6,
      speedX: 0,
      speedY: 6
    },
        paddle1 = {
          w: 100,
          h: 10,
          x: width / 2 - (100/2),// 100 is paddle.w
          y: height-10,
          speed: 6
        },
        bricks = [],
        bonuses = [],
        ballOn = false, color,
        gameOver=0; // 1 you lost - 2 you win

    function KeyListener() {
      this.pressedKeys = [];
      this.keydown = function(e) { this.pressedKeys[e.keyCode] = true };
      this.keyup = function(e) { this.pressedKeys[e.keyCode] = false };
      document.addEventListener("keydown", this.keydown.bind(this));
      document.addEventListener("keyup", this.keyup.bind(this));
    }
    KeyListener.prototype.isPressed = function(key){
      return this.pressedKeys[key] ? true : false;
    };
    KeyListener.prototype.addKeyPressListener =
      function(keyCode, callback){
      document.addEventListener("keypress", function(e) {
        if (e.keyCode == keyCode)
          callback(e);
      });
    };
    var keys = new KeyListener();

    // create bonus block
    function createBonus(brick){
      let chance = Math.floor(Math.random() * (10-1 +1) +1);
      if(chance === 1){
        let  randomNum = Math.floor(Math.random() * (4-1 +1) +1),
            bonus = {
              x: brick.x+brick.w/2-5,
              y: brick.y,
              w: 10,
              h: 10,
              type: randomNum
            }
        bonuses.push(bonus)
      }
    }

    // Create bricks
    bricks = createBricks();

    // Check collision !!ball must be first!!
    function checkCollision(obj1,obj2){
      if(obj1 != ball){
        if(obj1.y >= obj2.y &&
           obj1.y <= obj2.y+obj2.h &&
           obj1.x >= obj2.x &&
           obj1.x <= obj2.x+obj2.w){
          return true
        }
      }else{
        if(obj1.y+obj1.radius >= obj2.y &&
           obj1.y-obj1.radius <= obj2.y+obj2.h &&
           obj1.x-obj1.radius >= obj2.x &&
           obj1.x+obj1.radius <= obj2.x+obj2.w){
          return true
        }
      }
    }
    // if ball touch brick destroy
    function destroyBrick(){
      for(var i=0;i<bricks.length;i++){
        if(checkCollision(ball,bricks[i])){
          ball.speedY = -ball.speedY;
          createBonus(bricks[i]);
          bricks.splice(i,1);
        }
      }
    }
    // reset everything for a new gme
    function newGame(){
      bricks=[];
      bonuses=[];
      bricks = createBricks();
      ball.x = (width/2)-3;
      ball.y = (height/2)-3;
      ball.speedX = 0;
      ballOn = false;
      ball = {
        x: (width/2)-3,
        y: (height/2)-3,
        radius: 6,
        speedX: 0,
        speedY: 6
      };
      paddle1 = {
          w: 100,
          h: 10,
          x: width / 2 - (100/2),// 100 is paddle.w
          y: height-10,
          speed: 6
        };
    }

    function draw(){
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = "#333";
      ctx.fillRect(0, 0, width, height);
      // paddle
      ctx.fillStyle = "#fff";
      ctx.fillRect(paddle1.x, paddle1.y, paddle1.w, paddle1.h);

      if(ballOn === false){
        ctx.font = "14px Roboto Mono";
        ctx.textAlign="center";
        ctx.fillText("Press spacebar to start a new game.",width/2,(height/2)-25);
        ctx.font = "12px Roboto Mono";
        ctx.fillText("Move with arrow keys or A & D.",width/2,(height/2)+25);
        if(gameOver === 1){
          ctx.font = "52px Roboto Mono";
          ctx.fillText("YOU LOST!",width/2,(height/2)-90);
          ctx.font = "36px Roboto Mono";
          ctx.fillText("Keep trying!",width/2,(height/2)-50);
        }else if(gameOver === 2){
          ctx.font = "52px Roboto Mono";
          ctx.fillText("YOU WON!",width/2,(height/2)-90);
          ctx.font = "36px Roboto Mono";
          ctx.fillText("Congratulations!",width/2,(height/2)-50);
        }
      }
      // ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
      ctx.fill();
      //bricks
      for(var i=0;i<bricks.length;i++){
        ctx.fillStyle = bricks[i].color;
        ctx.fillRect(bricks[i].x, bricks[i].y, bricks[i].w, bricks[i].h);
      }
      for(var i=0;i<bonuses.length;i++){
         // reduce paddle
        if(bonuses[i].type === 1){
          color = "#c0392b";
          ctx.fillStyle = color;
          ctx.fillRect(bonuses[i].x, bonuses[i].y, bonuses[i].w, bonuses[i].h);
        } // increase paddle
        else if(bonuses[i].type === 2){
          color = "#27ae60"
          ctx.fillStyle = color;
          ctx.fillRect(bonuses[i].x-bonuses[i].w/2, bonuses[i].y, bonuses[i].w*2, bonuses[i].h);
        } // ball speedY --
        else if(bonuses[i].type === 3){
          color = "#2980b9"
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(bonuses[i].x, bonuses[i].y, ball.radius-2, 0, Math.PI*2);
          ctx.fill();
        } // ball speedY ++
        else{
          color = "#f1c40f"
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(bonuses[i].x, bonuses[i].y, ball.radius+2, 0, Math.PI*2);
          ctx.fill();
        }
      }
    }

    function move(){
      // bonus fall
      for(var i=0;i<bonuses.length;i++){
        bonuses[i].y += 4;
        if(checkCollision(bonuses[i],paddle1)){
          if(bonuses[i].type === 1){
            paddle1.w -= 10;
          }else if(bonuses[i].type === 2){
            paddle1.w += 10;
          }else if(bonuses[i].type === 3){
            ball.radius -= 1;
          }else{
            ball.radius += 1;
          }
          bonuses.splice(i,1);
          return;
        }
        if(bonuses[i].y > height){
          bonuses.splice(i,1);
        }
      }
      // paddle movement
      if ((keys.isPressed(65) || keys.isPressed(37)) &&
          paddle1.x > 0) { // LEFT
        paddle1.x -= paddle1.speed;
      } else if ((keys.isPressed(68) || keys.isPressed(39)) &&
                 (paddle1.x+paddle1.w) < width) { // RIGHT
        paddle1.x += paddle1.speed;
      }
      // start ball on space key
      if(keys.isPressed(32) && ballOn === false){
        ballOn=true;
        gameOver=0;
      }
      // ball movement
      if(ballOn === true){
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        // check ball hit ceiling
        if(ball.y <= 0){
          ball.speedY = -ball.speedY;
        }
        // check ball hit paddle and angle
        if(ball.y+ball.radius >= paddle1.y &&
           ball.x-ball.radius >= paddle1.x &&
           ball.x+ball.radius <= paddle1.x+paddle1.w){
          ball.speedY = -ball.speedY;
          let deltaX=ball.x - (paddle1.x + paddle1.w/2)
          ball.speedX = deltaX * 0.15;
        }
        // check ball hit wall left-right
        if(ball.x >= width || ball.x <= 0){
          ball.speedX = -ball.speedX;
        }
        // check if lost
        if(ball.y > height){
          gameOver=1;
          newGame();
        }
        destroyBrick();
        // check if win
        if(bricks.length < 1){
          gameOver=2;
          newGame();
        }
      }
    }

    function loop(){
      move();
      draw();
      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);

  }

  render() {
    return(
        <Canvas
          width={this.props.theme.game.width}
          height={this.props.theme.game.height}
          id="gameCanvas"
          userId={this.props.userId}
        />
    )
  }
}

export default withTheme(Game);
