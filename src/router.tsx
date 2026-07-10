import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { RootLayout } from "./components/RootLayout";
import { LoginPage } from "./features/auth/LoginPage";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginPage,
});

const vehiclesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vehicles",
  component: () => <h1>Vehículos</h1>,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  vehiclesRoute,
]);

export const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}