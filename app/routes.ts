import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./layouts/public.tsx", [
    index("routes/login.tsx"),
    route("sign-up", "routes/signup.tsx"),
  ]),
  layout("./layouts/private.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("exercises", "routes/exercise.tsx"),
    route("exercises/:id", "routes/exerciseDetail.tsx"),
    route("instalaciones", "routes/instalaciones.tsx"),
    route("instalaciones/:id", "routes/instalacionesDetail.tsx"),
    route("profile", "routes/profile.tsx"),
  ]),
  route("*", "routes/NotFound.tsx")
] satisfies RouteConfig;
