import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import Hero from "./Hero";
import * as useResponsiveModule from "../utils/useResponsive";

const useResponsiveMock = vi.spyOn(useResponsiveModule, "useResponsive");
const mockedReturnValueDesktop = { isDesktop: true, isMobile: false };
const mockedReturnValueMobile = { isDesktop: false, isMobile: true };

describe("Hero", () => {
  it("renders the hero section", () => {
    render(<Hero />);
    expect(screen.getByText("Hello, I'm Francesco.")).toBeInTheDocument();
    expect(screen.getByText("Front-End Developer")).toBeInTheDocument();
    expect(screen.getByText("View my work")).toBeInTheDocument();
  });

  it("renders TypingAnimation on desktop", () => {
    useResponsiveMock.mockReturnValue(mockedReturnValueDesktop);
    render(<Hero />);
    expect(screen.getByTestId("typing-animation")).toBeInTheDocument();
  });

  it("does not render TypingAnimation on mobile", () => {
    useResponsiveMock.mockReturnValue(mockedReturnValueMobile);
    render(<Hero />);
    expect(screen.queryByTestId("typing-animation")).not.toBeInTheDocument();
  });
});
