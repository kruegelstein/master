import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "../trainingStage/TrainingStage.js";
import TableComp from "../../table/Table.js";
import TableBodyComp from "../../table/TableBody.js";
import TrComp from "../../table/Tr.js";
import TdComp from "../../table/Td.js";

import click from "../../../sound/click.mov";

// Helper
import {
  getEnrichedResults,
  getAnswerScore,
  getTimeScore
} from "../../../utils/results.js";

// Constants
import { PATTERN_SIZE } from "../../../constants/Pattern.js";

class UserInputStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      round: this.props.round,
      startTime: null,
      endTime: null,
      patternSize: this.props.currentRound.patternSize,
      pattern: this.props.currentRound.pattern,
      selectedElements: [],
      clicks: []
    };
    this.clicking = new Audio(click);
  }

  componentWillMount() {
    this.setState({ startTime: Date.now() });
  }

  nextRound(rollback) {
    switch (this.props.dimension) {
      case "Speed":
        this.props.onSetNewSpeed(this.props.speed, rollback || false);
      case "Object clarity":
        this.props.onSetNewOpacity(this.props.opacity, rollback || false);
      default:
        null;
    }
    this.props.onNextRound();
  }

  processResults(results) {
    const enrichedResults = getEnrichedResults(results);
    let dimensionProperty;
    switch (this.props.dimension) {
      case "Speed":
        dimensionProperty = this.props.speed;
        break;
      case "Object clarity":
        dimensionProperty = this.props.opacity;
        break;
      default:
        null;
    }
    this.props.onWriteToResults(
      enrichedResults,
      this.props.round,
      dimensionProperty
    );
    this.adapt(enrichedResults);
  }

  adapt(enrichedResults) {
    // Always move on to round two
    if (this.props.round < 3) {
      this.nextRound();
      return;
    }
    // If the rollback is set the user got his second chance already and we show results results after the round
    if (this.props.rollback) {
      this.props.onShowResults();
      return;
    }
    const lastResults = this.props.results[this.props.round - 1].results;
    const answerScore = getAnswerScore(
      lastResults.correct,
      enrichedResults.correct
    );
    const timeScore = getTimeScore(
      lastResults.timeTakenInSec,
      enrichedResults.timeTakenInSec
    );
    // Decide whether we go to the next round or show results based on score
    // Good answer performance from round 3 (this is more or less a test) and round 2 is the first reference
    if (this.props.round >= 3) {
      // Good last results 4 or 5 correct answers and also 4 or 5 coorect this round
      if (
        lastResults.correct >= 4 &&
        (answerScore === 0 || answerScore === -1)
      ) {
        // Good results
        this.nextRound();
        return;
      }
      if (lastResults.correct >= 4 && answerScore > 0) {
        // Bad results
        // Check the time when the user got 3 correct answers
        if (enrichedResults.correct === 3 && timeScore > 1.5) {
          // Just ok since the time of input improved significant
          this.nextRound();
          return;
        } else {
          this.props.onSetRollback();
          this.nextRound(true);
          return;
        }
      }
      // This case is just triggered if round two was bad
      if (lastResults.correct < 4 && enrichedResults.correct >= 4) {
        // Round two was bad but now the user got it
        this.nextRound();
        return;
      }
      this.props.onSetRollback();
      this.nextRound(true);
    }
  }

  giveFeedback() {
    // Give feedback
    this.clicking.play();
  }

  selectElement(key, event) {
    this.giveFeedback();
    // Add element to selected elements
    const oldElements = this.state.selectedElements;
    const newElement = [key];
    const selectedElements = oldElements.concat(newElement);
    this.setState({
      selectedElements
    });
    // At this point check if the round is over
    if (this.state.selectedElements.length === PATTERN_SIZE - 1) {
      this.setState({
        endTime: Date.now()
      });
      // Invoke timeout so the state is set
      setTimeout(() => {
        this.processResults(this.state);
      }, 1);
    }
  }

  registerClick(event) {
    const xCoordinate = event.clientX;
    const yCoordinate = event.clientY;
    const clickInfo = {
      x: xCoordinate,
      y: yCoordinate
    };
    const oldClicks = this.state.clicks;
    const newClick = [clickInfo];
    const clicks = oldClicks.concat(newClick);
    this.setState({
      clicks
    });
  }

  render() {
    return (
      <TrainingStageComp onClick={event => this.registerClick(event)}>
        <TableComp>
          <TableBodyComp>
            <TrComp>
              {this.props.elements.slice(0, 4).map((element, key) => {
                let enhancedElement;
                if (
                  element.key ===
                  this.state.selectedElements[
                    this.state.selectedElements.length - 1
                  ]
                ) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true,
                      opacity: this.props.opacity
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      opacity: this.props.opacity
                    }
                  };
                }
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(enhancedElement.key)}
                  >
                    {enhancedElement}
                  </TdComp>
                );
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(4, 8).map((element, key) => {
                let enhancedElement;
                if (
                  element.key ===
                  this.state.selectedElements[
                    this.state.selectedElements.length - 1
                  ]
                ) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true,
                      opacity: this.props.opacity
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      opacity: this.props.opacity
                    }
                  };
                }
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(enhancedElement.key)}
                  >
                    {enhancedElement}
                  </TdComp>
                );
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(8, 12).map((element, key) => {
                let enhancedElement;
                if (
                  element.key ===
                  this.state.selectedElements[
                    this.state.selectedElements.length - 1
                  ]
                ) {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      active: true,
                      opacity: this.props.opacity
                    }
                  };
                } else {
                  enhancedElement = {
                    ...element,
                    props: {
                      ...element.props,
                      opacity: this.props.opacity
                    }
                  };
                }
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(enhancedElement.key)}
                  >
                    {enhancedElement}
                  </TdComp>
                );
              })}
            </TrComp>
          </TableBodyComp>
        </TableComp>
      </TrainingStageComp>
    );
  }
}

export default UserInputStage;
