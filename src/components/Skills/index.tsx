import React from "react";
import { FaReact, FaSass, FaAngular } from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiBootstrap,
  SiTailwindcss,
  SiStyledcomponents,
} from "react-icons/si";
import colorSharp from "../../assets/images/color-sharp.png";
import SkillImg from "./SkillImg";

export interface ISkill {
  name: string;
  icon: JSX.Element;
  color: string;
}

const Skills = () => {
  const skills: ISkill[] = [
    {
      name: "React",
      icon: <FaReact size={52} />,
      color: "react-blue",
    },
    {
      name: "TypeScript",
      icon: <SiTypescript size={52} />,
      color: "typescript-blue",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript size={52} />,
      color: "javascript-yellow",
    },
    {
      name: "Sass",
      icon: <FaSass size={52} />,
      color: "sass-pink",
    },
    {
      name: "Bootstrap",
      icon: <SiBootstrap size={52} />,
      color: "bootstrap-purple",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss size={52} />,
      color: "tailwind-blue",
    },
    {
      name: "Styled Components",
      icon: <SiStyledcomponents size={52} />,
      color: "styled-components-pink",
    },
    {
      name: "Angular",
      icon: <FaAngular size={52} />,
      color: "angular-red",
    },
  ];

  return (
    <section className="Skills relative pb-12">
      <div className="container mx-auto relative z-20">
        <div className="bg-skill-bg w-full h-auto rounded-[64px] p-6 md:py-16 md:px-12 mt-0 md:-mt-36">
          <h1 className="text-2xl md:text-5xl text-center font-centra font-bold">
            Skills
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mt-8 md:mt-16 md:text-lg">
            With a decade of experience in software development field, through
            constant practice & learning, I enjoy implementing the design
            prototypes into interactive, responsive & progressively enhanced web
            application.
          </p>

          <div className="flex flex-row items-center gap-8 mt-16 max-w-2xl flex-wrap mx-auto">
            {skills.map((skill) => (
              <SkillImg key={skill.name} {...skill} />
            ))}
          </div>
        </div>
      </div>

      <img
        className="absolute top-1/4 bottom-0 w-2/5"
        src={colorSharp}
        alt="left-img"
      />
    </section>
  );
};

export default Skills;
