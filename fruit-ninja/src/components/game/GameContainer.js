// @flow

import { connect } from "react-redux";

// Wrapped component
import Game from "./Game.jsx";

// Actions
import { saveRound, goToResults } from "../../actions/actions.js";

const mapStateToProps = state => ({
  userId: state.user.id,
  dimension: state.adaptation.dimension,
  round: state.adaptation.round,
  isResults: state.navigation.results
});

const mapDispatchToProps = dispatch => ({
  onSaveRound: (round, clicks, dimensionProperty) => {
    dispatch(saveRound(round, clicks, dimensionProperty));
  },
  goToResults: () => {
    dispatch(goToResults());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
