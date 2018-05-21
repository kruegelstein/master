// @flow

import { connect } from "react-redux";

// Wrapped component
import UserInputStage from "./UserInputStage.jsx";

// Actions
import { selectElement } from "../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  userInput: state.environment.userInput
});

const mapDispatchToProps = dispatch => ({
  onSelectElement: key => {
    console.log("###", key);
    dispatch(selectElement(key));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInputStage);
