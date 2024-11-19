import "./Footer.scss";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-footer">
        <h4>Our Mission</h4>
        <p>Together we can change the world.</p>
      </div>

      <div className="mid-footer">
        <h1>avefiles foundation</h1>
        <p>Helping others is our first priority</p>

        <p>Copyright 2024 &copy; avefiles foundation</p>
      </div>

      <div className="right-footer">
        <h4>Follow Us</h4>
        <div className="link">
          <BsTwitterX />
          <a href="https://x.com/BASITAbdul15666" target="_blank">Twitter</a>
        </div>
        <div className="link">
          <FaLinkedin />
          <a href="https://www.linkedin.com/in/fahim-abdullah-474900253/" target="_blank">LinkedIn</a>
        </div>
        <div className="link">
          <FaGithub />
          <a href="https://github.com/basitabdullah" target="_blank">Github</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
