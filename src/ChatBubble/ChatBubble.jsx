import "./ChatBubble.css";

export const ChatBubble = ({ className, ...props }) => {
  return <img className={"chat-bubble " + className} src="chat-bubble.svg" />;
};
