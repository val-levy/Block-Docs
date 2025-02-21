import "./Stars.css";

export const Stars = ({ className, ...props }) => {
  return <img className={"stars " + className} src="stars.svg" />;
};
