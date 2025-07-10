import { MdEmail } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import FiveHundredPxIcon from "./FiveHundredPxIcon";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="contact-methods">
          <a title="Email me" href="mailto:francescopantusa@gmail.com">
            <MdEmail />
          </a>
          <a
            title="Linkedin"
            href="https://www.linkedin.com/in/francesco-pantusa-555600156/"
          >
            <FaLinkedin />
          </a>
          <a
            title="GitHub"
            href="https://github.com/Ingirorhaun"
          >
            <FaGithub />
          </a>
          <a
            title="500px"
            href="https://500px.com/p/ingirorhaun"
          >
            <FiveHundredPxIcon />
          </a>
        </div>
        <p>© 2025 Francesco Pantusa</p>
        <div className="social-links"></div>
      </div>
    </footer>
  );
};

export default Footer;
