import { NavLink } from "react-router-dom";

import { appLogo, appLogoLottie } from "../../icons/brand";
import {
  AppLogoIcon,
  AppMobileLogoIcon,
  Container,
} from "../styles/AppLottieLogo";

export const AppLottieLogo = () => (
  <Container>
    <NavLink to="/">
      <AppLogoIcon autoplay loop src={appLogoLottie} />
      <AppMobileLogoIcon src={appLogo} />
    </NavLink>
  </Container>
);
