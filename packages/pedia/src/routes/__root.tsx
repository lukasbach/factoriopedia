import {
  Link,
  Outlet,
  createRootRoute,
  useMatchRoute,
} from "@tanstack/react-router";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  EntityButtonActionProvider,
  FactorioDataProvider,
  Surface,
  TabsTriggerVisual,
  TooltipRoot,
} from "@factorioui/components";
import { useMemo, useState } from "react";
import { Route as PediaRoute } from "./pedia.$type.$name";
import { urls } from "../urls";
import { MobileMenuProvider } from "../components/mobile-menu-provider";

export const Route = createRootRoute({
  component: Page,
});

function Page() {
  const navigate = PediaRoute.useNavigate();
  const search = Route.useSearch();
  const matchRoute = useMatchRoute();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);

  return (
    <MobileMenuProvider
      value={useMemo(
        () => ({
          isMenuOpen,
          openMenu: () => setIsMenuOpen(true),
          closeMenu: () => setIsMenuOpen(false),
        }),
        [isMenuOpen],
      )}
    >
      <FactorioDataProvider path="/" loader={<>Loading...</>}>
        <EntityButtonActionProvider
          onClick={(name, type) => {
            if (type === "technology") {
              navigate({ params: { name }, to: "/technology/$name" });
              setIsMenuOpen(false);
            } else {
              navigate({
                params: { name, type },
                search,
                to: "/pedia/$type/$name",
              });
              setIsMenuOpen(false);
            }
          }}
        >
          <Surface
            className="flex-col items-center justify-center"
            color="blackDark"
          >
            <div className="md:w-[960px] w-[480px] md:px-4 min-h-7 flex m-auto mt-16">
              <div className="md:hidden mr-4 cursor-pointer">
                <TabsTriggerVisual
                  active={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Menu
                </TabsTriggerVisual>
              </div>
              <Link
                to="/pedia/$type/$name"
                params={{ type: "item", name: "transport-belt" }}
                onClick={openMenu}
              >
                <TabsTriggerVisual
                  active={!!matchRoute({ to: "/pedia/$type/$name" })}
                >
                  Factoriopedia
                </TabsTriggerVisual>
              </Link>
              <Link
                to="/technology/$name"
                params={{ name: "steam-power" }}
                onClick={openMenu}
              >
                <TabsTriggerVisual
                  active={!!matchRoute({ to: "/technology/$name" })}
                >
                  Technologies
                </TabsTriggerVisual>
              </Link>
              <Link
                to="/tool/$tool"
                params={{ tool: "fuels" }}
                onClick={openMenu}
              >
                <TabsTriggerVisual active={!!matchRoute({ to: "/tool/$tool" })}>
                  Tools
                </TabsTriggerVisual>
              </Link>
              <Link to="/about">
                <TabsTriggerVisual active={!!matchRoute({ to: "/about" })}>
                  About
                </TabsTriggerVisual>
              </Link>
              <div className="flex-grow" />
              <Link
                to={urls.repo as any}
                target="_blank"
                className="hidden md:display"
              >
                <TabsTriggerVisual>Star on Github</TabsTriggerVisual>
              </Link>
            </div>

            <Surface
              color="blackMedium"
              shadow="topglow-2"
              className="md:w-[960px] w-[500px] rounded flex gap-2 p-2 m-auto"
            >
              <Outlet />
            </Surface>
          </Surface>
          <TooltipRoot />
        </EntityButtonActionProvider>
      </FactorioDataProvider>
    </MobileMenuProvider>
  );
}
