import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { rootSaga } from './sagas/TodoSagas';
import App from './components/App';
import reducer from './reducers';
import 'todomvc-app-css/index.css';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// Expose the store if we are on a Cypress testing environment, so we can test it.
if (window.Cypress) {
  window.store = store;
}

render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root')
);
