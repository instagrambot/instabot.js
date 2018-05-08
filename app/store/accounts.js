import { ACCOUNTS_CREATE, ACCOUNTS_REMOVE } from './types';

export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case ACCOUNTS_CREATE:
      return [...state, payload];

    case ACCOUNTS_REMOVE:
      return state.filter(x => x.id !== payload);

    default:
      return state;
  }
};

export default {
  create: payload => ({
    type: ACCOUNTS_CREATE,
    payload,
  }),

  remove: id => ({
    type: ACCOUNTS_REMOVE,
    payload: id,
  }),
};
