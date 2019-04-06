import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import createTheme, { Theme } from './config/theme';
import { ThemeProvider } from './config/styled-components';
import GlobalTheme from './GlobalTheme';

import configureStore from './config/configureStore';

const theme: Theme = createTheme();
const store = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <GlobalTheme />
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
