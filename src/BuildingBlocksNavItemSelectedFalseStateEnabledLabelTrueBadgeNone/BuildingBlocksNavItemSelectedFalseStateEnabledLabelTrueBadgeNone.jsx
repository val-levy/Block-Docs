import "./BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone.css";
import { Stars } from "../Stars/Stars.jsx";

export const BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone =
  ({
    icon = <Stars className="icon-instance" />,
    labelText = "Label",
    selected = "false",
    state = "enabled",
    label = "false",
    badge = "none",
    className,
    ...props
  }) => {
    const variantsClassName =
      "selected-" +
      selected +
      " state-" +
      state +
      " label-" +
      label +
      " badge-" +
      badge;

    return (
      <div
        className={
          "building-blocks-nav-item-selected-false-state-enabled-label-true-badge-none " +
          className +
          " " +
          variantsClassName
        }
      >
        <div className="container">
          <div className="state-layer">{icon}</div>
        </div>
        <div className="label">{labelText} </div>
      </div>
    );
  };
