// @flow

import styled from "styled-components";

const canvas = styled.canvas`
  width: ${props => props.width};
  height: ${props => props.height};;
  display: ${props => props.userId ? 'initial' : 'none'}
  background-color: white;
  margin: 2rem 0;
`;

export default canvas;
