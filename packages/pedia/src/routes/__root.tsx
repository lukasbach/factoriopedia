import {
  Link,
  Outlet,
  createRootRoute,
  useMatchRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  EntityButtonActionProvider,
  FactorioDataProvider,
  Surface,
  TabsTriggerVisual,
  TooltipRoot,
} from "@factorioui/components";
import { Route as PediaRoute } from "./pedia.$type.$name";

export const Route = createRootRoute({
  component: Page,
});

function Page() {
  const navigate = PediaRoute.useNavigate();
  const search = Route.useSearch();
  const matchRoute = useMatchRoute();
  return (
    <FactorioDataProvider path="/" loader={<>Loading...</>}>
      <EntityButtonActionProvider
        onClick={(name, type) => {
          if (type === "technology") {
            navigate({ params: { name }, to: "/technology/$name" });
          } else {
            navigate({
              params: { name, type },
              search,
              to: "/pedia/$type/$name",
            });
          }
        }}
      >
        <Surface
          className="h-full flex flex-col items-center justify-center"
          color="blackDark"
        >
          <div className="w-[960px] px-4 min-h-7">
            <Link
              to="/pedia/$type/$name"
              params={{ type: "item", name: "transport-belt" }}
            >
              <TabsTriggerVisual
                active={!!matchRoute({ to: "/pedia/$type/$name" })}
              >
                Factoriopedia
              </TabsTriggerVisual>
            </Link>
            <Link to="/technology/$name" params={{ name: "steam-power" }}>
              <TabsTriggerVisual
                active={!!matchRoute({ to: "/technology/$name" })}
              >
                Technologies
              </TabsTriggerVisual>
            </Link>
            <TabsTriggerVisual href="#">Tools</TabsTriggerVisual>
            <TabsTriggerVisual href="#">Guides</TabsTriggerVisual>
            <TabsTriggerVisual href="#">About</TabsTriggerVisual>
          </div>

          <Surface
            color="blackMedium"
            shadow="topglow-2"
            className="w-[960px] h-[80%] rounded flex gap-2 p-2"
          >
            <Outlet />
            <TanStackRouterDevtools />
          </Surface>
        </Surface>
        <TooltipRoot />
      </EntityButtonActionProvider>
    </FactorioDataProvider>
  );
}
