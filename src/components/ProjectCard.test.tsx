import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { BrowserRouter } from "react-router";
import ProjectCard from "./ProjectCard";

vi.mock("../utils/techIcons", () => ({
  getTechIcon: vi.fn(() => ({ className, title }: { className?: string; title?: string }) => (
    <div data-testid="tech-icon" className={className} title={title} />
  )),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProjectCard", () => {
  const defaultProps = {
    img: "/test-image.jpg",
    title: "Test Project",
    description: "Test description",
    id: "test-project",
  };

  it("renders project card with basic props", () => {
    renderWithRouter(<ProjectCard {...defaultProps} />);
    
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByAltText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("View Project")).toBeInTheDocument();
  });

  it("renders tech stack icons when provided", () => {
    const propsWithTech = { ...defaultProps, techStack: ["react", "typescript"] };
    renderWithRouter(<ProjectCard {...propsWithTech} />);
    
    expect(screen.getAllByTestId("tech-icon")).toHaveLength(2);
  });

  it("does not render tech stack section when empty", () => {
    renderWithRouter(<ProjectCard {...defaultProps} />);
    
    expect(screen.queryByTestId("tech-icon")).not.toBeInTheDocument();
  });

  it("has correct link to project page", () => {
    renderWithRouter(<ProjectCard {...defaultProps} />);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/test-project");
  });
});