import tw from "twin.macro";

export const Container = tw.div`
    flex justify-center
`;

export const Content = tw.div`
    flex flex-1 gap-2
    flex-col md:flex-row
    max-w-[1448px]
    w-full overflow-x-scroll
`;

export const LeftContainer = tw.div`
    flex flex-1 flex-col gap-2
`;

export const RightContainer = tw.div`
    flex flex-col gap-2
    md:w-[343px]
`;

export const ComponentContainer = tw.div`
    flex border border-bg-secondary rounded bg-bg-primary p-3
`;
