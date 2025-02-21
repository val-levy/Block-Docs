import "./ArrowBack.css";

export const ArrowBack = ({ className, ...props }) => {
  return <img className={"arrow-back " + className} src="arrow-back.svg" />;
};
