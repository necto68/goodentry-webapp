import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";

import { TradePanel } from "../../trade-panel/components/TradePanel";
import { TradePanelStateProvider } from "../../trade-panel/providers/TradePanelStateProvider";
import { useWallet } from "../../wallet/hooks/useWallet";
import {
  Container,
  Content,
  LeftContainer,
  RightContainer,
} from "../styles/ProtectedPerpsPage";

import { Chart } from "./Chart";
import { ChartHeader } from "./ChartHeader";
import { PayoffChart } from "./PayoffChart";
import { Positions } from "./Positions";
import { PositionsHistory } from "./PositionsHistory";

export const ProtectedPerpsPage = () => {
  const { account } = useWallet();
  return (
    <Container>
      <Content>
        <LeftContainer>
          <ChartHeader />
          <Chart />
          {account ? (
            <Tabs>
              <TabList>
                <Tab>Positions</Tab>
                <Tab>History</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Positions />
                </TabPanel>
                <TabPanel>
                  <PositionsHistory />
                </TabPanel>
              </TabPanels>
            </Tabs>
          ) : null}
        </LeftContainer>
        <RightContainer>
          <TradePanelStateProvider>
            <TradePanel />
            <PayoffChart />
          </TradePanelStateProvider>
        </RightContainer>
      </Content>
    </Container>
  );
};
