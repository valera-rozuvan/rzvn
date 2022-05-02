import React, { /* useCallback, */ useEffect, useState } from 'react';
import axios from 'axios';
// import * as JSURL from 'jsurl';
import type { NavigateOptions } from 'react-router-dom';
import { /* Routes, Route, Link, */ useNavigate, useSearchParams } from 'react-router-dom';
import { store } from '../store';

const API_URL = process.env.REACT_APP_API_URL;

function useQueryParam(
  key: string,
): [string | undefined, (newQuery: string, options?: NavigateOptions) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key);

  const value = React.useMemo(() => {
    if (typeof paramValue === 'string') {
      let decoded = '';

      try {
        decoded = decodeURIComponent(paramValue);
      } catch (e) {
        return undefined;
      }

      return decoded;
    }
    return undefined;
  }, [paramValue]);

  const setValue = React.useCallback(
    (newValue: string, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, encodeURIComponent(newValue));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams],
  );

  return [value, setValue];
}

function Auth() {
  const navigate = useNavigate();

  const [appToken] = useQueryParam('appToken');
  const [nonce] = useQueryParam('nonce');

  const [appCheckPhase, setAppCheckPhase] = useState(0);
  // let [data, setData] = useState({ clientAppStatus: null });

  // const ssoToken = useStore(
  //   store,
  //   useCallback((state: MyState) => state.ssoToken, [])
  // );

  const setCallbackUrl = (callbackUrl: string) => {
    store.setState((prev) => ({ ...prev, callbackUrl }));
  };
  // const setSsoToken = (ssoToken: string) => {
  //   store.setState((prev) => ({...prev, ssoToken}));
  // };
  const setAppToken = (newAppToken: string) => {
    store.setState((prev) => ({ ...prev, appToken: newAppToken }));
  };
  const setNonce = (newNonce: string) => {
    store.setState((prev) => ({ ...prev, nonce: newNonce }));
  };

  useEffect(() => {
    if (appCheckPhase !== 1) {
      return;
    }

    const fetchData = async () => {
      setAppCheckPhase(2); // never do this check again

      let result;

      try {
        result = await axios(`${API_URL}/auth/check_app`, {
          method: 'post',
          data: {
            appToken,
            nonce,
          },
        });
      } catch (e) {
        console.error(e); // eslint-disable-line

        return new Error('check failed');
      }

      // setData(result.data);
      return result.data;
    };

    fetchData().then((result) => {
      if (result && result.status === 'OK') {
        console.log('App check phase complete!'); // eslint-disable-line

        setCallbackUrl(result.callbackUrl);
        setAppToken(result.appToken);
        setNonce(result.nonce);

        navigate('/login');
      } else {
        console.log('App check phase failed!'); // eslint-disable-line

        setCallbackUrl('');
        setAppToken('');
        setNonce('');

        navigate('/broken');
      }
    });
  }, [appCheckPhase]);

  useEffect(() => {
    if (typeof appToken !== 'string' || appToken.length === 0) {
      navigate('/broken');
      return;
    }

    if (typeof nonce !== 'string' || nonce.length === 0) {
      navigate('/broken');
      return;
    }

    // We have an app token, and a nonce. Let's check if app is allowed to do auth.
    setAppCheckPhase(1);
  }, [nonce, appToken]);

  return (
    <div>
      appToken - &quot;
      {appToken}
      &quot;
      <br />
      nonce - &quot;
      {nonce}
      &quot;
      <br />
    </div>
  );
}

export default Auth;
