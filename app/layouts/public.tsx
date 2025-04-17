import { Outlet } from "react-router";

export default function PublicLayout() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Login</title>
      </head>
      <body>
        <div className="public-layout">
          <Outlet />
        </div>
      </body>
    </html>
  );
}
