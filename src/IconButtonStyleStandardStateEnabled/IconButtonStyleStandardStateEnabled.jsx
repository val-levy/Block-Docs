import "./IconButtonStyleStandardStateEnabled.css";
import { Settings } from "../Settings/Settings.jsx";

export const IconButtonStyleStandardStateEnabled = ({
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
        "icon-button-style-standard-state-enabled " +
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
