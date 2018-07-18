import { combineReducers, compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import accounts from './accounts';

const reduxDevtools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const reducers = combineReducers({
  accounts: accounts.reducer,
} as any);

const enhancer = compose(
  reduxDevtools && reduxDevtools(),
  persistState(),
);

export default createStore(reducers, enhancer);
