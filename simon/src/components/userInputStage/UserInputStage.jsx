import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "../trainingStage/TrainingStage.js";
import TableComp from "../table/Table.js";
import TableBodyComp from "../table/TableBody.js";
import TrComp from "../table/Tr.js";
import TdComp from "../table/Td.js";

// Constants
import { PATTERN_SIZE } from "../../constants/Pattern.js";

const NUMBER_OF_ROUNDS = 3;

class UserInputStage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedElements.length === PATTERN_SIZE) {
      // There are 3 rounds for each user
      if (this.props.round <= NUMBER_OF_ROUNDS) {
        this.save();
      } else {
        this.props.onShowResults();
      }
    }
    // As soon as the endTime is set the round is over
    if (nextProps.currentRound.endTime !== null) {
      this.nextRound(nextProps);
    }
  }

  nextRound(props) {
    const results = props.currentRound;
    this.props.onWriteToResults(results, props.round);
    this.props.onNextRound();
  }

  save() {
    const userInput = this.props.selectedElements;
    const round = this.props.round;
    this.props.onSaveInput(userInput, this.props.round);
    this.props.onStopTime(this.props.round);
  }

  render() {
    if (this.props.userInput) {
      return (
        <TrainingStageComp>
          <TableComp>
            <TableBodyComp>
              <TrComp>
                {this.props.elements.slice(0, 4).map((element, key) => {
                  return (
                    <TdComp
                      key={key}
                      onClick={() => this.props.onSelectElement(element.key)}
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
                      onClick={() => this.props.onSelectElement(element.key)}
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
                      onClick={() => this.props.onSelectElement(element.key)}
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
    } else return null;
  }
}

export default UserInputStage;
