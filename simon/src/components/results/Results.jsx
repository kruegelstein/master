import React, { Component } from "react";

// Styled-Components
import ResultsComp from "./Results.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";

class Results extends Component {
  render() {
    if (this.props.showResults) {
      return (
        <ResultsComp>
          <Title>Results</Title>
          <Paragraph>DONE!</Paragraph>
        </ResultsComp>
      );
    } else return null;
  }
}

export default Results;
