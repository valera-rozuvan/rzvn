import React from "react";
import {useSelector} from "react-redux";

// Styles
import "./Home.scss";

function Home() {
  const authUser = useSelector(state => state.authUser);

  return (
    <main className="content">
      <div className="container">
        Welcome!
      </div>
      {authUser.authToken ?
        <div className="container">
          Logged in as "{authUser.email}"
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
