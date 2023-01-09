import React from "react";
import ProjectCard, { IProjectCardProps } from "./ProjectCard";
import Project1 from "../../assets/images/project1.png";
import Project2 from "../../assets/images/project2.png";
import Project3 from "../../assets/images/project3.png";

const Projects = () => {
  const projects: IProjectCardProps[] = [
    {
      title: "NFT Marketplace",
      description:
        "A NFT Marketplace built using React, TypeScript Sanity, ThirdWeb and Tailwind.",
      alt: "nft-marketplace",
      link: "https://nft-challenge-pramodhkv.vercel.app/",
      imgSrc: Project1,
    },
    {
      title: "Deliciousss",
      description:
        "A Recipe App built using React, TypeScript, Framer Motion and Tailwind.",
      imgSrc: Project2,
      alt: "Deliciousss",
      link: "https://react-recipe-app-pramodhkv.vercel.app/",
    },
    {
      title: "WhatsApp Web clone",
      description:
        "A WhatsApp Web clone built using React, JavaScript and Firebase.",
      alt: "whatsapp-clone",
      link: "https://whatsapp-web-clone-pramodh.web.app/",
      imgSrc: Project3,
    },
  ];

  return (
    <section className="relative">
      <div className="bg-body-bg py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-5xl text-center font-centra font-bold">
            Projects
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto my-8 md:md-16">
            Here are some of the projects which I have worked on in the recent
            past.
          </p>

          <div className="mt-16 flex flex-col items-center justify-center gap-5 md:px-8 md:flex-row">
            {projects.map((project, index) => (
              <ProjectCard
                key={`${project.alt}-${index}`}
                alt={`${project.alt}-${index}`}
                imgSrc={project.imgSrc}
                link={project.link}
                title={project.title}
                description={project.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
