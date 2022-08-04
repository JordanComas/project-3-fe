import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/service";
import heel from "../images/logo2.png";
import wallpaper from "../images/wall6.jpeg";
import upload from "../images/upload.png";
import eye from "../images/eye.png";
import Loader from "./Loader";

const Signup = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [loader, setLoader] = React.useState(false);

  const navigate = useNavigate();

  const newUser = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setStatus("Please enter username and password");
    }

    try {
      setLoader(true);
      const response = await post("/users/signup", {
        username: username,
        password: password,
        first_name: firstName,
        last_name: lastName,
        email: email,
        profilePic: imageUrl,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("username", username);

      setStatus("Thanks for signing up!");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err.message);
      setStatus("Username already exists");
      setLoader(false);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      setLoading(true);
      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);

      let response = await post("/users/add-picture", uploadData);
      setImageUrl(response.data.path);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      setLoading(false);
      setStatus("Image must be .png or .jpeg");
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="signup-page">
      <Link className="arrow" to="/login">
        &#8592;
      </Link>
      <p className="required">* Required</p>
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
        <div className="signup-account">
          <input
            placeholder="*Username..."
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="signup-eye">
            <input
              placeholder="*Password..."
              type={passwordShown ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              // className="eye"
              onClick={togglePassword}
              src={eye}
              alt="Show Password"
            />
          </div>
        </div>
        <input
          className="signup-email"
          placeholder="*Email..."
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="file-upload" className="custom-file-upload">
          <i className="fa fa-cloud-upload">
            <img src={upload} alt="Upload" height="20" /> Custom Upload
          </i>
        </label>
        <input id="file-upload" type="file" onChange={handleFileUpload} />
        <button disabled={loading}>Register</button>
        <p className="signup-status">{status}</p>
      </form>
      {loader && <Loader />}
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
