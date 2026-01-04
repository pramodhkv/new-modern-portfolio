import React, { useState } from "react";
import ChatButton from "./ChatButton";
import ChatModal from "./ChatModal";

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ChatButton onClick={handleToggle} isOpen={isOpen} />
      <ChatModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default AIChatBot;
