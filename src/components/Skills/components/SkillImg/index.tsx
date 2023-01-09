import React from "react";
import { ISkill } from "../..";

const SkillImg = (props: ISkill) => {
  const { name, icon, color } = props;

  return (
    <div
      className={`rounded-full border-2 p-3 cursor-pointer ${color} hover:${color} hover:text-white`}
    >
      {icon}
    </div>
  );
};

export default SkillImg;
