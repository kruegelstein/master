// @flow

import styled from "styled-components";

const paragraph = styled.span`
  display: inline-block;
  font-size: 18px;
  color: white;
  margin: ${props => (props.margin ? props.margin : "")};
`;

export default paragraph;
