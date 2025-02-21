import "./Videocam.css";

export const Videocam = ({ className, ...props }) => {
  return <img className={"videocam " + className} src="videocam.svg" />;
};
