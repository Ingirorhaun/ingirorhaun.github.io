import React from "react"

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="logo">
        <h3>Francesco Pantusa</h3>
      </div>
      <nav>
        <a href="/">Home</a>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  );
};

export default Header
