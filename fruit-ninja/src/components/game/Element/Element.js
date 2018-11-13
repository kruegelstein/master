//  

import styled, { keyframes } from "styled-components";

const down = keyframes`
  0% {transform: translateY(+0%);}
  100% {transform: translateY(+1000%);}
`;

const element = styled.img`
  width: 5rem;
  height: 5rem;
  animation: ${props => `${down} ${props.speed}s linear`};
  display: ${props => (props.clicked ? "none" : "block")};
  opacity: ${props => props.opacity};
`;

export default element;
