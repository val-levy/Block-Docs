import "./AttachFile.css";

export const AttachFile = ({ className, ...props }) => {
  return <img className={"attach-file " + className} src="attach-file.svg" />;
};
