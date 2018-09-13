// @flow

import styled from "styled-components";

const input = styled.input`
  display: block;
  border-radius: 5px;
  border: 1px solid #fff
  margin: auto;
  height: 2rem;
  font-size: 18px;
  width: 6rem;

  ::placeholder {
    color: black;
    padding-left: .1rem;
  }

  :focus {
    outline: none;
    border: 2px solid #91a291;
  }
`;

export default input;
