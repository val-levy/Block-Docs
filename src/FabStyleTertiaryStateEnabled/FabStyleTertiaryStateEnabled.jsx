import "./FabStyleTertiaryStateEnabled.css";
import { Edit2 } from "../Edit2/Edit2.jsx";
import { Edit } from "../Edit/Edit.jsx";

export const FabStyleTertiaryStateEnabled = ({
  icon = <Edit2 className="icon-instance" />,
  styleVariant = "tertiary",
  state = "pressed",
  className,
  ...props
}) => {
  const variantsClassName = "style-variant-" + styleVariant + " state-" + state;

  return (
    <div
      className={
        "fab-style-tertiary-state-enabled " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className="state-layer">{icon}</div>
    </div>
  );
};
