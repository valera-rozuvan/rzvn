// Library deps
import React, {useEffect, useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";

import {AuthUserAuthStates} from '../../constants';

export default function Logout() {
  const dispatch = useDispatch();

  const authUser = useSelector(state => state.authUser);
  const { authState } = useMemo(() => ({authState: authUser.authState}), [authUser]);

  useEffect(() => {
    switch (authState) {
      case AuthUserAuthStates.loggedIn:
        dispatch({type: "INIT_LOGOUT"});
        break;
      default:
        break;
    }
  }, [authState, dispatch]);

  return (
    <main className="content">
      <div className="container">
        Logging out ...
      </div>
    </main>
  );
}
