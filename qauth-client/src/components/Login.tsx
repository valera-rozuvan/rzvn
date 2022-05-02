import React, { useEffect, useState, useCallback } from 'react';
import type { NavigateOptions } from 'react-router-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { store, useStore, MyState } from '../store';

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

function Login() {
  const [ssoTokenCheckPhase, setSsoTokenCheckPhase] = useState<number>(0);
  const [isValidSsoToken, setIsValidSsoToken] = useState<null | boolean>(null);

  const navigate = useNavigate();

  const [appToken] = useQueryParam('appToken');
  const [nonce] = useQueryParam('nonce');

  const ssoToken = useStore(
    store,
    useCallback((state: MyState) => state.ssoToken, []),
  );

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
    if (ssoTokenCheckPhase !== 1) {
      return;
    }

    const fetchData = async () => {
      setSsoTokenCheckPhase(2); // never do this check again

      let result;

      try {
        result = await axios(`${API_URL}/auth/check_sso_token`, {
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
  }, [ssoTokenCheckPhase]);

  useEffect(() => {
    if (ssoTokenCheckPhase !== 0) {
      return;
    }

    if (typeof ssoToken === 'string' && ssoToken.length > 0) {
      setSsoTokenCheckPhase(1);
    } else {
      setIsValidSsoToken(false);
    }
  }, [ssoToken]);

  return (
    <div>
      This is the Login page.

      {isValidSsoToken === null
        && <div className="box">loading ...</div>}

      {isValidSsoToken === false
        && (
        <div className="box">
          <div className="box">
            <input type="button" value="login with email" />
          </div>
          <div className="box">
            <input type="button" value="login with Google" />
          </div>
          <div className="box">
            <input type="button" value="login with GitHub" />
          </div>
        </div>
        )}
    </div>
  );
}

export default Login;
