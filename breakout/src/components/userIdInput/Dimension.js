// @flow

import styled from "styled-components";

const paragraph = styled.div`
  display: inline-block;
  font-size: 24px;
  color: ${props => (props.selected ? "#1cce1c" : "white")};
  margin: 1rem;
  cursor: pointer;
`;

export default paragraph;
