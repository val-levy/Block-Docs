import "./CarouselContextTabletLayoutHero.css";
import { BuildingBlocksCarouselItemTextSupportingTextFalse } from "../BuildingBlocksCarouselItemTextSupportingTextFalse/BuildingBlocksCarouselItemTextSupportingTextFalse.jsx";

export const CarouselContextTabletLayoutHero = ({
  textContent = false,
  context = "tablet",
  layout = "multi-browse",
  className,
  ...props
}) => {
  const variantsClassName = "context-" + context + " layout-" + layout;

  return (
    <div
      className={
        "carousel-context-tablet-layout-hero " +
        className +
        " " +
        variantsClassName
      }
    >
      <div
        className="item-1"
        style={{
          background: "url(item-10.png) center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {textContent && (
          <>
            <BuildingBlocksCarouselItemTextSupportingTextFalse className="item-text-1-instance"></BuildingBlocksCarouselItemTextSupportingTextFalse>
          </>
        )}
      </div>
      <div
        className="item-2"
        style={{
          background: "url(item-20.png) center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {textContent && (
          <>
            <BuildingBlocksCarouselItemTextSupportingTextFalse className="item-text-2-instance"></BuildingBlocksCarouselItemTextSupportingTextFalse>
          </>
        )}
      </div>
      <div
        className="item-3"
        style={{
          background: "url(item-30.png) center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {textContent && (
          <>
            <BuildingBlocksCarouselItemTextSupportingTextFalse className="item-text-3-instance"></BuildingBlocksCarouselItemTextSupportingTextFalse>
          </>
        )}
      </div>
      <div
        className="item-last"
        style={{
          background: "url(item-last0.png) center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {textContent && (
          <>
            <BuildingBlocksCarouselItemTextSupportingTextFalse className="item-text-last-instance"></BuildingBlocksCarouselItemTextSupportingTextFalse>
          </>
        )}
      </div>
    </div>
  );
};
