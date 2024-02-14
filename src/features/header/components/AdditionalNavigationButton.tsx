import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { BiListUl, BiBarChartSquare, BiMapAlt } from "react-icons/bi";
import { FaPeoplePulling } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiGitbook } from "react-icons/si";
import { Link } from "react-router-dom";

import { additionalNavigationLinks } from "../constants/navigationLinks";

export const AdditionalNavigationButton = () => {
  const [
    dashboardLink,
    referralsLink,
    documentationsLink,
    duneDashboardLink,
    zealyQuestsLink,
    galxeQuestsLink,
  ] = additionalNavigationLinks;

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<RxHamburgerMenu size={18} />}
        variant="border"
      />
      <MenuList>
        <MenuGroup>
          <Link to={dashboardLink.href}>
            <MenuItem icon={<BiListUl size={20} />}>
              {dashboardLink.name}
            </MenuItem>
          </Link>
          <Link to={referralsLink.href}>
            <MenuItem icon={<FaPeoplePulling size={20} />}>
              {referralsLink.name}
            </MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <Link target="_blank" to={documentationsLink.href}>
            <MenuItem icon={<SiGitbook size={20} />}>
              {documentationsLink.name}
            </MenuItem>
          </Link>
          <Link target="_blank" to={duneDashboardLink.href}>
            <MenuItem icon={<BiBarChartSquare size={20} />}>
              {duneDashboardLink.name}
            </MenuItem>
          </Link>
          <Link target="_blank" to={zealyQuestsLink.href}>
            <MenuItem icon={<BiMapAlt size={20} />}>
              {zealyQuestsLink.name}
            </MenuItem>
          </Link>
          <Link target="_blank" to={galxeQuestsLink.href}>
            <MenuItem icon={<BiMapAlt size={20} />}>
              {galxeQuestsLink.name}
            </MenuItem>
          </Link>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
