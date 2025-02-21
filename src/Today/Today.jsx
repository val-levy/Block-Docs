import "./Today.css";

export const Today = ({ className, ...props }) => {
  return <img className={"today " + className} src="today.svg" />;
};
