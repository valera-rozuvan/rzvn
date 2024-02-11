import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import {
  IRootState,
  IAuthUserState,
} from '../../types';

function Home() {
  const authUser = useSelector<IRootState, IAuthUserState>((state: IRootState): IAuthUserState => state.authUser);
  const { email, authToken } = useMemo(() => ({
    email: authUser.email,
    authToken: authUser.authToken,
  }), [authUser]);

  return (
    <main className="content">
      <div className="container">
        Welcome!
      </div>
      {authToken
        ? (
          <div className="container">
            Logged in as &ldquo;
            {email}
            &rdquo;
          </div>
        )
        : (
          <div className="container">
            Please login.
          </div>
        )}
    </main>
  );
}

export default Home;
