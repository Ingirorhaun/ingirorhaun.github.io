import { MdEmail } from 'react-icons/md';
import { FaLinkedin } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  return (
    <section id="contact">
      <h2>Contact Me</h2>
      <p>
        If you would like to get in touch, feel free to
        reach out via email or connect with me on LinkedIn.
      </p>
      <div className="contact-methods">
        <a href="mailto:francescopantusa@gmail.com">
          <MdEmail /><br/>
          francescopantusa@gmail.com
        </a>
        <a href="https://www.linkedin.com/in/francesco-pantusa-555600156/">
          <FaLinkedin /><br/>
          Linkedin
        </a>
      </div>
    </section>
  );
};

export default ContactPage;
