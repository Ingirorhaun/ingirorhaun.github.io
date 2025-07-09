import type React from "react";

interface ProjectCardProps {
  img: string;
  title: string;
  description: string;
  link: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ img, title, description, link }) => {
  return (
    <div className="project-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <a href={link}>View project</a>
    </div>
  );
};

export default ProjectCard;
