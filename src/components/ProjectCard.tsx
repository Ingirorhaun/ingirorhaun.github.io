import React from "react";
import { Link } from "react-router";
import { getTechIcon } from "../utils/techIcons";

interface ProjectCardProps {
  img: string;
  title: string;
  description: string;
  id: string;
  techStack?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  img,
  title,
  description,
  id,
  techStack = [],
}) => {
  return (
    <Link to={`/projects/${id}`} className="project-link">
      <div className="project-card">
        <div className="project-image">
          <img src={img} alt={title} />
        </div>
        <div className="project-content">
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>
          {techStack.length > 0 && (
            <div className="project-tech">
              {techStack.map((tech) => (
                React.createElement(getTechIcon(tech), {
                  key: tech,
                  className: "tech-icon",
                  title: tech,
                })
              ))}
            </div>
          )}
          <div className="project-link">
            View Project
            <span className="arrow">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
