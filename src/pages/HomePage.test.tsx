import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import HomePage from "./HomePage";
import type { Project } from "../types/types";

vi.mock("../components/Hero", () => ({
  default: () => <div data-testid="hero">Hero Component</div>,
}));

vi.mock("../components/ProjectCard", () => ({
  default: ({ title, id }: { title: string; id: string }) => (
    <div data-testid={`project-card-${id}`}>{title}</div>
  ),
}));

vi.mock("../utils/fetchProjectsData", () => ({
  fetchProjectsData: vi.fn(),
}));

const mockProjects: Project[] = [
  {
    id: "project1",
    title: "Test Project 1",
    description: "Description 1",
    image: "image1.jpg",
    url: "url1",
    techStack: ["react"],
  },
  {
    id: "project2",
    title: "Test Project 2",
    description: "Description 2",
    image: "image2.jpg",
    url: "url2",
    techStack: ["typescript"],
  },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all main sections", async () => {
    const { fetchProjectsData } = await import("../utils/fetchProjectsData");
    vi.mocked(fetchProjectsData).mockResolvedValue(mockProjects);

    renderWithRouter(<HomePage />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByText("About Me")).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText("Projects")).toBeInTheDocument();
    });
  });

  it("renders projects when data loads", async () => {
    const { fetchProjectsData } = await import("../utils/fetchProjectsData");
    vi.mocked(fetchProjectsData).mockResolvedValue(mockProjects);

    renderWithRouter(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("project-card-project1")).toBeInTheDocument();
      expect(screen.getByTestId("project-card-project2")).toBeInTheDocument();
    });
  });

  it("does not render projects section when no data", async () => {
    const { fetchProjectsData } = await import("../utils/fetchProjectsData");
    vi.mocked(fetchProjectsData).mockResolvedValue([]);

    renderWithRouter(<HomePage />);

    await waitFor(() => {
      expect(screen.queryByText("Projects")).not.toBeInTheDocument();
    });
  });
});