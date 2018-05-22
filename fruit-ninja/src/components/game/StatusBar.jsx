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
          <Paragraph>Lives: {this.props.lives}</Paragraph>
        </BlockContainer>
        <BlockContainer>
          <Paragraph>Level: {this.props.level}</Paragraph>
        </BlockContainer>
        <BlockContainer>
          <Paragraph>Points: {this.props.points}</Paragraph>
        </BlockContainer>
      </BlockContainer>
    );
  }
}

export default StatusBar;
