import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import rootReducer from './store/reducers/rootReducer';

import App from './App';
import Home from './components/Home';

import theme from './components/theme';

const store = createStore(rootReducer);

const root = document.getElementById('root');
render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Home />
        <App />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  root,
);
