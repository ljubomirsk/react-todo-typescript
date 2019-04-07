import React, { FunctionComponent } from 'react';
import { transparentize } from 'polished';
import styled from '../../config/styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  background: ${({ theme }) => transparentize(0.5, theme.colors.primary)};
`;

const Heading1 = styled.h1`
  font-weight: bolder;
`;

interface Props {
  title?: string;
}

const Title: FunctionComponent<Props> = ({ title = 'Default Title' }) => (
  <Container>
    <Heading1>{title}</Heading1>
  </Container>
);

export default Title;
