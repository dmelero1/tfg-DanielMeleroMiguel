import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/public.tsx", [
    index("routes/login.tsx"),
  ]),
  layout("./layouts/private.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("exercises", "routes/exercise.tsx"),
    route("exercises/:id", "routes/exerciseDetail.tsx"),
  ]),
] satisfies RouteConfig;
