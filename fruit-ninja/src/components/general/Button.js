// @flow

import styled from "styled-components";

const Button = styled.a`
  border: 1px solid black;
  border-radius: 50%;
  margin: ${props => props.theme.borderSpacing};
  background: white;
  outline: none;
  width: 4rem;
  height: 4rem;
  line-height: 4rem;
  font-weight: bold;
  font-size: 20px;
  color: black;
  padding: 0.5rem;
  cursor: pointer;
  pointer-events: auto;
  pointer-events: initial;
  display: inline-block;
  text-align: center;
  box-shadow: ${props =>
    `${props.theme.shadows.singleButton} ${props.theme.darkShadowColor}`};
  ${props => (props.middle ? "position: absolute" : "")};
  ${props => (props.middle ? "top: 50%" : "")};
  ${props => (props.middle ? "left: 50%" : "")};
`;

export default Button;
