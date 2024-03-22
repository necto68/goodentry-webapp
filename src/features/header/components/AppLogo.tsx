import { NavLink } from "react-router-dom";

import { appLogo, appLogoLottie } from "../../icons/brand";
import {
  AppLogoLottieIcon,
  AppMobileLogoIcon,
  Container,
} from "../styles/AppLottieLogo";

export const AppLogo = () => (
  <Container>
    <NavLink to="/">
      <AppLogoLottieIcon autoplay loop src={appLogoLottie} />
      <AppMobileLogoIcon src={appLogo} />
    </NavLink>
  </Container>
);
