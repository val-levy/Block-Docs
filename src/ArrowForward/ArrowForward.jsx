import "./ArrowForward.css";

export const ArrowForward = ({ className, ...props }) => {
  return (
    <img className={"arrow-forward " + className} src="arrow-forward.svg" />
  );
};
