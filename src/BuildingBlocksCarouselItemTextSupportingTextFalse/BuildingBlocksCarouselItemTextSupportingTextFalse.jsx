import "./BuildingBlocksCarouselItemTextSupportingTextFalse.css";

export const BuildingBlocksCarouselItemTextSupportingTextFalse = ({
  supportingText = "false",
  labelText = "Label",
  className,
  ...props
}) => {
  const variantsClassName = "supporting-text-" + supportingText;

  return (
    <div
      className={
        "building-blocks-carousel-item-text-supporting-text-false " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className="content">
        <div className="label">{labelText} </div>
      </div>
    </div>
  );
};
