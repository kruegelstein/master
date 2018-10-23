import React, { Component } from "react";
import CircleComp from "./Circle.js";

class Circle extends Component {
  render() {
    return (
      <CircleComp
        active={this.props.active}
        opacity={this.props.opacity}
        size={this.props.size}
        color={this.props.color}
        margin={this.props.margin}
      />
    );
  }
}

export default Circle;
