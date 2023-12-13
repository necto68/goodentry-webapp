import tw from "twin.macro";

import { ComponentContainer } from "./ProtectedPerpsPage";

export const Container = tw(ComponentContainer)`
    flex-col gap-3 p-0 pt-3
`;

export const TitleContainer = tw.div`
    flex px-4
`;

export const Title = tw.span`
    text-sm text-text-white
    font-semibold
`;
