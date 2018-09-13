// @flow

import styled from "styled-components";

const canvas = styled.canvas`
  width: 100%;
  height: 95%;
  display: ${props => (props.userId ? "initial" : "none")}
  background-color: white;
`;

export default canvas;
