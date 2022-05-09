// Library deps
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link} from "react-router-dom";

// Styles
import "./style.scss";

import {Api} from "../../api/apiAuth";
import {isUnauthorizedError, logApiError} from "../../api/logApiError";
import {AuthUserAuthStates} from '../../constants';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authUser = useSelector(state => state.authUser);
  const { authToken, authState } = useMemo(() => ({ authToken: authUser.authToken, authState: authUser.authState }), [authUser]);

  useEffect(() => {
    switch (authState) {
      case AuthUserAuthStates.loggedIn:
        break;
      case AuthUserAuthStates.loggingOut:
        dispatch({type: "LOGOUT"});
        break;
      case AuthUserAuthStates.loggedOut:
        navigate('/login');
        break;
      case AuthUserAuthStates.unverified:
        async function callCheckAuthTokenApi() {
          try {
            const api = new Api(authToken);
            await api.checkAuthToken();
          } catch (err) {
            logApiError(err);

            if (isUnauthorizedError(err)) {
              return false;
            }
          }

          return true;
        }

        callCheckAuthTokenApi().then((isAuthorized) => {
          switch (isAuthorized) {
            case true:
              dispatch({type: "LOGIN_VERIFIED"});
              break;
            default:
              dispatch({type: "INIT_LOGOUT"});
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

        {authToken ?
          <div className="push-right">
            <Link to="/users">Users</Link>  {" | "}
						<Link to="/superadmins">Super Admins</Link> {" | "}
            <Link to="/apps">Apps</Link>  {" | "}
            <Link to="/logout">Logout</Link>
          </div>
          :
          <div className="push-right">
            <Link to="/login">Login</Link>
          </div>
        }
      </div>
    </header>
  );
};

export default Header;
