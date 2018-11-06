// @flow

import styled, { keyframes } from "styled-components";

const down = keyframes`
  0% {transform: translateY(+0%);}
  100% {transform: translateY(+1000%);}
`;

const element = styled.img`
  width: 5rem;
  height: 5rem;
  animation: ${down} 2.5s linear;
  display: ${props => (props.visible ? "block" : "none")};
  opacity: ${props => props.opacity};
`;

export default element;
