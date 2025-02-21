import "./Edit.css";

export const Edit = ({ className, ...props }) => {
  return <img className={"edit " + className} src="edit.svg" />;
};
