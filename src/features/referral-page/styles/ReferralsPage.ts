import tw from "twin.macro";

export const Title = tw.span`text-3xl text-white`;

export const Subtitle = tw.span`text-sm text-text-gray whitespace-nowrap`;

export const Link = tw.a`text-brand underline`;

export const Container = tw.div`flex flex-col md:flex-row items-start max-w-[1024px] w-full justify-between mt-6 gap-2`;

export const Content = tw.div`flex flex-col items-start w-full justify-between gap-2 min-h-[350px]`;

export const TopRow = tw.div`flex items-center justify-between w-full gap-2`;

export const InfoBox = tw.div`flex w-full p-4 flex-col items-center justify-start bg-bg-primary border border-bg-secondary`;

export const InputCardBox = tw(InfoBox)`p-0`;

export const SubtitleBox = tw.div`flex w-full justify-start items-start gap-2 border-b border-bg-secondary p-4`;
