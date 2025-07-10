import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import ProjectPage from "./ProjectPage";
import type { Project } from "../types/types";

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock("../utils/fetchProjectsData", () => ({
  fetchProjectById: vi.fn(),
}));

vi.mock("../utils/techIcons", () => ({
  getTechIcon: vi.fn(() => () => <div data-testid="tech-icon" />),
}));

vi.mock("../utils/useResponsive", () => ({
  useResponsive: vi.fn(),
}));

const mockProject: Project = {
  id: "test-project",
  title: "Test Project",
  description: "Test project description",
  image: "test-image.jpg",
  url: "https://example.com",
  repositoryUrl: "https://github.com/user/repo",
  techStack: ["react", "typescript"],
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("ProjectPage Integration", () => {
  let useParams: typeof import("react-router").useParams;
  let useResponsive: typeof import("../utils/useResponsive").useResponsive;
  let fetchProjectById: typeof import("../utils/fetchProjectsData").fetchProjectById;

  beforeEach(async () => {
    vi.clearAllMocks();

    ({ useParams } = await import("react-router"));
    ({ useResponsive } = await import("../utils/useResponsive"));
    ({ fetchProjectById } = await import("../utils/fetchProjectsData"));
  });

  const setupMocks = (isDesktop = true, projectData = mockProject) => {
    vi.mocked(useParams).mockReturnValue({ id: "test-project" });
    vi.mocked(useResponsive).mockReturnValue({
      isDesktop,
      isMobile: !isDesktop,
    });
    vi.mocked(fetchProjectById).mockResolvedValue(projectData);
  };

  it("shows loading state initially", () => {
    setupMocks(true);
    renderWithRouter(<ProjectPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders project details when data loads", async () => {
    setupMocks();
    renderWithRouter(<ProjectPage />);

    await waitFor(() => {
      expect(screen.getByText("Test Project")).toBeInTheDocument();
      expect(screen.getByText("Test project description")).toBeInTheDocument();
      expect(screen.getByText("Tech Stack")).toBeInTheDocument();
    });
  });

  it("renders tech stack with icons", async () => {
    setupMocks();
    renderWithRouter(<ProjectPage />);

    await waitFor(() => {
      expect(screen.getAllByTestId("tech-icon")).toHaveLength(2);
      expect(screen.getByText("react")).toBeInTheDocument();
      expect(screen.getByText("typescript")).toBeInTheDocument();
    });
  });

  it("adapts layout for mobile", async () => {
    setupMocks(false);
    renderWithRouter(<ProjectPage />);

    await waitFor(() => {
      const images = screen.getAllByAltText("Test Project");
      expect(images).toHaveLength(1);
    });
  });

  it("renders project and repository links when available", async () => {
    setupMocks();
    renderWithRouter(<ProjectPage />);

    await waitFor(() => {
      const projectLink = screen.getByRole("link", { name: "View Project" });
      const repoLink = screen.getByRole("link", { name: "View Repository" });
      
      expect(projectLink).toHaveAttribute("href", "https://example.com");
      expect(projectLink).toHaveAttribute("target", "_blank");
      expect(repoLink).toHaveAttribute("href", "https://github.com/user/repo");
      expect(repoLink).toHaveAttribute("target", "_blank");
    });
  });

  it("does not render links when URLs are not provided", async () => {
    const projectWithoutUrls = {
      ...mockProject,
      url: undefined,
      repositoryUrl: undefined,
    };
    setupMocks(true, projectWithoutUrls);
    renderWithRouter(<ProjectPage />);

    await waitFor(() => {
      expect(screen.queryByRole("link", { name: "View Project" })).not.toBeInTheDocument();
      expect(screen.queryByRole("link", { name: "View Repository" })).not.toBeInTheDocument();
    });
  });
});
