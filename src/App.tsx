import React, { FunctionComponent } from 'react';
import styled from './config/styled-components';

const Example = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const App: FunctionComponent = () => (
  <div>
    <Example>Test</Example>
    <h1>HEHE</h1>
  </div>
);

export default App;
