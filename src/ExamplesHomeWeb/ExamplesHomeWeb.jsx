import "./ExamplesHomeWeb.css";
import { TopAppBarConfigurationLargeElevationFlat } from "../TopAppBarConfigurationLargeElevationFlat/TopAppBarConfigurationLargeElevationFlat.jsx";
import { ArrowForward } from "../ArrowForward/ArrowForward.jsx";
import { IconButtonStyleStandardStateEnabled } from "../IconButtonStyleStandardStateEnabled/IconButtonStyleStandardStateEnabled.jsx";
import { CarouselContextTabletLayoutHero } from "../CarouselContextTabletLayoutHero/CarouselContextTabletLayoutHero.jsx";
import { PlayArrowFilled } from "../PlayArrowFilled/PlayArrowFilled.jsx";
import { IconButtonStyleFilledStateEnabled } from "../IconButtonStyleFilledStateEnabled/IconButtonStyleFilledStateEnabled.jsx";
import { BuildingBlocksCardStatesFilledStateEnabled } from "../BuildingBlocksCardStatesFilledStateEnabled/BuildingBlocksCardStatesFilledStateEnabled.jsx";
import { NavigationRailAlignmentTop } from "../NavigationRailAlignmentTop/NavigationRailAlignmentTop.jsx";

export const ExamplesHomeWeb = ({ className, ...props }) => {
  return (
    <div className={"examples-home-web " + className}>
      <div className="content">
        <TopAppBarConfigurationLargeElevationFlat
          show3rdTrailingIcon={false}
          headline="My Filesdffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f"
          configuration="large"
          className="top-app-bar-instance"
        ></TopAppBarConfigurationLargeElevationFlat>
        <div className="home">
          <div className="section-01">
            <div className="title-header">
              <div className="title">Recents </div>
              <IconButtonStyleStandardStateEnabled
                icon={<ArrowForward className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="icon-button-instance"
              ></IconButtonStyleStandardStateEnabled>
            </div>
            <div className="carousel">
              <div className="item-01">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar0.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image0.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-02">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar1.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image1.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-03">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar2.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image2.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-04">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar3.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image3.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-05">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar4.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image4.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-06">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar5.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image5.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-07">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar6.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image6.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-08">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar7.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image7.png" />
                </div>
              </div>
              <div className="item-9">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar8.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image8.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-10">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar9.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image9.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-11">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar10.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image10.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-12">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar11.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image11.png" />
                </div>
                <div className="label">Label </div>
              </div>
              <div className="item-13">
                <div
                  className="avatar"
                  style={{
                    background: "url(avatar12.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image" src="image12.png" />
                </div>
                <div className="label">Label </div>
              </div>
            </div>
          </div>
          <div className="section-02">
            <div className="title-header">
              <div className="frame-2608491">
                <div className="title">All Files </div>
              </div>
              <IconButtonStyleStandardStateEnabled
                icon={<ArrowForward className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="icon-button-instance"
              ></IconButtonStyleStandardStateEnabled>
            </div>
            <CarouselContextTabletLayoutHero
              layout="hero"
              className="carousel-instance"
            ></CarouselContextTabletLayoutHero>
            <div className="frame-2608490">
              <div className="details">
                <div className="text-content">
                  <div className="label2">Artist </div>
                  <div className="supporting-text">Title </div>
                </div>
                <IconButtonStyleFilledStateEnabled
                  icon={<PlayArrowFilled className="icon-instance" />}
                  styleVariant="filled"
                  state="enabled"
                  className="icon-button-instance"
                ></IconButtonStyleFilledStateEnabled>
              </div>
              <div className="details">
                <div className="text-content">
                  <div className="label2">Artist </div>
                  <div className="supporting-text">Title </div>
                </div>
                <IconButtonStyleFilledStateEnabled
                  icon={<PlayArrowFilled className="icon-instance" />}
                  styleVariant="filled"
                  state="enabled"
                  className="icon-button-instance"
                ></IconButtonStyleFilledStateEnabled>
              </div>
              <div className="details2"></div>
              <div className="details3"></div>
            </div>
          </div>
          <div className="section-03">
            <div className="header">
              <div className="title">Section title </div>
              <IconButtonStyleStandardStateEnabled
                icon={<ArrowForward className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="icon-button-instance"
              ></IconButtonStyleStandardStateEnabled>
            </div>
            <div className="cards">
              <div className="card-01">
                <div
                  className="item"
                  style={{
                    background: "url(item0.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image13.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-02">
                <div
                  className="item"
                  style={{
                    background: "url(item1.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image14.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-03">
                <div
                  className="item"
                  style={{
                    background: "url(item2.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image15.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-04">
                <div
                  className="item"
                  style={{
                    background: "url(item3.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image16.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-05">
                <div
                  className="item"
                  style={{
                    background: "url(item4.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image17.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-06">
                <div
                  className="item"
                  style={{
                    background: "url(item5.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image18.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-07">
                <div
                  className="item"
                  style={{
                    background: "url(item6.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image19.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-08">
                <div
                  className="item"
                  style={{
                    background: "url(item7.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image20.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-09">
                <div
                  className="item"
                  style={{
                    background: "url(item8.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image21.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-10">
                <div
                  className="item"
                  style={{
                    background: "url(item9.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image22.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-11">
                <div
                  className="item"
                  style={{
                    background: "url(item10.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image23.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-12">
                <div
                  className="item"
                  style={{
                    background: "url(item11.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image24.png" />
                </div>
                <div className="label3">Label </div>
              </div>
              <div className="card-13">
                <div
                  className="item"
                  style={{
                    background: "url(item12.png) center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <img className="image2" src="image25.png" />
                </div>
                <div className="label3">Label </div>
              </div>
            </div>
          </div>
          <div className="section-04">
            <div className="header2">
              <div className="title">Section title </div>
              <IconButtonStyleStandardStateEnabled
                icon={<ArrowForward className="icon-instance" />}
                styleVariant="standard"
                state="enabled"
                className="icon-button-instance"
              ></IconButtonStyleStandardStateEnabled>
            </div>
            <div className="content2">
              <div className="card-carousel">
                <div className="card-012">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image26.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-022">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image27.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-032">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image28.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-042">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image29.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-052">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image30.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-062">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image31.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-7">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image32.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-8">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image33.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
                <div className="card-9">
                  <BuildingBlocksCardStatesFilledStateEnabled className="background-instance"></BuildingBlocksCardStatesFilledStateEnabled>
                  <img className="image3" src="image34.png" />
                  <div className="text-content2">
                    <div className="title2">Artist </div>
                    <div className="description">Song </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavigationRailAlignmentTop className="navigation-rail-instance"></NavigationRailAlignmentTop>
      <div className="chrome-browser-bar">
        <div className="icons">
          <img className="back" src="back0.svg" />
          <img className="forward" src="forward0.svg" />
          <img className="refresh" src="refresh0.svg" />
        </div>
        <div className="address-bar">
          <div className="url">
            <img className="lock" src="lock0.svg" />
            <div className="text">www.blockdocs.com </div>
          </div>
          <img className="star" src="star0.svg" />
        </div>
        <div className="avatar2">
          <div className="m">M </div>
        </div>
        <img className="more" src="more0.svg" />
      </div>
    </div>
  );
};
