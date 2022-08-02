import React from "react";
import { Link, useNavigate } from "react-router-dom";
import wallpaper from "../images/404.webp";
import heel from "../images/logo2.png";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-left">
        <Link className="arrow-notfound" to="/">
          &#8592;
        </Link>
        <h1 className="notfound-text">Return Home</h1>
      </div>
      <div className="notfound-right">
        <hr className="login-line-left" />
        <img className="login-logo" src={heel} alt="Logo" />
        <hr className="login-line-right" />
        <img className="notfound-paper" src={wallpaper} alt="Not Found" />
      </div>
    </div>
  );
};

export default NotFound;
