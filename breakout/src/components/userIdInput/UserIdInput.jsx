import React, { Component } from "react";

// Styled componets
import UserIdInputComp from "./UserIdInput.js";
import Input from "../general/Input.js";
import Title from "../general/Title.js";
import Paragraph from "../general/Paragraph.js";

const ENTER_KEY_CODE = 13;

class UserIdInput extends Component {
  state = { inputValue: "" };
  onTextinputChange = (event: Event) => {
    const newInput = event.target.value;
    this.setState({
      inputValue: newInput
    });
  };

  checkForEnter = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.submit();
    }
  };

  submit() {
    this.props.onSubmitUserId(this.state.inputValue);
  }

  render() {
    if (!this.props.userId) {
      return (
        <UserIdInputComp>
          <Title>Breakout</Title>
          <Paragraph>Please enter a user id:</Paragraph>
          <Input
            onChange={this.onTextinputChange}
            value={this.state.inputValue}
            onKeyUp={this.checkForEnter}
            placeholder="Enter ID"
            autoFocus
          />
        </UserIdInputComp>
      );
    } else return null;
  }
}

export default UserIdInput;
