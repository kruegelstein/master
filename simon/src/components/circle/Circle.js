// @flow

import styled from "styled-components";

const square = styled.div`
  background-color: ${props =>
    props.active ? props.theme.highlightColor : props.color};
  height: ${props => props.size};
  width: ${props => props.size};
  margin: ${props => props.margin};
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
`;

export default square;
