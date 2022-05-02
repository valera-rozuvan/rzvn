import { useEffect, useState } from 'react';

export interface MyState {
  appToken: string;
  ssoToken: string;
  callbackUrl: string;
  nonce: string;
}

interface MyStore {
  getState: () => MyState;
  setState: (fn: (state: MyState) => MyState) => void;
  subscribe: (listener: () => void) => void;
}

const createStore = (initialState: MyState): MyStore => {
  let state: MyState = initialState;

  const getState = () => state;

  const listeners: Set<() => void> = new Set();

  const setState = (fn: (newState: MyState) => MyState) => {
    state = fn(state);

    localStorage.setItem('appToken', state.appToken);
    localStorage.setItem('ssoToken', state.ssoToken);
    localStorage.setItem('callbackUrl', state.callbackUrl);
    localStorage.setItem('nonce', state.nonce);

    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);

    return () => listeners.delete(listener);
  };

  return { getState, setState, subscribe };
};

type SelectorFn = (state: MyState) => string;

export const useStore = (store: MyStore, selector: SelectorFn) => {
  const [state, setState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const callback = () => setState(selector(store.getState()));

    const unsubscribe = store.subscribe(callback);

    callback();

    return unsubscribe;
  }, [store, selector]);

  return state;
};

export const store = createStore({
  appToken: localStorage.getItem('appToken') || '',
  ssoToken: localStorage.getItem('ssoToken') || '',
  callbackUrl: localStorage.getItem('callbackUrl') || '',
  nonce: localStorage.getItem('nonce') || '',
});
