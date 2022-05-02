import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Wrapper from '../Wrapper';
import WrapperNoMargin from '../WrapperNoMargin';

import { rndStr } from '../../utils';

const APP_PUBLIC_KEY = process.env.REACT_APP_APP_PUBLIC_KEY;
const AUTH_BASE_URL = process.env.REACT_APP_AUTH_BASE_URL;

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector(state => state.authUser);
  const [isLoggedIn, setIsLoggedIn] = useState(!!(authUser && authUser.isLoggedIn));

  const [authUrl, setAuthUrl] = useState('');
  const [appPublicKey] = useState(APP_PUBLIC_KEY);
  const [authBaseUrl] = useState(AUTH_BASE_URL);

  useEffect(() => {
    setIsLoggedIn(!!(authUser && authUser.isLoggedIn));
  }, [authUser]);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate('/');
      }, 1.5 * 1000);

      return;
    }

    const nonce = rndStr(32);
    dispatch({ type: 'SET_NONCE', data: nonce });

    setAuthUrl(`${authBaseUrl}/auth?nonce=${nonce}&appPublicKey=${appPublicKey}`);
  }, [isLoggedIn, navigate, dispatch, appPublicKey, authBaseUrl]);

  return (
    <WrapperNoMargin>
      {!isLoggedIn ?
        <WrapperNoMargin>
          <Wrapper>
            You need to login via RZVN networks SSO service.
          </Wrapper>
          <Wrapper>
            You will be redirected back to the Uptime service main page (when authenticated).
          </Wrapper>
          <Wrapper>
            <a href={authUrl}>Login via SSO</a>
          </Wrapper>
        </WrapperNoMargin>
        :
        <WrapperNoMargin>
          <Wrapper>
            Redirecting back to the Uptime service main page.
          </Wrapper>
        </WrapperNoMargin>
      }
    </WrapperNoMargin>
  );
}

export default Login;
