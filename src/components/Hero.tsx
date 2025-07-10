import React from "react";
import TypingAnimation from "./TypingAnimation";
import { useResponsive } from "../utils/useResponsive";

const Hero: React.FC = () => {
  const { isDesktop } = useResponsive();

  return (
    <section id="hero">
      <div className="wrapper">
        <div>
          <h3>Hello, I'm Francesco.</h3>
          <h1>Front-End Developer</h1>
          <div>
            <a title="View my work" className="btn" href="#projects">
              View my work
            </a>
          </div>
        </div>
        {isDesktop && <TypingAnimation />}
      </div>
    </section>
  );
};

export default Hero;
