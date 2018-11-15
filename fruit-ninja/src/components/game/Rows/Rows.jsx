import React, { Component } from "react";
import Pressure from "pressure";

// Styled componets
import Row from "../Row/RowContainer.js";
import Incentive from "../Incentive.js";
import DashBoard from "../../dashBoard/DashBoard.jsx";

// Helper
import {
  getOpacity,
  getAdaptationScore,
  getSpeed,
  getTime
} from "../../../utils/helper.js";

class Rows extends Component {
  constructor(props) {
    super(props);
    this.adaptationInterval = null;
  }

  state = {
    click: {
      start: 0,
      end: 0,
      xCoordinate: 0,
      yCoordinate: 0,
      force: 0,
      duration: 0
    }
  };

  componentDidMount() {
    const iOS =
      !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    if (iOS) {
      Pressure.set("#element", {
        start: event => {
          const clickStart = Date.now();
          let xCoordinate;
          let yCoordinate;
          if (event.touches.length === 1) {
            const touch = event.touches[0];
            xCoordinate = touch.clientX;
            yCoordinate = touch.clientY;
          }
          this.setState({
            click: {
              ...this.state.click,
              start: clickStart,
              xCoordinate,
              yCoordinate
            }
          });
        },
        change: (force, event) => {
          this.setState({ click: { ...this.state.click, force } });
        },
        end: () => {
          const clickEnd = Date.now();
          const clickStart = this.state.click.start;
          const clickDuration = getTime(clickStart, clickEnd);
          this.setState(
            {
              click: {
                ...this.state.click,
                end: clickEnd,
                duration: clickDuration
              }
            },
            () => {
              this.props.saveClick(this.state.click);
              this.setState({
                click: {
                  start: 0,
                  end: 0,
                  xCoordinate: 0,
                  yCoordinate: 0,
                  force: 0,
                  duration: 0
                }
              });
            }
          );
        }
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.adaptationInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.gameStarted && nextProps.gameStarted) {
      this.changeActiveRows();
      this.adaptationInterval = setInterval(
        this.triggerAdaptation,
        ADAPTION_INTERVAL
      );
    }
    if (
      this.props.hits !== nextProps.hits ||
      this.props.misses !== nextProps.misses
    ) {
      this.changeActiveRows();
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
    const score = getAdaptationScore(this.props.hits, this.props.misses);
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
        this.props.changeIncentives(rollback);
      }
      this.props.onSetRollback();
    }
    if (this.props.dimension === "Content") {
      this.props.changeNumberOfActiveRows(false);
    }
    if (this.props.dimension === "Incentives") {
      this.props.changeIncentives(false);
    }
    this.props.onNextRound();
  }

  saveResults = () => {
    this.saveRound();
    this.props.resetClicks();
    this.props.resetHitsAndMisses();
  };

  saveRound = () => {
    const {
      hits,
      misses,
      clicks,
      round,
      rollback,
      dimension,
      incentives,
      numberOfActivesRows
    } = this.props;
    let dimensionProperty;
    switch (dimension) {
      case "Speed":
        dimensionProperty = getSpeed(round, rollback);
        break;
      case "Object clarity":
        dimensionProperty = getOpacity(round, rollback);
        break;
      case "Incentives":
        dimensionProperty = incentives;
        break;
      case "Content":
        dimensionProperty = numberOfActivesRows;
        break;
      default:
        null;
    }
    this.props.onSaveRound(round, hits, misses, clicks, dimensionProperty);
  };

  render() {
    return (
      <div id="element">
        {this.props.rows.map((row, index) => <Row key={index} id={row} />)}
        {this.props.gameStarted ? (
          <DashBoard
            dimension={this.props.dimension}
            points={this.props.points}
          />
        ) : null}
        <Incentive active={this.props.isIncentiveActive}>
          + {this.props.incentives}
        </Incentive>
      </div>
    );
  }
}

export default Rows;
