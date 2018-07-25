import React, { Component } from "react";

// Styled Components
import TrainingStageComp from "./TrainingStage.js";
import TableComp from "../../table/Table.js";
import TableBodyComp from "../../table/TableBody.js";
import TrComp from "../../table/Tr.js";
import TdComp from "../../table/Td.js";

// Constants
import { PATTERN_PACE } from "../../../constants/Pattern.js";

class TrainingStage extends Component {
  state = {
    activeElement: null
  };

  componentDidMount() {
    this.lightUpElements();
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
    this.setState({
      activeElement: this.props.currentRound.pattern[i]
    });
    i++;
    if (i <= this.props.currentRound.pattern.length) {
      this.initiateTimeOut(i);
    } else {
      this.props.onStartCountdown();
    }
  }

  render() {
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
      </TrainingStageComp>
    );
  }
}

export default TrainingStage;