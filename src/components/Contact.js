import React from "react";
// import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { post } from "../services/service";
import axios from "axios";
// import heel from "../images/logo2.png";

const Contact = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  // const [title, setTitle] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [status, setStatus] = React.useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/users/send-email", {
        email: email,
        subject: subject,
        message: message,
        first_name: firstName,
        last_name: lastName,
      });
      console.log(response);
      setEmail("");
      setSubject("");
      setMessage("");
      setFirstName("");
      setLastName("");
      setStatus("I will get back to you as soon as possible!");
    } catch (err) {
      console.error(err.message);
      setStatus("Message did not go through :(");
    }
  };

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
      {/* <hr className="contact-line" />
      <Link to="/">
        <img className="logo" src={heel} alt="Logo" />
      </Link>
      <hr className="contact-line-right" /> */}
      <div className="contact-box">
        <div className="left-col">
          <h1>Contact</h1>
          <p>
            Having issues or need to reach out to me? Don't hesitate to send me
            a message.
          </p>
        </div>
        <form onSubmit={sendEmail} className="right-col">
          <h1>Message Us</h1>
          <div className="contact-names">
            <input
              placeholder="*First Name..."
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              placeholder="*Last Name..."
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <input
            className="contact-email"
            placeholder="*Email..."
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="contact-reason"
            placeholder="*Subject..."
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <textarea
            placeholder="*Your message..."
            rows="10"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button>Submit</button>
          <p className="contact-status">{status}</p>
        </form>
      </div>
      <div className="contact-footer">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
