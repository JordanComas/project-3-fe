import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { Link } from "react-router-dom";
import imageMenu from "../images/menu.png";
import { useNavigate } from "react-router-dom";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  let username = localStorage.getItem("username");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img height="30" src={imageMenu} alt="Menu" />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/search">Search</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/contact">Contact Us</Link>
        </MenuItem>
        {!username && (
          <MenuItem onClick={handleClose}>
            <Link to="/login">Log In</Link>
          </MenuItem>
        )}
        {!username && (
          <MenuItem onClick={handleClose}>
            <Link to="/signup">Sign Up</Link>
          </MenuItem>
        )}
        <div className="dropdown-logout">
          {username && (
            <MenuItem onClick={handleClose}>
              <Link onClick={logout} to="/">
                Log Out
              </Link>
            </MenuItem>
          )}
        </div>
      </Menu>
    </div>
  );
}
