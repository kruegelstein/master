// @flow

import { connect } from "react-redux";

// Wrapped component
import UserInputStage from "./UserInputStage.jsx";

// Actions
import { selectElement, showResults } from "../../actions/actions.js";

const mapStateToProps = state => ({
  elements: state.environment.elements,
  userInput: state.navigation.userInput,
  selectedElements: state.input.selected
});

const mapDispatchToProps = dispatch => ({
  onSelectElement: key => {
    dispatch(selectElement(key));
  },
  onShowResults: () => {
    dispatch(showResults());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInputStage);
