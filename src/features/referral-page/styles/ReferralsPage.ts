import tw from "twin.macro";

export const Title = tw.span`text-3xl font-bold text-white`;

export const Link = tw.a`text-brand underline`;

export const TitleAccent = tw(Title)`text-brand`;
