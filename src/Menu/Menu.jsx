import "./Menu.css";

export const Menu = ({ className, ...props }) => {
  return <img className={"menu " + className} src="menu.svg" />;
};
