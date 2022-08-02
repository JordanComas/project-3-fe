import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import heel from "../images/logo2.png";

const Contact = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <div className="contact-page">
      <Navbar />
      <div className="banner-text"></div>
      <div className="animation-area">
        <ul className="box-area">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <hr className="contact-line" />
      <Link to="/">
        <img className="logo" src={heel} alt="Logo" />
      </Link>
      <hr className="contact-line-right" />
      <div className="contact-box">
        <div className="left-col">
          <h1>Contact</h1>
          <p>
            Having issues or need to reach out to me? Don't hesitate to send me
            a message.
          </p>
        </div>
        <form className="right-col">
          <h1>Message Us</h1>
          <div className="contact-names">
            <input
              placeholder="First Name..."
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last Name..."
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <input
            className="contact-email"
            placeholder="Email..."
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="contact-reason"
            placeholder="Reason..."
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea placeholder="Your message..." rows="10" />
          <button>Submit</button>
        </form>
      </div>
      <div className="contact-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
