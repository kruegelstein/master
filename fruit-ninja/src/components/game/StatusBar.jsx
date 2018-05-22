import React, { Component } from "react";

// Styled componets
import BlockContainer from "../general/BlockContainer.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";

class StatusBar extends Component {
  render() {
    return (
      <BlockContainer>
        <Title>Stats</Title>
        <BlockContainer>
          <Paragraph>Level: Implement!</Paragraph>
        </BlockContainer>
        <BlockContainer>
          <Paragraph>Points: Implement!</Paragraph>
        </BlockContainer>
      </BlockContainer>
    );
  }
}

export default StatusBar;
