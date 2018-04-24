import { ADD_ACCOUNT, REMOVE_ACCOUNT } from './actions';

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_ACCOUNT:
      return [...state, payload];

    case REMOVE_ACCOUNT:
      return state.filter(x => x !== payload);

    default:
      return state;
  }
};
