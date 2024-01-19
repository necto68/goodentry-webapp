import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { DashboardPage } from "../../dashboard-page/components/DashboardPage";
import { Footer } from "../../footer/components/Footer";
import { Header } from "../../header/components/Header";
import { LockPage } from "../../lock-page/components/LockPage";
import { ProtectedPerpsPage } from "../../protected-perps-page/components/ProtectedPerpsPage";
import { Modal } from "../../shared/modal/components/Modal";
import { VaultDetailsPage } from "../../vault-details-page/components/VaultDetailsPage";
import { VaultsPage } from "../../vaults-page/components/VaultsPage";
import { useInjectedWalletAutoConnect } from "../../wallet/hooks/useInjectedWalletAutoConnect";
import { CustomProviderIdentityFlag } from "../../wallet/types/CustomProviderIdentityFlag";
import { CustomProviderLabel } from "../../wallet/types/CustomProviderLabel";
import { Container, Content } from "../styles/Root";
import { RoutePathname } from "../types/RoutePathname";

// Use when notification bar needs to be displayed
// import { NotificationBar } from "../../header/components/NotificationBar";

export const Root = () => {
  useInjectedWalletAutoConnect(
    CustomProviderLabel.OKTO_WALLET,
    CustomProviderIdentityFlag.OKTO_WALLET
  );

  return (
    <Container>
      <BrowserRouter>
        <Modal />
        {/* <NotificationBar /> */}
        <Header />
        <Routes>
          <Route
            element={
              <Content>
                <ProtectedPerpsPage />
              </Content>
            }
            path={RoutePathname.PROTECTED_PERPS}
          />
          <Route
            element={
              <Content>
                <VaultsPage />
              </Content>
            }
            path={RoutePathname.EZ_VAULTS}
          />
          <Route
            element={<VaultDetailsPage />}
            path={RoutePathname.EZ_VAULT_DETAILS}
          />
          <Route
            element={
              <Content>
                <DashboardPage />
              </Content>
            }
            path={RoutePathname.DASHBOARD}
          />
          <Route
            element={
              <Content>
                <LockPage />
              </Content>
            }
            path={RoutePathname.LOCK}
          />
          <Route
            element={<Navigate to={RoutePathname.PROTECTED_PERPS} />}
            path="*"
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Container>
  );
};
