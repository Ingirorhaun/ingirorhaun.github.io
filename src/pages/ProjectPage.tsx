import React, { useEffect } from "react";
import { useParams } from "react-router";
import { fetchProjectById } from "../utils/fetchProjectsData";
import { getTechIcon } from "../utils/techIcons";
import type { Project } from "../types/types";
import { useResponsive } from "../utils/useResponsive";

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = React.useState<Project>();
  const { isDesktop } = useResponsive(1000);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const projectData = await fetchProjectById(id);
      if (projectData) {
        setProject(projectData);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="project-page">
      <div className="col">
        <section className="description">
          <h2>{project.title}</h2>
          {!isDesktop && (
            <div className="project-image">
              <img src={`/assets/${project.image}`} alt={project.title} />
            </div>
          )}
          <p>{project.description}</p>
        </section>
        <section className="project-links">
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {React.createElement(getTechIcon("website"), {
                className: "tech-icon",
                title: project.title + " web page",
              })}
              View project online
            </a>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {React.createElement(getTechIcon("gitHub"), {
                className: "tech-icon",
                title: project.title + " repository",
              })}
              View Repository
            </a>
          )}
        </section>
        {!!project.techStack && (
          <section className="tech-stack">
            <h3>Tech Stack</h3>
            <ul>
              {project.techStack?.map((tech, index) => (
                <li key={index}>
                  {React.createElement(getTechIcon(tech), {
                    className: "tech-icon",
                    title: tech,
                  })}
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {isDesktop && (
        <div className="col">
          <section className="project-image">
            <img src={`/assets/${project.image}`} alt={project.title} />
          </section>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
