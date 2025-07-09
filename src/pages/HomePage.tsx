import ContactForm from "../components/ContactForm";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <div id="about">
        I am a front-end developer with a passion for building user-friendly and
        responsive websites. I enjoy turning ideas into reality using code. I am
        always eager to learn new technologies and improve my skills.
      </div>
      <div id="projects">
        <h2>Projects</h2>
        <div className="project-list">
          <ProjectCard
            title="Project 1"
            description="Description of project 1"
            img="https://via.placeholder.com/150"
            link="https://example.com"
          />
          <ProjectCard
            title="Project 2"
            description="Description of project 2"
            img="https://via.placeholder.com/150"
            link="https://example.com"
          />
          <ProjectCard
            title="Project 3"
            description="Description of project 3"
            img="https://via.placeholder.com/150"
            link="https://example.com"
          />
        </div>
      </div>
      <div id="contact">
        <ContactForm />
      </div>
    </div>
  );
};

export default HomePage;
