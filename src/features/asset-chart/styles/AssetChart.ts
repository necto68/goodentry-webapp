import styled from "@emotion/styled";
import tw from "twin.macro";

export const Container = styled.div`
  ${tw`flex w-full h-full bg-bg-primary border border-bg-secondary rounded`}

  & > #tradingview_widget_wrapper {
    width: 100%;
  }

  & > #tradingview_widget_wrapper > div:nth-of-type(2) {
    display: none;
  }
`;
