import React, { FunctionComponent } from 'react';

import Title from './components/Title/Title';
import TodoSection from './components/TodoSection/TodoSection';

const App: FunctionComponent = () => (
  <div>
    <Title title="Todo App" />
    <TodoSection />
  </div>
);

export default App;
