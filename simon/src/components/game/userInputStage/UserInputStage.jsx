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

  nextRound(rollback) {
    this.props.onSetNewSpeed(this.props.speed, rollback || false);
    this.props.onNextRound();
  }

  enrichResults(results) {
    const enrichedResults = getEnrichedResults(results);
    this.props.onWriteToResults(enrichedResults, this.props.round);
    if (this.props.round === 1) {
      this.nextRound();
      return;
    }
    const lastResults = this.props.results[this.props.round - 1];
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
      this.props.onShowResults();
      return;
    }
    if (answerScore === 1 && timeScore > 1) {
      // Die Ergebnisse haben sich etwas verschlechtert aber die Zeit hat sich deutlich verbessert!
      this.nextRound();
      return;
    }
    if (answerScore === 1 && timeScore < -1) {
      // Die Ergebnisse haben sich etwas verschlechtert und die Zeit hat sich deutlich verschlectert!
      if (!this.props.rollback) {
        this.props.onSetRollback();
        this.nextRound(true);
      } else {
        this.props.onShowResults();
      }
      return;
    }
    if (answerScore === 1 && timeScore > -1 && timeScore < 1) {
      // Die Ergebnisse haben sich etwas verschlechtert aber die Zeit ist in range!
      if (!this.props.rollback) {
        this.props.onSetRollback();
        this.nextRound(true);
      } else {
        this.props.onShowResults();
      }
      return;
    }
    if (answerScore > 1) {
      // Die Ergebnisse haben sich verschlechtert!
      if (!this.props.rollback) {
        this.props.onSetRollback();
        this.nextRound(true);
      } else {
        this.props.onShowResults();
      }
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
