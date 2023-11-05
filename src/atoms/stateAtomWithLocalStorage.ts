import { atom } from 'jotai';

import { currentUsernameAtom } from './currentUsernameAtom';

type state = {
  site: string;
  username: string;
  app: string;
};

const STATE_KEY = 'state';

const initialValueDefault: state = {
  site: '',
  username: '',
  app: '',
};

export const stateAtomWithLocalStorage = atom(get => {
  const getInitialState = (STATE_KEY: string, initialValueDefault: state) => {
    const item = localStorage.getItem(STATE_KEY);
    if (item !== null) {
      return JSON.parse(item);
    }
    return initialValueDefault;
  };
  const baseState = getInitialState(STATE_KEY, initialValueDefault);

  const newState = {
    ...baseState,
    username: get(currentUsernameAtom),
  };

  localStorage.setItem(STATE_KEY, JSON.stringify(newState));

  return newState;
});
