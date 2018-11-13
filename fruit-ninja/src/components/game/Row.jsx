import React, { Component } from "react";

// Styled componets
import Element from "./ElementContainer.js";
import RowComp from "../general/Row.js";

class Row extends Component {
  render() {
    if (this.props.activeRows.indexOf(this.props.id) !== -1) {
      return (
        <RowComp>
          <Element />
        </RowComp>
      );
    }
    return <RowComp />;
  }
}

export default Row;
