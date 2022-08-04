import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../images/profile.png";
import contact from "../images/contact.png";
import search from "../images/search.png";
import logpic from "../images/logpic.png";
import FadeMenu from "./FadeMenu";
import useWindowSize from "./WindowSize";
import heel from "../images/logo2.png";

const Navbar = (props) => {
  const navigate = useNavigate();
  const size = useWindowSize();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return props.token ? (
    <nav>
      <hr className="home-line" />
      <Link to="/">
        <img className="logo" src={heel} alt="Logo" />
      </Link>
      <hr className="home-line-right" />
      <div className="menu-wrapper">
        <FadeMenu />
        <p className="menu-text">Menu</p>
      </div>
      {size.width >= 429 && (
        <div>
          <div onClick={logout} className="logout-wrapper">
            <img src={logpic} alt="Login" />
            <p className="logout-text">Logout</p>
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
        </div>
      )}
    </nav>
  ) : (
    <nav>
      <hr className="home-line" />
      <Link to="/">
        <img className="logo" src={heel} alt="Logo" />
      </Link>
      <hr className="home-line-right" />
      <div className="menu-wrapper">
        <FadeMenu />
        <p className="menu-text">Menu</p>
      </div>
      {size.width >= 429 && (
        <div>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
