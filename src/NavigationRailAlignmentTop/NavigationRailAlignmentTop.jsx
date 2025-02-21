import "./NavigationRailAlignmentTop.css";
import { Menu } from "../Menu/Menu.jsx";
import { IconButtonStyleStandardStateEnabled } from "../IconButtonStyleStandardStateEnabled/IconButtonStyleStandardStateEnabled.jsx";
import { Edit } from "../Edit/Edit.jsx";
import { FabStyleTertiaryStateEnabled } from "../FabStyleTertiaryStateEnabled/FabStyleTertiaryStateEnabled.jsx";
import { Mail } from "../Mail/Mail.jsx";
import { BuildingBlocksNavItemSelectedTrueStateEnabledLabelTrueBadgeNone } from "../BuildingBlocksNavItemSelectedTrueStateEnabledLabelTrueBadgeNone/BuildingBlocksNavItemSelectedTrueStateEnabledLabelTrueBadgeNone.jsx";
import { ChatBubble } from "../ChatBubble/ChatBubble.jsx";
import { BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone } from "../BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone/BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone.jsx";
import { GmailGroups } from "../GmailGroups/GmailGroups.jsx";
import { Videocam } from "../Videocam/Videocam.jsx";

export const NavigationRailAlignmentTop = ({
  fab = true,
  alignment = "top",
  className,
  ...props
}) => {
  const variantsClassName = "alignment-" + alignment;

  return (
    <div
      className={
        "navigation-rail-alignment-top " + className + " " + variantsClassName
      }
    >
      <div className="menu-fab">
        <IconButtonStyleStandardStateEnabled
          icon={<Menu className="icon-instance" />}
          styleVariant="standard"
          state="enabled"
          className="menu-instance"
        ></IconButtonStyleStandardStateEnabled>
        {fab && (
          <>
            <div className="fab-elevation-override">
              <FabStyleTertiaryStateEnabled
                icon={<Edit className="icon-instance" />}
                state="enabled"
                className="fab-instance"
              ></FabStyleTertiaryStateEnabled>
            </div>
          </>
        )}
      </div>
      <div className="destinations">
        <BuildingBlocksNavItemSelectedTrueStateEnabledLabelTrueBadgeNone
          icon={<Mail className="icon-instance" />}
          labelText="Mail"
          selected="true"
          label="true"
          className="nav-item-1-instance"
        ></BuildingBlocksNavItemSelectedTrueStateEnabledLabelTrueBadgeNone>
        <BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone
          icon={<ChatBubble className="icon-instance" />}
          labelText="Chat"
          label="true"
          className="nav-item-2-instance"
        ></BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone>
        <BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone
          icon={<GmailGroups className="icon-instance" />}
          labelText="Spaces"
          label="true"
          className="nav-item-3-instance"
        ></BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone>
        <BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone
          icon={<Videocam className="icon-instance" />}
          labelText="Meet"
          label="true"
          className="nav-item-4-instance"
        ></BuildingBlocksNavItemSelectedFalseStateEnabledLabelTrueBadgeNone>
      </div>
    </div>
  );
};
