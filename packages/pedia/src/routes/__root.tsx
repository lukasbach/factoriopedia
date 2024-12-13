import { Outlet, createRootRoute } from "@tanstack/react-router";
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
  return (
    <FactorioDataProvider path="/" loader={<>Loading...</>}>
      <EntityButtonActionProvider
        onClick={(name, type) => {
          navigate({ params: { name, type }, search });
        }}
      >
        <Surface
          className="h-full flex flex-col items-center justify-center"
          color="blackDark"
        >
          <div className="w-[960px] px-4 min-h-7">
            <TabsTriggerVisual href="#" active>
              Factoriopedia
            </TabsTriggerVisual>
            <TabsTriggerVisual href="#">Tools</TabsTriggerVisual>
            <TabsTriggerVisual href="#">Guides</TabsTriggerVisual>
            <TabsTriggerVisual href="#">About</TabsTriggerVisual>
          </div>

          <Surface
            color="blackMedium"
            shadow="topglow-2"
            className="w-[960px] rounded flex gap-2 p-2"
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
