import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  IRootState,
  IAuthUserState,
  EAuthUserAuthState,
  EActionTypes,
} from '../../types';

function Logout() {
  const dispatch = useDispatch();

  const authUser = useSelector<IRootState, IAuthUserState>((state: IRootState): IAuthUserState => state.authUser);
  const { authState } = useMemo(() => ({ authState: authUser.authState }), [authUser]);

  useEffect(() => {
    switch (authState) {
      case EAuthUserAuthState.LOGGED_IN:
        dispatch({ type: EActionTypes.INIT_LOGOUT });
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

export default Logout;
