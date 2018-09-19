import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "../trainingStage/TrainingStage.js";
import TableComp from "../../table/Table.js";
import TableBodyComp from "../../table/TableBody.js";
import TrComp from "../../table/Tr.js";
import TdComp from "../../table/Td.js";

// Helper
import {
  getEnrichedResults,
  getAnswerScore,
  getTimeScore
} from "../../../utils/results.js";

// Constants
import { PATTERN_SIZE } from "../../../constants/Pattern.js";

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

  nextRound(rollback) {
    this.props.onSetNewSpeed(this.props.speed, rollback || false);
    this.props.onNextRound();
  }

  enrichResults(results) {
    const enrichedResults = getEnrichedResults(results);
    this.props.onWriteToResults(
      enrichedResults,
      this.props.round,
      this.props.speed
    );
    // Always move on to round two
    if (this.props.round === 1) {
      this.nextRound();
      return;
    }
    // If the rollback is set the user got his second chance already and we show results results after the round
    if (this.props.rollback) {
      console.log(
        "rollback was set the round before so this was the last round"
      );
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
    if (lastResults.correct >= 4 && answerScore === 0) {
      // Die guten letzen Ergebnisse konnten gehalten werden!
      this.nextRound();
      return;
    }
    if (answerScore < 0) {
      // Die letzen Ergebnisse konnten verbesert werden!
      this.nextRound();
      return;
    }
    if (lastResults.correct < 4 && answerScore === 0) {
      // Die letzen schlechten Ergebnisse konnten nicht verbesert werden!
      this.props.onSetRollback();
      console.log("Rollback just set");
      this.nextRound(true);
      return;
    }
    if (answerScore === 1 && timeScore > 1) {
      // Die Ergebnisse haben sich etwas verschlechtert aber die Zeit hat sich deutlich verbessert!
      this.nextRound();
      return;
    }
    if (answerScore === 1 && timeScore < -1) {
      // Die Ergebnisse haben sich etwas verschlechtert und die Zeit hat sich deutlich verschlectert!
      this.props.onSetRollback();
      console.log("Rollback just set");
      this.nextRound(true);
      return;
    }
    if (answerScore === 1 && timeScore > -1 && timeScore < 1) {
      // Die Ergebnisse haben sich etwas verschlechtert aber die Zeit ist in range!
      this.props.onSetRollback();
      console.log("Rollback just set");
      this.nextRound(true);
      return;
    }
    if (answerScore > 1) {
      // Die Ergebnisse haben sich verschlechtert!
      this.props.onSetRollback();
      console.log("Rollback just set");
      this.nextRound(true);
      return;
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
