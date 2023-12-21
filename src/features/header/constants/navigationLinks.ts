import { RoutePathname } from "../../root/types/RoutePathname";

import type { NavigationLink } from "../types/NavigationLink";

export const headerNavigationLinks: NavigationLink[] = [
  {
    name: "Legacy Protected Perps",
    href: RoutePathname.PROTECTED_PERPS,
  },
  {
    name: "Legacy ezVaults",
    href: RoutePathname.EZ_VAULTS,
  },
  {
    name: "Lock",
    href: RoutePathname.LOCK,
  },
];

export const additionalNavigationLinks: NavigationLink[] = [
  {
    name: "Dashboard",
    href: RoutePathname.DASHBOARD,
  },
  {
    name: "Fair Sale",
    href: RoutePathname.PUBLIC_SALE,
  },
  {
    name: "Docs",
    href: "https://gitbook.goodentry.io/",
    isExternal: true,
  },
  {
    name: "Dune Dashboard",
    href: "https://dune.com/good-entry/good-entry-ezvaults-tvl",
    isExternal: true,
  },
  {
    name: "Zealy Quests",
    href: "https://zealy.io/c/goodentrylabs/questboard",
    isExternal: true,
  },
  {
    name: "Galxe Quests",
    href: "https://galxe.com/C7R3gKSiMagnrgFd5J82np",
    isExternal: true,
  },
];

export const mobileNavigationLinks: NavigationLink[] = [
  ...headerNavigationLinks,
  ...additionalNavigationLinks,
];
