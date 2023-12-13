import tw from "twin.macro";

export const Container = tw.div`
    flex justify-center
`;

export const Content = tw.div`
    flex flex-1
    flex-col sm:flex-row sm:flex-wrap
    gap-6
    max-w-[1280px]
`;
