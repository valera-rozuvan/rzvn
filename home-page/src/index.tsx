import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import rootReducer from './store/reducers/rootReducer';

import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

import theme from './components/theme';
// import './index.css';
import './style.scss';

const store = createStore(rootReducer);

const root = document.getElementById('root');
render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  root,
);
