// @flow

import styled from "styled-components";

const Button = styled.a`
  border: 1px solid red;
  border-radius: 5px;
  margin: ${props => props.theme.borderSpacing};
  background: white;
  outline: none;
  width: 8.5rem;
  height: 2rem;
  font-weight: bold;
  font-size: 20px;
  color: ${props => props.theme.baseColors.green};
  padding: 0.5rem;
  cursor: pointer;
  pointer-events: auto;
  pointer-events: initial;
  display: inline-block;
  box-shadow: ${props =>
    `${props.theme.shadows.singleButton} ${props.theme.darkShadowColor}`};
`;

export default Button;
