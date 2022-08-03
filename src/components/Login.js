import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/service";
import loginimage from "../images/loginimage.jpeg";
import heel from "../images/logo2.png";
import eye from "../images/eye.png";
import useWindowSize from "./WindowSize";
import h2t from "../images/h2t.png";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [passwordShown, setPasswordShown] = React.useState(false);

  const navigate = useNavigate();
  const size = useWindowSize();

  const existingUser = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setStatus("Please enter username and password");
    } else {
      try {
        const response = await post("/users/login", {
          username: username,
          password: password,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("username", username);

        setStatus(`welcome, ${username}`);

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.error(err.message);
        setStatus("Username or password is incorrect");
      }
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="login-page">
      <Link className="arrow" onClick={() => navigate(-1)} to="/">
        &#8592;
      </Link>
      <form onSubmit={existingUser}>
        {size.width <= 428 && (
          <div className="login-top">
            <img src={h2t} alt=" " />
            <h1>Welcome</h1>
            <p>Login</p>
          </div>
        )}
        <input
          placeholder="Username..."
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password..."
          type={passwordShown ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log In</button>
        <p className="status">{status}</p>
        <p className="create-account">
          <Link to="/signup">Create Account</Link>
        </p>
      </form>
      <img
        className="eye"
        onClick={togglePassword}
        src={eye}
        alt="Show Password"
      />
      <div className="right-login">
        <hr className="login-line-left" />
        <img className="login-logo" src={heel} alt="Logo" />
        <hr className="login-line-right" />
        <img className="login-image" src={loginimage} alt="Login" />
        <div className="login-links">
          <Link to="#">Terms Of Use</Link>&nbsp;|&nbsp;
          <Link to="#">Data Privacy Policy</Link>&nbsp;|&nbsp;
          <Link to="#">Cookie Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
