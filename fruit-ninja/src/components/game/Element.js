// @flow

import styled from "styled-components";

const element = styled.div`
  width: 5rem;
  height: 5rem;
  background: url(${(props: PropsType) => props.theme.images.skull}) no-repeat
    center center;
  background-size: 5rem 5rem;
`;

export default element;
