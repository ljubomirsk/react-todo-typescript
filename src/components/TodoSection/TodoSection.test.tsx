import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import { Provider } from 'react-redux';
import { ThemeProvider } from '../../config/styled-components';
import createTheme, { Theme } from '../../config/theme';
import TodoSection from './TodoSection';
import configureStore from '../../config/configureStore';

const theme: Theme = createTheme();
const mainStore = configureStore();

afterEach(cleanup);

test('add new todo item', () => {
  const { getByTestId, getByText } = render(
    <ThemeProvider theme={theme}>
      <Provider store={mainStore}>
        <TodoSection />
      </Provider>
    </ThemeProvider>
  );
  const addButton = getByText('Add Todo');
  const input = getByTestId('input-title');

  fireEvent.change(input, { target: { value: 'New title' } });
  fireEvent.click(addButton);

  const editButton = getByText('Edit');
  expect(editButton).toBeTruthy();
});

test('delete an item', () => {
  const { getByTestId, getByText, getAllByTestId } = render(
    <ThemeProvider theme={theme}>
      <Provider store={mainStore}>
        <TodoSection />
      </Provider>
    </ThemeProvider>
  );
  const addButton = getByText('Add Todo');
  const input = getByTestId('input-title');

  fireEvent.change(input, { target: { value: 'New title' } });
  fireEvent.click(addButton);

  const deleteButton = getByText('Delete all');
  fireEvent.click(deleteButton);

  const inputs = getAllByTestId('input-title');
  expect(inputs.length).toBe(1);
});

test('delete an item', () => {
  const { getByTestId, getByText, getAllByTestId } = render(
    <ThemeProvider theme={theme}>
      <Provider store={mainStore}>
        <TodoSection />
      </Provider>
    </ThemeProvider>
  );
  const addButton = getByText('Add Todo');
  const input = getByTestId('input-title');

  fireEvent.change(input, { target: { value: 'New title' } });
  fireEvent.click(addButton);

  const markAllCompleteButton = getByText('Mark all as complete');
  fireEvent.click(markAllCompleteButton);

  const statusFields = getAllByTestId('status-header');
  statusFields.forEach(field => expect(field.textContent).not.toContain('ACTIVE'));
});
