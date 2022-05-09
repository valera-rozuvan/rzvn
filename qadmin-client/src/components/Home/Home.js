// Library deps
import React, {useMemo} from "react";
import {useSelector} from "react-redux";

function Home() {
  const authUser = useSelector(state => state.authUser);
  const { email, authToken } = useMemo(() => ({email: authUser.email, authToken: authUser.authToken}), [authUser]);

  return (
    <main className="content">
      <div className="container">
        Welcome!
      </div>
      {authToken ?
        <div className="container">
          Logged in as "{email}"
        </div>
        :
        <div className="container">
          Please login.
        </div>
      }
    </main>
  );
}

export default Home;
