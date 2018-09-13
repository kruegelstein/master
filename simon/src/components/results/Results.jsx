import React, { Component } from "react";

// Styled-Components
import ResultsComp from "./Results.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";

class Results extends Component {
  componentWillMount() {
    this.props.sendResultsToDb(this.props.results, this.props.userId);
  }
  render() {
    if (this.props.showResults) {
      return (
        <ResultsComp>
          <Title>Thank you for participating!</Title>
          <Paragraph>Your results have been saved</Paragraph>
        </ResultsComp>
      );
    }
    return null;
  }
}

export default Results;
