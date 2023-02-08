import React from "react";
import "./styles.scss";

export interface IProjectCardProps {
  imgSrc: string;
  alt: string;
  link: string;
  title: string;
  description: string;
}

const ProjectCard = (props: IProjectCardProps) => {
  const { imgSrc, alt, link, title, description } = props;

  return (
    <a
      className="ProjectCard rounded-[32px] shadow-none relative overflow-hidden mb-6 h-96 before:content before:absolute before:w-full before:h-0 before:bg-gradient-to-b before:from-welcome-text1 before:to-welcome-text2 before:opacity-75 before:hover:h-full transition ease-in-out duration-500"
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <img src={imgSrc} alt={alt} className="w-full h-full overflow-hidden" />

      <div className="ProjectCard__text absolute text-center top-2/3 left-1/2 opacity-0 w-full transform -translate-x-2/4 -translate-y-2/4 transition ease-in-out duration-500">
        <h4 className="text-3xl">{title}</h4>
        <span className="italic text-sm">{description}</span>
      </div>
    </a>
  );
};

export default ProjectCard;
