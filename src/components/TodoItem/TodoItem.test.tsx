import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import { Provider } from 'react-redux';
import { ThemeProvider } from '../../config/styled-components';
import configureStore from '../../config/configureStore';
import createTheme, { Theme } from '../../config/theme';
import { TodoStatus } from '../../store/reducers/todo/todoReducer';
import TodoItem from './TodoItem';
import { Todo } from '../../store/reducers/types/TodoState';

const theme: Theme = createTheme();
const store = configureStore();

let todoId = 0;
let title = 'Title 1';
let status = TodoStatus.ACTIVE;
const todo: Todo = {
  id: todoId,
  status,
  title,
};
const onToggleStatus = jest.fn((id: number) => {
  if (id === todoId) {
    todo.status === TodoStatus.ACTIVE
      ? (todo.status = TodoStatus.COMPLETE)
      : (todo.status = TodoStatus.ACTIVE);
  }
});
const onEdit = jest.fn((id: number, newTitle: string) => {
  if (id === todoId) {
    todo.title = newTitle;
  }
});
const onDelete = jest.fn((id: number) => {
  if (id === todoId) {
    todo.title = '';
  }
});

const setup = (): any => {
  const utils = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
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
  const completeButton = getByText('Mark as complete');

  fireEvent.click(completeButton);
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Provider>
    </ThemeProvider>
  );
  const statusField = getByText('Status: COMPLETE');

  expect(statusField).toBeTruthy();
});

test('It should click edit and show confirm and cancel edit buttons', () => {
  const { rerender, getByText } = setup();
  const editButton = getByText('Edit');

  expect(editButton).toBeTruthy();

  fireEvent.click(editButton);
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Provider>
    </ThemeProvider>
  );
  const cancelEditButton = getByText('Cancel Edit');
  const confirmEditButton = getByText('Confirm');

  expect(cancelEditButton).toBeTruthy();
  expect(confirmEditButton).toBeTruthy();
});

test('It should click delete and set title to empty (simulate deleting)', () => {
  const { rerender, getByText } = setup();
  const deleteButton = getByText('Delete');

  expect(deleteButton).toBeTruthy();

  fireEvent.click(deleteButton);
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Provider>
    </ThemeProvider>
  );
  const titleField = getByText('');

  expect(titleField).toBeTruthy();
});

test('It should change the input value when editing', () => {
  const { rerender, getByText, queryByTestId } = setup();
  const editButton = getByText('Edit');

  expect(editButton).toBeTruthy();

  fireEvent.click(editButton);
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Provider>
    </ThemeProvider>
  );
  const input = queryByTestId('input-title') as HTMLInputElement;

  fireEvent.change(input, { target: { value: 'New title' } });
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <TodoItem
          todo={todo}
          key={todo.id}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Provider>
    </ThemeProvider>
  );
  expect(input.value).toEqual('New title');
});
