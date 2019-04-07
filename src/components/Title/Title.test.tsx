import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import { Provider } from 'react-redux';
import { ThemeProvider } from '../../config/styled-components';
import configureStore from '../../config/configureStore';
import createTheme, { Theme } from '../../config/theme';
import Title from './Title';

const theme: Theme = createTheme();
const store = configureStore();

const setup = (): any => {
  const utils = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Title />
      </Provider>
    </ThemeProvider>
  );
  return {
    ...utils,
  };
};

afterEach(cleanup);

test('It should change the filter type to completed', () => {
  const { rerender, getByText } = setup();
  const defaultTitle = getByText('Default Title');

  expect(defaultTitle).toBeTruthy();

  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Title title="New Title" />
      </Provider>
    </ThemeProvider>
  );
  const newTitle = getByText('New Title');

  expect(newTitle).toBeTruthy();
});
