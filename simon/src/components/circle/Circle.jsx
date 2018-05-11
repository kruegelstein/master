import React, { Component } from "react";
import CircleComp from "./Circle.js";

class Circle extends Component {
  render() {
    return <CircleComp onClick={this.props.onUseDummyAction} />;
  }
}

export default Circle;
