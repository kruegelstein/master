import React, { Component } from "react";

// Styled-Components
import ResultsComp from "./Results.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";

class Results extends Component {
  calculateCorrectElements() {
    const pattern = this.props.pattern;
    const selected = this.props.selectedElements;
    let correctElements = 0;

    pattern.map(element => {
      const position = pattern.indexOf(element);
      if (selected[position] === element) {
        correctElements++;
      }
    });
    return correctElements;
  }

  render() {
    if (this.props.showResults) {
      const numberOfCorrectElements = this.calculateCorrectElements();
      return (
        <ResultsComp>
          <Title>Results</Title>
          <Paragraph>
            {numberOfCorrectElements} of {this.props.pattern.length} correct!
          </Paragraph>
        </ResultsComp>
      );
    } else return null;
  }
}

export default Results;
