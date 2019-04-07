import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import { Provider } from 'react-redux';
import { ThemeProvider } from '../../config/styled-components';
import configureStore from '../../config/configureStore';
import createTheme, { Theme } from '../../config/theme';
import Filter from './Filter';
import { FilterType } from '../../store/reducers/todo/todoReducer';

const theme: Theme = createTheme();
const store = configureStore();

let filterType = FilterType.ALL;
const filterByType = jest.fn((type: FilterType) => () => {
  filterType = type;
});

const setup = (): any => {
  const utils = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Filter filterType={filterType} filterByType={filterByType} />
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
  const completedButton = getByText('Completed');

  fireEvent.click(completedButton);
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Filter filterType={filterType} filterByType={filterByType} />
      </Provider>
    </ThemeProvider>
  );

  expect(filterType).toBe(FilterType.COMPLETE);
});

test('It should change the filter type to completed', () => {
  const { rerender, getByText } = setup();
  const completedButton = getByText('Active');

  fireEvent.click(completedButton);
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Filter filterType={filterType} filterByType={filterByType} />
      </Provider>
    </ThemeProvider>
  );

  expect(filterType).toBe(FilterType.ACTIVE);
});
