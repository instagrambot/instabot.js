import {
  ACCOUNTS_CREATE,
  ACCOUNTS_REMOVE,
} from '@/store/actionTypes';

type IAccount = Instabot.IAccount;
interface IAction { type: string; payload: IAccount; }

export default (state: IAccount[] = [], { type, payload }: IAction): IAccount[] => {
  switch (type) {
    case ACCOUNTS_CREATE:
      return [...state, payload];

    case ACCOUNTS_REMOVE:
      return state.filter((x) => x.id !== payload.id);

    default:
      return state;
  }
};
