import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import {
  FactorioDataProvider,
  Surface,
  TooltipRoot,
} from "@factorioui/components";

export const Route = createRootRoute({
  component: () => (
    <FactorioDataProvider path="/" loader={<>Loading...</>}>
      <Surface
        className="h-full flex items-center justify-center"
        color="blackDark"
      >
        <Outlet />
        <TanStackRouterDevtools />
      </Surface>
      <TooltipRoot />
    </FactorioDataProvider>
  ),
});
