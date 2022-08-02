import React from "react";
import { deleted, get, post } from "../services/service";
import { Link, useParams, useNavigate } from "react-router-dom";
import home from "../images/home.png";
import contact from "../images/contact.png";
import search from "../images/search.png";

const AccountDetails = () => {
  const [details, setDetails] = React.useState([]);
  const [delTask, setDelTask] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [refresh, setRefresh] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState("");

  const params = useParams();
  const navigate = useNavigate();

  const userDetails = async () => {
    const response = await get("/users/account-details");
    setDetails(response.data);
    setFirstName(response.data.first_name);
    setLastName(response.data.last_name);
    setEmail(response.data.email);
  };

  const remove = async () => {
    const response = await deleted(`/users/delete-user`);
    localStorage.clear();
    navigate("/");
  };

  React.useEffect(() => {
    userDetails();
  }, [refresh]);

  const handleConfirmationBox = () => {
    if (!delTask) {
      document.querySelector(".confirm-bg").style.display = "flex";
      document.querySelector(".container").style.display = "flex";
      setDelTask(true);
    } else {
      document.querySelector(".confirm-bg").style.display = "none";
      document.querySelector(".container").style.display = "none";
      setDelTask(false);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      setStatus("Please don't leave empty fields.");
      console.log(status.length);
    } else {
      const response = await post("/users/update-user", {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

      console.log(response.data.first_name);

      setFirstName(response.data.first_name);
      setLastName(response.data.last_name);
      setEmail(response.data.email);
      setStatus("Succesfully saved!");
      setRefresh(!refresh);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="info-page">
      <div className="info-left">
        <div className="info-menu">
          <ul>
            <li>
              <Link to="/">
                <img height="30" src={home} alt="" /> Home
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <img height="30" src={contact} alt="" />
                Contact
              </Link>
            </li>
            <li>
              <Link to="/search">
                <img height="30" src={search} alt="" />
                Search
              </Link>
            </li>
          </ul>
        </div>
        <img
          className="info-img"
          src={
            details.profilePic ||
            "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
          }
          alt="No Image available"
        />
        <div className="info-name">
          <p className="info-username">{details.username}</p>
          <p className="info-email">{details.email}</p>
        </div>
        <button className="info-logout" onClick={logout}>
          Logout
        </button>
      </div>
      <div className="info-right">
        <form onSubmit={updateUser}>
          <h4>First Name</h4>
          <input
            placeholder="First name..."
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <h4>Last Name</h4>
          <input
            placeholder="Last name..."
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <h4>Email</h4>
          <input
            placeholder="Username..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="save-btn">Save</button>
          <p
            className={
              status.length === 18 ? "update-success" : "update-failed"
            }
          >
            {status}
          </p>
        </form>
        <button
          className="delete-button"
          onClick={() => {
            handleConfirmationBox();
          }}
        >
          Delete
        </button>
        <div className="container">
          <div className="confirmation-text">
            Do you really want to delete this account? This can NOT be undone.
          </div>
          <div className="button-container">
            <button
              className="cancel-button"
              onClick={() => handleConfirmationBox()}
            >
              Cancel
            </button>
            <button className="confirmation-button" onClick={remove}>
              Delete
            </button>
          </div>
        </div>

        <div
          className="confirm-bg"
          onClick={() => handleConfirmationBox()}
        ></div>
      </div>
    </div>
  );
};

export default AccountDetails;
