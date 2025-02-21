import "./BuildingBlocksCardStatesFilledStateEnabled.css";

export const BuildingBlocksCardStatesFilledStateEnabled = ({
  state = "enabled",
  className,
  ...props
}) => {
  const variantsClassName = "state-" + state;

  return (
    <div
      className={
        "building-blocks-card-states-filled-state-enabled " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className="state-layer"></div>
    </div>
  );
};
