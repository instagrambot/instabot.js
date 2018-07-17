import { ACCOUNTS_CREATE, ACCOUNTS_REMOVE } from '@/store/actionTypes';

type IAccount = Instabot.IAccount;

export const create = (payload: IAccount) => ({
  type: ACCOUNTS_CREATE,
  payload,
});

export const remove = (payload: IAccount) => ({
  type: ACCOUNTS_REMOVE,
  payload,
});
