import React, { Component } from "react";

// Styled componets
import Row from "../Row/RowContainer.js";
import Incentive from "../Incentive.js";
import DashBoard from "../../dashBoard/DashBoard.jsx";

// Helper
import {
  getOpacity,
  getAdaptationScore,
  getSpeed
} from "../../../utils/helper.js";

// Interval to adapt is 10sec
const ADAPTION_INTERVAL = 10000;
const ELEMENTS_INTERVAL = 2500;

class Rows extends Component {
  constructor(props) {
    super(props);
    this.elementInterval = null;
    this.adaptationInterval = null;
    this.hits = 0;
    this.misses = 0;
    this.incentives = 10;
    this.elements = [];
  }
  state = {
    isIncentiveActive: false,
    points: 0
  };

  componentWillUnmount() {
    clearInterval(this.elementInterval);
    clearInterval(this.adaptationInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.gameStarted && nextProps.gameStarted) {
      this.elementInterval = setInterval(
        this.changeActiveRows,
        ELEMENTS_INTERVAL
      );
      this.adaptationInterval = setInterval(
        this.triggerAdaptation,
        ADAPTION_INTERVAL
      );
    }
  }

  changeActiveRows = () => {
    let activeRows = [];
    for (let i = 0; i < this.props.numberOfActivesRows; i++) {
      activeRows = activeRows.concat([Math.floor(Math.random() * 12)]);
    }
    // Push the active rows to the state
    this.props.changeActiveRows(activeRows);
  };

  triggerAdaptation = () => {
    this.props.play();
    const score = getAdaptationScore(this.hits, this.misses);
    // Save results for the round
    this.saveResults();
    // Stop adapting after 10 rounds
    if (this.props.round === 10 || this.props.rollback) {
      this.props.goToResults();
      clearInterval(this.elementInterval);
      clearInterval(this.adaptationInterval);
      return;
    }
    if (this.props.round < 3) {
      // first two rounds adapt for learning
      this.next(false);
      return;
    }
    if (score > 0) {
      // Positive score --> adapt
      this.next(false);
    } else {
      // Negative score --> Set rollback flag
      this.next(true);
    }
  };

  next(rollback) {
    if (rollback) {
      if (this.props.dimension === "Content") {
        this.props.changeNumberOfActiveRows(rollback);
      }
      if (this.props.dimension === "Incentives") {
        this.incentives = this.incentives - 5;
      }
      this.props.onSetRollback();
    }
    if (this.props.dimension === "Content") {
      this.props.changeNumberOfActiveRows(false);
    }
    if (this.props.dimension === "Incentives") {
      this.incentives = this.incentives + 10;
    }
    this.props.onNextRound();
  }

  saveResults = () => {
    this.saveRound();
    this.props.resetClicks();
    this.hits = 0;
    this.misses = 0;
  };

  saveRound = () => {
    const hits = this.hits;
    const misses = this.misses;
    const clicks = this.props.clicks;
    const round = this.props.round;
    const rollback = this.props.rollback;
    let dimensionProperty;
    switch (this.props.dimension) {
      case "Speed":
        dimensionProperty = getSpeed(round, rollback);
        break;
      case "Object clarity":
        dimensionProperty = getOpacity(round, rollback);
        break;
      case "Incentives":
        dimensionProperty = this.incentives;
        break;
      case "Content":
        dimensionProperty = this.props.numberOfActivesRows;
        break;
      default:
        null;
    }
    this.props.onSaveRound(round, hits, misses, clicks, dimensionProperty);
  };

  render() {
    return (
      <div>
        {this.props.rows.map((row, index) => <Row key={index} id={row} />)}
        {this.props.gameStarted ? (
          <DashBoard
            dimension={this.props.dimension}
            points={this.state.points}
          />
        ) : null}
        <Incentive active={this.state.isIncentiveActive}>
          + {this.incentives}
        </Incentive>
      </div>
    );
  }
}

export default Rows;
