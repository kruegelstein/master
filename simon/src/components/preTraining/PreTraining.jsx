import React, { Component } from "react";

// Styled Components
import PreTrainingComp from "./PreTraining.js";
import Title from "../general/Title.js";

// Utils
import { createPattern } from "../../utils/lightUp.js";

// Constants
import { PATTERN_SIZE } from "../../constants/Pattern.js";

class PreTraining extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.currentRound !== nextProps.currentRound) {
      this.props.onWritePatternToState(
        createPattern(PATTERN_SIZE, nextProps.elements)
      );
    }
    if (!this.props.preTraining && nextProps.preTraining) {
      this.dismissScreen();
    }
  }

  dismissScreen() {
    setTimeout(() => {
      this.props.onStartTraining();
    }, 3000);
  }

  render() {
    if (this.props.preTraining) {
      return (
        <PreTrainingComp>
          <Title>Get Ready!</Title>
        </PreTrainingComp>
      );
    } else return null;
  }
}

export default PreTraining;
