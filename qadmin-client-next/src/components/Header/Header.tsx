import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import './style.scss';

import { AuthApi } from '../../api';
import { isUnauthorizedError, logApiError } from '../../api/tools';
import {
  IRootState,
  IAuthUserState,
  EAuthUserAuthState,
  EActionTypes,
} from '../../types';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector<IRootState, IAuthUserState>((state: IRootState): IAuthUserState => state.authUser);
  const { authToken, authState } = useMemo(() => ({
    authToken: authUser.authToken,
    authState: authUser.authState,
  }), [authUser]);

  async function callCheckAuthTokenApi() {
    try {
      const api = new AuthApi(authToken);
      await api.checkAuthToken();
    } catch (err: unknown) {
      logApiError(err);

      if (isUnauthorizedError(err)) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    switch (authState) {
      case EAuthUserAuthState.LOGGED_IN:
        break;
      case EAuthUserAuthState.LOGGING_OUT:
        dispatch({ type: EActionTypes.LOGOUT });
        navigate('/login');
        break;
      case EAuthUserAuthState.LOGGED_OUT:
        break;
      case EAuthUserAuthState.UNVERIFIED:
        callCheckAuthTokenApi().then((isAuthorized) => {
          switch (isAuthorized) {
            case true:
              dispatch({ type: EActionTypes.LOGIN_VERIFIED });
              break;
            default:
              dispatch({ type: EActionTypes.INIT_LOGOUT });
              break;
          }
        });
        break;
      default:
        break;
    }
  }, [authState, authToken, navigate, dispatch]);

  return (
    <header className="header">
      <div className="container">
        <div className="push-left">
          <Link to="/" className="logo">QAdmin</Link>
        </div>

        {authToken
          ? (
            <div className="push-right">
              <Link to="/users">Users</Link>
              {' '}
              {' | '}
              <Link to="/superadmins">Super Admins</Link>
              {' '}
              {' | '}
              <Link to="/applications">Apps</Link>
              {' '}
              {' | '}
              <Link to="/logout">Logout</Link>
            </div>
          )
          : (
            <div className="push-right">
              <Link to="/login">Login</Link>
            </div>
          )}
      </div>
    </header>
  );
}

export default Header;
