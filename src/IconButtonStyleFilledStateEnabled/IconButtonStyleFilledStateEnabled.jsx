import "./IconButtonStyleFilledStateEnabled.css";
import { Settings } from "../Settings/Settings.jsx";

export const IconButtonStyleFilledStateEnabled = ({
  icon = <Settings className="icon-instance" />,
  styleVariant = "outlined",
  state = "disabled",
  className,
  ...props
}) => {
  const variantsClassName = "style-variant-" + styleVariant + " state-" + state;

  return (
    <div
      className={
        "icon-button-style-filled-state-enabled " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className="container">
        <div className="state-layer">{icon}</div>
      </div>
    </div>
  );
};
