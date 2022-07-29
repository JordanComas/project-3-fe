import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/service";

import heel from "../images/logo2.png";
import wallpaper from "../images/wall6.jpeg";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [imageUrl, setImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [status, setStatus] = React.useState("");

  const navigate = useNavigate();

  const newUser = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setStatus("Please enter username and password");
    }

    try {
      const response = await post("/users/signup", {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email: email,
        profilePic: imageUrl,
      });

      localStorage.setItem("token", response.data);
      localStorage.setItem("username", username);

      setStatus("Thanks for signing up!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err.message);
      setStatus("Username already exists");
    }

    // console.log(response.data);
  };

  const handleFileUpload = async (e) => {
    try {
      setLoading(true);
      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);

      let response = await post("/users/add-picture", uploadData);
      // console.log(response.data);
      setImageUrl(response.data.path);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
      setStatus("Image must be .png or .jpeg");
    }
  };

  return (
    <div className="signup-page">
      <Link className="arrow" onClick={() => navigate(-1)} to="/">
        &#8592;
      </Link>
      <form onSubmit={newUser}>
        <div className="profile-section">
          <img
            className="profilepic-signup"
            src={
              imageUrl ||
              "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
            }
            alt="Profile Picture"
          />
        </div>
        <div className="signup-names">
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="signup-account">
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder="Password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          className="signup-email"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="file" onChange={handleFileUpload} />

        <button disabled={loading}>Register</button>
        <p className="signup-status">{status}</p>
      </form>
      <div className="right-signup">
        <hr className="login-line-left" />
        <img className="login-logo" src={heel} alt="Logo" />
        <hr className="login-line-right" />
        <img className="login-image" src={wallpaper} alt="Wallpaper" />
      </div>
    </div>
  );
};

export default Signup;