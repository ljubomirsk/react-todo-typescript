import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import createTheme, { Theme } from './config/theme';
import { ThemeProvider } from './config/styled-components';
import configureStore from './config/configureStore';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const theme: Theme = createTheme();
  const store = configureStore();
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
