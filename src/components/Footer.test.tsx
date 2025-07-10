import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import Footer from "./Footer";

describe("Footer", () => {
  const renderElement = () => render(<Footer />);

  it("renders the footer", () => {
    renderElement();
    expect(screen.getByText("© 2025 Francesco Pantusa")).toBeInTheDocument();
  });

  it("renders the contact methods", () => {
    renderElement();
    expect(screen.getByTitle("Email me")).toBeInTheDocument();
    expect(screen.getByTitle("Linkedin")).toBeInTheDocument();
    expect(screen.getByTitle("GitHub")).toBeInTheDocument();
    expect(screen.getByTitle("500px")).toBeInTheDocument();
  });
    
    it("has correct hrefs for contact methods", () => {
        renderElement();
        expect(screen.getByTitle("Email me")).toHaveAttribute("href", "mailto:francescopantusa@gmail.com");
        expect(screen.getByTitle("Linkedin")).toHaveAttribute("href", "https://www.linkedin.com/in/francesco-pantusa-555600156/");
        expect(screen.getByTitle("GitHub")).toHaveAttribute("href", "https://github.com/Ingirorhaun");
        expect(screen.getByTitle("500px")).toHaveAttribute("href", "https://500px.com/p/ingirorhaun");
    });
});
