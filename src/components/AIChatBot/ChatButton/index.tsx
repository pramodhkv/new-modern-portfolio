import React from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import "./styles.scss";

interface IChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const ChatButton: React.FC<IChatButtonProps> = ({ onClick, isOpen }) => {
  if (isOpen) return null;

  return (
    <button
      onClick={onClick}
      className="chat-button fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-web3-text1 to-web3-text2 hover:from-web3-text2 hover:to-web3-text1 text-white p-5 rounded-full shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 ring-4 ring-web3-text1/40 hover:ring-web3-text2/60"
      aria-label="Open AI Chat"
    >
      <IoChatbubblesOutline className="w-7 h-7" />
    </button>
  );
};

export default ChatButton;
