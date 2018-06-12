/* eslint-disable no-underscore-dangle */

import { createStore, combineReducers, compose } from 'redux';
import persistState from 'redux-localstorage';
import * as accounts from './accounts';

const reducers = combineReducers({
  accounts: accounts.reducer,
});

const enhancer = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  persistState(),
);

export default createStore(reducers, enhancer);
