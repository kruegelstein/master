import React, { Component } from "react";

import { theme } from "../../constants/Theme.js";

// Styled componets
import Element from "./Element.js";
import RowComp from "../general/Row.js";

// Helper
import { getOpacity, getSpeed } from "../../utils/helper.js";

class Rows extends Component {
  state = {};

  newActiveRow = id => {
    const newRows = this.props.activeRows.filter(
      row => !(row === parseInt(id))
    );
    this.props.changeActiveRows(newRows);
  };

  checkHit(id) {
    return this.state.clickedElement === id;
  }

  performAction = id => {
    this.hits = this.hits + 1;
    const rowId = document.getElementById(id).parentElement.id;
    this.newActiveRow(rowId);
    if (this.props.dimension === "Incentives") {
      // Add points and trigger incentive
      this.setState(
        {
          points: this.state.points + this.incentives,
          isIncentiveActive: true
        },
        () => {
          setTimeout(() => {
            this.setState({ isIncentiveActive: false });
          }, 1000);
        }
      );
    }
  };

  createRandomElement = (round, dimension, rollback) => {
    const icons = theme.images;
    const array = Object.keys(icons);
    const icon = array[Math.floor(Math.random() * 4)];
    const iconValue = icons[icon];
    const id = Math.floor(Math.random() * 1000);
    const opacity =
      dimension === "Object clarity" ? getOpacity(round, rollback) : 1;
    const speed = dimension === "Speed" ? getSpeed(round, rollback) : 2.5;
    return (
      <Element
        key={id}
        id={id}
        src={iconValue}
        onClick={() => this.performAction(id)}
        opacity={opacity}
        speed={speed}
        clicked={this.checkHit(id)}
      />
    );
  };

  render() {
    if (this.props.activeRows.indexOf(this.props.id) !== -1) {
      return (
        <RowComp>
          {this.createRandomElement(
            this.props.round,
            this.props.dimension,
            this.props.rollback
          )}
        </RowComp>
      );
    }
    return <RowComp />;
  }
}

export default Rows;
