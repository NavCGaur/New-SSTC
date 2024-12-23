import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from "react-redux";
import initSentry from "./sentry/sentryConfig"; 
import store  from './state/store';

import "./index.css";


const root = ReactDOM.createRoot(document.getElementById('root'));

initSentry();


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);



