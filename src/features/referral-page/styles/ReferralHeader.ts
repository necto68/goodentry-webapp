import tw from "twin.macro";

export const Content = tw.div`flex flex-col items-start max-w-[1024px] w-full justify-between mt-6 gap-2`;

export const Title = tw.span`text-3xl text-white font-semibold`;

export const SubTitle = tw.span`text-lg text-white`;

export const Link = tw.a`text-text-blue`;

export const GlowContainer = tw.div`flex flex-col w-full items-start gap-2 border-brand bg-brand-dark border-2 rounded p-4`;
