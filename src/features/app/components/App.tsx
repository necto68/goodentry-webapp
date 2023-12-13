import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Web3OnboardProvider } from "@web3-onboard/react";
import Big from "big.js";

import { Root } from "../../root/components/Root";
import { queryClient } from "../../shared/constants/queryClient";
import { chakraTheme } from "../../shared/constants/theme";
import { modalComponents } from "../../shared/modal/constants/modalComponents";
import { ModalProvider } from "../../shared/modal/providers/ModalProvider";
import { web3OnboardConfig } from "../../wallet/constants/web3OnboardConfig";
import { GlobalStyles } from "../styles/App";

Big.NE = -20;
Big.PE = 80;

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3OnboardProvider web3Onboard={web3OnboardConfig}>
      <ChakraProvider theme={chakraTheme}>
        <ModalProvider modalComponents={modalComponents}>
          <GlobalStyles />
          <Root />
          <ReactQueryDevtools />
        </ModalProvider>
      </ChakraProvider>
    </Web3OnboardProvider>
  </QueryClientProvider>
);
