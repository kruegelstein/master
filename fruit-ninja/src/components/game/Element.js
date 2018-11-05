// @flow

import styled, { keyframes } from "styled-components";

const down = keyframes`
  0% {transform: translateY(+0%);}
  100% {transform: translateY(+1000%);}
`;

const element = styled.div`
  width: 5rem;
  height: 5rem;
  background: url(${(props: PropsType) => props.icon}) no-repeat center center;
  background-size: 5rem 5rem;
  animation: ${down} 3s linear;
  display: ${props => (props.visible ? "block" : "none")};
`;

export default element;
