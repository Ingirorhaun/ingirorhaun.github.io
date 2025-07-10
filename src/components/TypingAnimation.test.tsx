import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import TypingAnimation from "./TypingAnimation";

vi.mock("prismjs", () => ({
  default: {
    highlight: vi.fn((code) => code),
    languages: { typescript: {} },
  },
}));

vi.mock("prismjs/components/prism-typescript", () => ({}));
vi.mock("prismjs/themes/prism-tomorrow.css", () => ({}));

describe("TypingAnimation", () => {
  it("renders the typing animation container", () => {
    render(<TypingAnimation />);
    
    expect(screen.getByTestId("typing-animation")).toBeInTheDocument();
    expect(screen.getByTestId("typing-animation")).toHaveClass("typing-animation");
  });

  it("contains code element with typescript language class", () => {
    render(<TypingAnimation />);
    
    const codeElement = screen.getByTestId("typing-animation").querySelector("code");
    expect(codeElement).toHaveClass("language-typescript");
  });
});