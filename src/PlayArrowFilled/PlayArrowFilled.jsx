import "./PlayArrowFilled.css";

export const PlayArrowFilled = ({ className, ...props }) => {
  return (
    <img
      className={"play-arrow-filled " + className}
      src="play-arrow-filled.svg"
    />
  );
};
