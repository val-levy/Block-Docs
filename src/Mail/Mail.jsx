import "./Mail.css";

export const Mail = ({ className, ...props }) => {
  return <img className={"mail " + className} src="mail.svg" />;
};
