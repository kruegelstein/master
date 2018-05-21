// @flow

import { connect } from "react-redux";

// Components
import Results from "./Results.jsx";

const mapStateToProps = state => ({
  showResults: state.environment.results,
  pattern: state.environment.pattern,
  selectedElements: state.input.selected
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
