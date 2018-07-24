import React, { Component } from "react";

// Styled Components
import IntroScreenComp from "./IntroScreen.js";
import Button from "../general/Button.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";

class IntroScreen extends Component {
  render() {
    if (this.props.intro) {
      return (
        <IntroScreenComp>
          <Title>Introduction</Title>
          <Paragraph>You are about to play the game Simon Says.</Paragraph>
          <Paragraph>
            Within the training stage different objects will be presented to
            you. The objects will light up in a specific pattern.
          </Paragraph>
          <Paragraph>
            The objective of the game is to repeat that pattern afterwards.
          </Paragraph>
          <Paragraph>
            Be careful and ready - The pattern will not be repeated.
          </Paragraph>
          <Button onClick={() => this.props.onPreTraining()}>Start</Button>
        </IntroScreenComp>
      );
    } else return null;
  }
}

export default IntroScreen;
