//

import styled, { keyframes } from "styled-components";

const down = keyframes`
  0% {top: 0}
  100% {top: 55rem}
`;

const element = styled.img`
  width: 5rem;
  height: 5rem;
  right: ${props => `${props.xCoordinate}px`};
  position: absolute;
  animation: ${props => `${down} ${props.speed}s linear`};
  display: ${props => (props.clicked ? "none" : "block")};
  opacity: ${props => props.opacity};
`;

export default element;
