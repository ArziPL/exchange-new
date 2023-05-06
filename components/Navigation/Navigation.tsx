// Navigation component put into _app, deciding desktop/mobile component render
import useWindowDimensions from "../../utils/useWindowDimensions";
import SideNavigationDesktop from "./SideNavigationDesktop";
import TopNavigationMobile from "./TopNavigationMobile";

export default function Navigation() {
  const viewportDimensions = useWindowDimensions();
  if (viewportDimensions.width > 1023) {
    return <SideNavigationDesktop />;
  } else {
    return <TopNavigationMobile />;
  }
}
