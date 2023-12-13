import { Global, css } from "@emotion/react";
import tw, { GlobalStyles as BaseStyles } from "twin.macro";

const customStyles = css`
  body {
    ${tw`bg-black antialiased`}
  }

  *::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 2px;
  }
`;

export const GlobalStyles = () => (
  <>
    <BaseStyles />
    <Global styles={customStyles} />
  </>
);
