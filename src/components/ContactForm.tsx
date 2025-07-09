import React from "react";

const ContactForm: React.FC = () => {
  return (
    <form action="mailto:francescopantusa@gmail.com" method="post" encType="text/plain">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" required></textarea>
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactForm;
