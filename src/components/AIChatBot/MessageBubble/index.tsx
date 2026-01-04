import React from "react";

interface IMessageBubbleProps {
  message: string;
  isUser: boolean;
}

const formatMessage = (text: string) => {
  // Replace [text](url) markdown links with <a> tags
  let formatted = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-web3-text2 hover:text-web3-text1 underline transition duration-300">$1</a>'
  );

  // Replace **bold** with <strong>
  formatted = formatted.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-bold">$1</strong>'
  );

  // Replace *italic* with <em>
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Replace `code` with <code>
  formatted = formatted.replace(
    /`(.*?)`/g,
    '<code class="bg-gray-700 bg-opacity-50 px-2 py-0.5 rounded text-sm font-mono">$1</code>'
  );

  // Replace numbered lists: 1. item
  formatted = formatted.replace(
    /^(\d+)\.\s+(.+)$/gm,
    '<div class="ml-4 my-1">$1. $2</div>'
  );

  // Replace bullet points: - item
  formatted = formatted.replace(
    /^[-•]\s+(.+)$/gm,
    '<div class="ml-4 my-1">• $1</div>'
  );

  // Replace line breaks
  formatted = formatted.replace(/\n/g, "<br />");

  return formatted;
};

const MessageBubble: React.FC<IMessageBubbleProps> = ({ message, isUser }) => {
  const formattedMessage = formatMessage(message);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[75%] p-4 rounded-2xl ${
          isUser
            ? "bg-gradient-to-r from-web3-text1 to-web3-text2 text-white rounded-br-none"
            : "bg-skill-bg text-white rounded-bl-none"
        }`}
      >
        <div
          className="text-sm md:text-base break-words"
          dangerouslySetInnerHTML={{ __html: formattedMessage }}
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        />
      </div>
    </div>
  );
};

export default MessageBubble;
