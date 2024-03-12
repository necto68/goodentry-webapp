import { RoutePathname } from "../../root/types/RoutePathname";

import type { NavigationLink } from "../types/NavigationLink";

export const headerNavigationLinks: NavigationLink[] = [
  {
    name: "Protected Perps",
    href: RoutePathname.PROTECTED_PERPS,
  },
  {
    name: "ezVaults",
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
    name: "Referrals",
    href: RoutePathname.REFERRALS,
  },
  {
    name: "Leaderboard",
    href: RoutePathname.LEADERBOARD,
  },
  {
    name: "Docs",
    href: "https://gitbook.goodentry.io/",
    isExternal: true,
  },
  {
    name: "Dune Dashboard",
    href: "https://dune.com/good-entry/protected-perpetuals-degen",
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
