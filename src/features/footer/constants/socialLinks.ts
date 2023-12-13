import { discord, github, medium, twitterX } from "../../icons/social";

import type { NavigationLink } from "../../header/types/NavigationLink";

export const socialLinks: NavigationLink[] = [
  {
    name: "Discord",
    href: "https://discord.com/invite/goodentry",
    icon: discord,
    isExternal: true,
  },
  {
    name: "X",
    href: "https://x.com/goodentrylabs",
    icon: twitterX,
    isExternal: true,
  },
  {
    name: "Medium",
    href: "https://goodentrylabs.medium.com/",
    icon: medium,
    isExternal: true,
  },
  {
    name: "Github",
    href: "https://github.com/GoodEntry-io/GoodEntryMarkets",
    icon: github,
    isExternal: true,
  },
];
