import "./Footer.scss";
import { FaLinkedin } from "react-icons/fa";
import logo from "../../assets/logo.jpg";
import { FiInstagram } from "react-icons/fi";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-footer">
        <h4>Our Mission</h4>
        <p>Together we can change the world.</p>
      </div>

      <div className="mid-footer">
         <div className="logo">
          <img src={logo} alt="err" />
         <h1>Avefiles Foundation</h1>
         </div>
        <p>Kursoo Rajbagh, Srinagar, Jammu and Kashmir</p>

        <p>Copyright 2025 &copy; avefiles foundation</p>
      </div>

      <div className="right-footer">
        <h4>Follow Us</h4>
        <div className="link">
          <FiInstagram />
          <a href="https://www.instagram.com/avefiles.foundation/" target="_blank">
            Instagram
          </a>
        </div>
        <div className="link">
          <FaLinkedin />
          <a
            href="https://www.linkedin.com/company/avefiles-foundation/?originalSubdomain=in"
            target="_blank"
          >
            LinkedIn
          </a>
        </div>
     
      </div>
    </footer>
  );
};

export default Footer;