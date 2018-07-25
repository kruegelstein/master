import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "../trainingStage/TrainingStage.js";
import TableComp from "../../table/Table.js";
import TableBodyComp from "../../table/TableBody.js";
import TrComp from "../../table/Tr.js";
import TdComp from "../../table/Td.js";

// Constants
import { PATTERN_SIZE } from "../../../constants/Pattern.js";

const NUMBER_OF_ROUNDS = 3;

class UserInputStage extends Component {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.selectedElements.length === PATTERN_SIZE &&
      !nextProps.currentRound.userInput
    ) {
      this.save();
    }
    // As soon as the endTime is set the round is over
    if (nextProps.currentRound.endTime !== null) {
      if (this.props.round + 1 > NUMBER_OF_ROUNDS) {
        this.showResults(nextProps.currentRound);
      } else {
        this.nextRound(nextProps);
      }
    }
  }

  showResults(currentRound) {
    this.props.onWriteToResults(currentRound, this.props.round);
    this.props.onShowResults();
  }

  nextRound(props) {
    const results = props.currentRound;
    this.props.onWriteToResults(results, props.round);
    this.props.onNextRound();
  }

  save() {
    const userInput = this.props.selectedElements;
    const round = this.props.round;
    this.props.onSaveInput(userInput, round);
    this.props.onStopTime(round);
  }

  selectElement(key) {
    this.props.onSelectElement(key);
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
