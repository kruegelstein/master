import React, { Component } from "react";
import CircleComp from "./Circle.js";

class Circle extends Component {
  render() {
    console.log("###", this.props.id);
    return (
      <CircleComp
        active={this.props.active}
        size={this.props.size}
        color={this.props.color}
        margin={this.props.margin}
        onClick={() => this.props.onUseDummyAction(this.props.id)}
      />
    );
  }
}

export default Circle;
