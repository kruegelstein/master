import React, { Component } from "react";
import SquareComp from "./Square.js";

class Square extends Component {
  render() {
    return (
      <SquareComp
        active={this.props.active}
        size={this.props.size}
        color={this.props.color}
        margin={this.props.margin}
        onClick={() =>
          this.props.training
            ? this.props.onUseDummyAction(this.props.key)
            : null
        }
      />
    );
  }
}

export default Square;
