/**
 * Represents a project.
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  repositoryUrl?: string;
  url?: string;
  techStack: string[];
}