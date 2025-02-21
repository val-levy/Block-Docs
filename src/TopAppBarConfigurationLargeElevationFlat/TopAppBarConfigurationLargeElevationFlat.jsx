import "./TopAppBarConfigurationLargeElevationFlat.css";
import { ArrowBack } from "../ArrowBack/ArrowBack.jsx";
import { IconButtonStyleStandardStateEnabled } from "../IconButtonStyleStandardStateEnabled/IconButtonStyleStandardStateEnabled.jsx";
import { AttachFile } from "../AttachFile/AttachFile.jsx";
import { Today } from "../Today/Today.jsx";
import { MoreVert } from "../MoreVert/MoreVert.jsx";

export const TopAppBarConfigurationLargeElevationFlat = ({
  show2ndTrailingIcon = true,
  show3rdTrailingIcon = true,
  show1stTrailingIcon = true,
  headline = "Title",
  configuration = "small-centered",
  elevation = "flat",
  className,
  ...props
}) => {
  const variantsClassName =
    "configuration-" + configuration + " elevation-" + elevation;

  return (
    <div
      className={
        "top-app-bar-configuration-large-elevation-flat " +
        className +
        " " +
        variantsClassName
      }
    >
      <div className="leading-trailing-icons">
        <IconButtonStyleStandardStateEnabled
          icon={<ArrowBack className="icon-instance" />}
          styleVariant="standard"
          state="enabled"
          className="leading-icon-instance"
        ></IconButtonStyleStandardStateEnabled>
        <div className="trailing-icon">
          {show1stTrailingIcon && (
            <>
              <IconButtonStyleStandardStateEnabled
                icon={<AttachFile className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="trailing-icon-1-instance"
              ></IconButtonStyleStandardStateEnabled>
            </>
          )}
          {show2ndTrailingIcon && (
            <>
              <IconButtonStyleStandardStateEnabled
                icon={<Today className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="trailing-icon-2-instance"
              ></IconButtonStyleStandardStateEnabled>
            </>
          )}
          {show3rdTrailingIcon && (
            <>
              <IconButtonStyleStandardStateEnabled
                icon={<MoreVert className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="trailing-icon-3-instance"
              ></IconButtonStyleStandardStateEnabled>
            </>
          )}
        </div>
      </div>
      <div className="headline">
        <div className="headline2">{headline} </div>
      </div>
    </div>
  );
};
