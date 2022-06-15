// External imports
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


// internal imports
import './index.css';

import rootReducer from './store/reducers/rootReducer';
// Component imports
import App from './app';
import { Header } from './components/header/header';
// import { Footer } from './components/footer/footer'
const store = createStore(rootReducer, composeWithDevTools());
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <App />
      {/* <Footer /> */}
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
