import React, { Component } from "react";
import ReactCountdownClock from "react-countdown-clock";

// Components
import CountDownComp from "./Countdown.js";

class Countdown extends Component {
  render() {
    if (this.props.countdown) {
      return (
        <CountDownComp>
          <ReactCountdownClock
            seconds={4}
            color="#758073"
            alpha={1}
            size={500}
            showMilliseconds={false}
            onComplete={this.props.onStartUserInput}
          />
        </CountDownComp>
      );
    }
    return null;
  }
}

export default Countdown;
