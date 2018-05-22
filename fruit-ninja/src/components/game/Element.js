// @flow

import styled from "styled-components";

const element = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: url(${(props: PropsType) => props.theme.images.skull}) no-repeat
    center center;
  background-size: 2.5rem 2.5rem;
`;

export default element;
