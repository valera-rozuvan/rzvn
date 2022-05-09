// Library deps
import React from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import Home from "./components/Home/Home";
import Users from "./components/Users/Users";
import SuperAdmins from "./components/SuperAdmins/SuperAdmins";
import Apps from "./components/Apps/Apps";
import Login from "./components/Login";
import Logout from "./components/Logout";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
				<Route path="superadmins" element={<SuperAdmins />} />
        <Route path="apps" element={<Apps />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
