// @flow

import { connect } from "react-redux";

// Wrapped component
import DashBoard from "./DashBoard.jsx";

const mapStateToProps = state => ({
  dimension: state.user.dimension,
  points: 0
});

export default connect(mapStateToProps, null)(DashBoard);
