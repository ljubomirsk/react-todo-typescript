import React, { ChangeEvent } from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';

import { Provider } from 'react-redux';
import AddTodo from './AddTodo';
import { ThemeProvider } from '../../config/styled-components';
import configureStore from '../../config/configureStore';
import createTheme, { Theme } from '../../config/theme';

let valueProp = '';
const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
  event.preventDefault();
  valueProp = event.target.value;
};

const onClick = jest.fn();

const theme: Theme = createTheme();
const store = configureStore();
const setup = (buttonText?: string): any => {
  const utils = render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        {buttonText ? (
          <AddTodo
            value={valueProp}
            onChange={onChange}
            onClick={() => {}}
            buttonText={buttonText}
          />
        ) : (
          <AddTodo value={valueProp} onChange={onChange} onClick={onClick} />
        )}
      </Provider>
    </ThemeProvider>
  );
  const input = utils.getByTestId('input-title');
  return {
    input,
    ...utils,
  };
};

afterEach(cleanup);

test('It should change the input value', () => {
  const { input, rerender, getByText } = setup();
  const button = getByText('Add Todo');

  fireEvent.change(input, { target: { value: 'New title' } });
  fireEvent.click(button);
  rerender(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AddTodo value={valueProp} onChange={onChange} onClick={() => {}} />
      </Provider>
    </ThemeProvider>
  );

  expect(onClick).toHaveBeenCalled();
  expect(input.value).toBe('New title');
});

test('It should set the button text', () => {
  const { getByText } = setup('Button text');
  const button = getByText('Button text');

  expect(button).toBeTruthy();
});
