import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

// Styles
import "./style.scss";

const Header = () => {
  const authUser = useSelector(state => state.authUser);

  return (
    <header className="header">
      <div className="container">
        <div className="push-left">
          <Link to="/" className="logo">QAdmin</Link>
        </div>

        {authUser.authToken ?
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
