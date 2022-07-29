import React from "react";
import { Link, useNavigate } from "react-router-dom";

import menu from "../images/menu.png";
import profile from "../images/profile.png";
import contact from "../images/contact.png";
import search from "../images/search.png";
import heel from "../images/logo2.png";
import logpic from "../images/logpic.png";

import FadeMenu from "./FadeMenu";

const Navbar = (props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const name = localStorage.getItem("username");

  // console.log(props.token);
  return props.token ? (
    <nav>
      <div className="menu-wrapper">
        <FadeMenu />
        <p className="menu-text">Menu</p>
      </div>

      <div onClick={logout} className="logout-wrapper">
        <img src={logpic} alt="Login" />
        <p className="logout-text">Logout</p>
      </div>
      {/* <div className="login-wrapper">
        <Link to="/login">
          <img src={profile} />
          <p className="login-text">Profile</p>
        </Link>
      </div> */}
      <div className="contact-wrapper">
        <Link to="/contact">
          <img src={contact} alt="Contact" />
          <p className="contact-text">Contact</p>
        </Link>
      </div>
      <div className="search-wrapper">
        <Link to="/search">
          <img src={search} alt="Search" />
          <p className="search-text">Search</p>
        </Link>
      </div>

      {/* <p className="welcome-text">{`Hello, ${name}`}</p> */}
    </nav>
  ) : (
    <nav>
      <div className="menu-wrapper">
        <FadeMenu />
        <p className="menu-text">Menu</p>
      </div>
      <div className="login-wrapper">
        <Link to="/login">
          <img src={profile} alt="Profile" />
          <p className="login-text">Profile</p>
        </Link>
      </div>
      <div className="contact-wrapper">
        <Link to="/contact">
          <img src={contact} alt="Contact" />
          <p className="contact-text">Contact</p>
        </Link>
      </div>
      <div className="search-wrapper">
        <Link to="/search">
          <img src={search} alt="Search" />
          <p className="search-text">Search</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
