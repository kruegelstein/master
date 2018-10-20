// @flow

import styled from "styled-components";

const dimension = styled.div`
  display: inline-block;
  font-size: 24px;
  color: ${props => (props.selected ? "#1cce1c" : "black")};
  margin: 1rem;
  cursor: pointer;
`;

export default dimension;
