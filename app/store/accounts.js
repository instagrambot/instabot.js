import { ACCOUNTS_CREATE, ACCOUNTS_REMOVE } from './types';

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case ACCOUNTS_CREATE:
      return [...state, payload];

    case ACCOUNTS_REMOVE:
      return state.filter(x => x !== payload);

    default:
      return state;
  }
};

export default {
  create: account => ({
    type: ACCOUNTS_CREATE,
    payload: account,
  }),

  remove: account => ({
    type: ACCOUNTS_REMOVE,
    payload: account,
  }),
};
