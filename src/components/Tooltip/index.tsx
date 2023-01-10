import React, { memo, ReactNode } from "react";

export type TTooltipProps = {
  children: ReactNode;
  text: string;
  color?: string;
};

const Tooltip = memo((props: TTooltipProps) => {
  const { children, text, color = "bg-black" } = props;
  return (
    <span className="group relative">
      <span
        className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-${color} px-2 py-1 text-${color} opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-white before:content-[''] group-hover:opacity-100`}
      >
        {text}
      </span>

      {children}
    </span>
  );
});

//Tooltip.displayName = "Tooltip";

export default Tooltip;
