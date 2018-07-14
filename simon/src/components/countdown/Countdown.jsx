import React, { Component } from "react";

// Components
import Title from "../general/Title.js";

class App extends Component {
  state = {
    text: null
  };
  componentWillReceiveProps(nextProps) {
    if (!this.props.countdown && nextProps.countdown) {
      this.startCountdown();
    }
  }

  startCountdown() {
    this.initiateTimeOut(3);
  }

  initiateTimeOut(i) {
    setTimeout(() => {
      this.countdown(i);
    }, 3000);
  }

  countdown(i) {
    this.setState({ text: i });
    i--;
    if (i >= 0) {
      this.initiateTimeOut(i);
    }
    if (i < 0) {
      this.props.onStartUserInput();
    }
  }

  render() {
    if (this.props.countdown) {
      return <Title>{this.state.text}</Title>;
    }
    return null;
  }
}

export default App;
