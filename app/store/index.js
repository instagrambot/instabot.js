/* eslint-disable no-underscore-dangle */

import { createStore, combineReducers } from 'redux';
import { reducer as accounts } from './accounts';

const reducers = combineReducers({ accounts });

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
