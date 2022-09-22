import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//redux
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import colorValuesReducer from './redux/features/ColorValues/ColorValues';

const store = configureStore({
  reducer: {
    colorValues: colorValuesReducer
  }
});

ReactDOM.render(
  <>
  <Provider store={store}>
    <App />
  </Provider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
