import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import React, { useState, useEffect } from "react";
import type { Project } from "../types/types";
import { fetchProjectsData } from "../utils/fetchProjectsData";

const HomePage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await fetchProjectsData();
      if (projectsData) {
        setProjects(projectsData);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="home-page">
      <Hero />
      <section id="about">
        <h2>About Me</h2>
        <p>
          I'm a front-end developer with a curious mindset and a hands-on
          approach. During my years at BlaBlaCar I wore many hats: writing code,
          fixing bugs, improving internal tools, and helping teams work better
          together. That experience taught me how to build things that are not
          just functional, but actually helpful. Now, I design and build web
          interfaces with React and TypeScript, always with the end user in
          mind, and never forgetting what makes a tool genuinely useful.
        </p>
      </section>
      {projects.length > 0 && (
        <section id="projects">
          <h2>Projects</h2>
          <div className="projects-list">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                img={`/assets/${project.image}`}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
