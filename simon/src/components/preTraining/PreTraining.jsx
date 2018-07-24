import React, { Component } from "react";

// Styled Components
import PreTrainingComp from "./PreTraining.js";
import Title from "../general/Title.js";

class PreTraining extends Component {
  componentWillReceiveProps(nextProps) {
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
