import { Navbar } from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { ConnectionStatus } from "./components/ConnectionStatus";

export function Layout() {
  const location = useLocation();

  const hideNavbarRoutes = ['/'];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      {!shouldHideNavbar && <ConnectionStatus />}
      <main>
        <Outlet />
      </main>
    </>
  );
}
