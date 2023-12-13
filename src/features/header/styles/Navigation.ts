import styled from "@emotion/styled";
import { BsChevronRight } from "react-icons/bs";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`hidden lg:flex justify-between items-center gap-2 xl:gap-6 flex-col md:flex-row`}

  .active {
    ${tw`text-text-white`}
  }
`;

export const MobileContainer = tw.div`
  flex flex-col gap-6
`;

export const NavigationContainer = styled.div`
  ${tw`
    flex flex-col justify-between items-start`}

  .active {
    ${tw`text-text-white`}
  }
`;

export const SocialContainer = tw.div`
  flex w-full justify-center items-center
`;

export const MobileLinkContent = tw.div`
  flex w-full px-8 py-6 justify-between items-center bg-bg-secondary
`;

export const ChevronIcon = styled(BsChevronRight)`
  ${tw`h-[12px]`}
`;

export const LinkContent = tw.div`flex gap-2`;

export const PublicSaleButtonMobileContainer = tw.div`
  flex px-6
`;
