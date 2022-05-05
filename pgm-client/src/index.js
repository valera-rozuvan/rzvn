// External imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {  BrowserRouter  } from 'react-router-dom'
import { createStore } from "redux";

// internal imports
import './index.css'
import * as serviceWorker from './serviceWorker'

import rootReducer from './store/reducers/rootReducer'
// Component imports
import App from './app'
import { Header } from './components/header/header'
// import { Footer } from './components/footer/footer'
const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
		<BrowserRouter>
        <Header />
        <App />
        {/* <Footer /> */}
				</BrowserRouter>
    </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
