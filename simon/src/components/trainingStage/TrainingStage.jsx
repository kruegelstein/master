import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "./TrainingStage.js";
import Button from "../general/Button.js";
import TableComp from "../table/Table.js";
import TableBodyComp from "../table/TableBody.js";
import TrComp from "../table/Tr.js";
import TdComp from "../table/Td.js";

// Utils
import { createElements } from "../../utils/elements.js";
import { createPattern } from "../../utils/lightUp.js";

const PATTERN_SIZE = 3;
const PATTERN_PACE = 1000;

class TrainingStage extends Component {
  state = {
    activeElement: null
  };
  componentWillMount() {
    this.props.onWriteElementsToState(createElements(12));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.elements === null && nextProps.elements.length > 1) {
      this.props.onWritePatternToState(
        createPattern(PATTERN_SIZE, nextProps.elements)
      );
    }
    if (!this.props.training && nextProps.training) {
      this.lightUpElements();
    }
  }

  lightUpElements() {
    this.initiateTimeOut(0);
  }

  initiateTimeOut(i) {
    setTimeout(() => {
      this.light(i);
    }, PATTERN_PACE);
  }

  light(i) {
    this.setState({ activeElement: this.props.pattern[i] });
    i++;
    if (i <= this.props.pattern.length) {
      this.initiateTimeOut(i);
    }
  }

  render() {
    if (this.props.userId && this.props.training) {
      return (
        <TrainingStageComp>
          <TableComp>
            <TableBodyComp>
              <TrComp>
                {this.props.elements.slice(0, 4).map((element, key) => {
                  if (element.key === this.state.activeElement) {
                    const newElement = {
                      ...element,
                      props: {
                        ...element.props,
                        active: true
                      }
                    };
                    return <TdComp key={key}>{newElement}</TdComp>;
                  } else return <TdComp key={key}>{element}</TdComp>;
                })}
              </TrComp>
              <TrComp>
                {this.props.elements.slice(4, 8).map((element, key) => {
                  if (element.key === this.state.activeElement) {
                    const newElement = {
                      ...element,
                      props: {
                        ...element.props,
                        active: true
                      }
                    };
                    return <TdComp key={key}>{newElement}</TdComp>;
                  } else return <TdComp key={key}>{element}</TdComp>;
                })}
              </TrComp>
              <TrComp>
                {this.props.elements.slice(8, 12).map((element, key) => {
                  if (element.key === this.state.activeElement) {
                    const newElement = {
                      ...element,
                      props: {
                        ...element.props,
                        active: true
                      }
                    };
                    return <TdComp key={key}>{newElement}</TdComp>;
                  } else return <TdComp key={key}>{element}</TdComp>;
                })}
              </TrComp>
            </TableBodyComp>
          </TableComp>
          <Button onClick={() => this.lightUpElements()}>Repeat</Button>
          <Button onClick={this.props.onStartUserInput}>Start</Button>
        </TrainingStageComp>
      );
    } else if (
      this.props.userId &&
      !this.props.training &&
      !this.props.userInput &&
      !this.props.showResults
    ) {
      return <Button onClick={this.props.onStartTraining}>Train!</Button>;
    } else return null;
  }
}

export default TrainingStage;
