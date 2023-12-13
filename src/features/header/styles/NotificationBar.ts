import { Link } from "@chakra-ui/react";
import tw from "twin.macro";

export const Container = tw.div`
  flex items-center justify-center
  w-full p-3
  bg-bg-details
  border-b border-bg-secondaryDark`;

export const Content = tw.div`
  flex items-center justify-center gap-2
`;

export const NotificationLink = tw(Link)`
  text-text-white
  whitespace-pre-wrap
  text-center
`;
