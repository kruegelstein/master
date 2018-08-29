import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "../trainingStage/TrainingStage.js";
import TableComp from "../../table/Table.js";
import TableBodyComp from "../../table/TableBody.js";
import TrComp from "../../table/Tr.js";
import TdComp from "../../table/Td.js";

// Helper
import { getErrors, getTime, getTimeScore } from "../../../utils/results.js";

// Constants
import { PATTERN_SIZE } from "../../../constants/Pattern.js";
const THRESHOLD = 9;

class UserInputStage extends Component {
  state = {
    round: this.props.round,
    startTime: null,
    endTime: null,
    patternSize: this.props.currentRound.patternSize,
    pattern: this.props.currentRound.pattern,
    selectedElements: []
  };

  componentWillMount() {
    this.setState({ startTime: Date.now() });
  }

  nextRound() {
    this.props.onSetNewSpeed(this.props.speed);
    this.props.onNextRound();
  }

  enrichResults(results) {
    // Results
    const pattern = results.pattern;
    const patternSize = results.patternSize;
    const selectedElements = results.selectedElements;
    const startTime = results.startTime;
    const endTime = results.endTime;
    // Calculate error, success, timeTaken
    const errors = getErrors(pattern, selectedElements);
    const errorRate = errors / patternSize * 100;
    const correct = patternSize - errors;
    const successRate = correct / patternSize * 100;
    const timeTakenInSec = getTime(startTime, endTime);
    // Calculate score
    const pointScore = correct * 1.5;
    const timeScore = getTimeScore(timeTakenInSec);
    const score = pointScore + timeScore;

    const enrichedResults = {
      pattern,
      patternSize,
      selectedElements,
      startTime,
      endTime,
      errors,
      correct,
      errorRate,
      successRate,
      timeTakenInSec,
      score
    };
    this.props.onWriteToResults(enrichedResults, this.props.round);
    // Decide whether we go to the next round or show results based on score
    if (score < THRESHOLD) {
      this.props.onShowResults();
    } else {
      this.nextRound();
    }
  }

  selectElement(key) {
    // Build add element to selected elements
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
        this.enrichResults(this.state);
      }, 1);
    }
  }

  render() {
    return (
      <TrainingStageComp>
        <TableComp>
          <TableBodyComp>
            <TrComp>
              {this.props.elements.slice(0, 4).map((element, key) => {
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(element.key)}
                  >
                    {element}
                  </TdComp>
                );
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(4, 8).map((element, key) => {
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(element.key)}
                  >
                    {element}
                  </TdComp>
                );
              })}
            </TrComp>
            <TrComp>
              {this.props.elements.slice(8, 12).map((element, key) => {
                return (
                  <TdComp
                    key={key}
                    onClick={() => this.selectElement(element.key)}
                  >
                    {element}
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
