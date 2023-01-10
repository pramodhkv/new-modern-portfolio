import React from "react";
import { ISkill } from "..";
import Tooltip from "../../Tooltip";

const SkillImg = (props: ISkill) => {
  const { name, icon, color } = props;

  return (
    <Tooltip text={name} color={color}>
      <div
        className={`rounded-full border-2 p-3 cursor-pointer text-${color} hover:bg-${color} hover:text-white`}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

export default SkillImg;
