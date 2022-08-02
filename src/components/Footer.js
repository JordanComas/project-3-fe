import React from "react";
import git from "../images/git.png";
import linkedin from "../images/linkedin.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer-text">
        <p>Jordan Comas © 2022</p>
      </div>

      <div className="footer-links">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/jordan-comas-338882235/"
        >
          <img src={linkedin} alt="LinkedIn" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/JordanComas"
        >
          <img src={git} alt="Github" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
