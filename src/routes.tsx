import { About } from "./components/About";
import { NotFound } from "./components/NotFound";
import { RouteObject } from "react-router-dom";
import { Detail } from "./components/Detail";
import { Counter } from "./pages/Counter";
import { PlatformLayout } from "./layouts/index";

export const routes: RouteObject[] = [
  { 
    path: "/", 
    element: <PlatformLayout />
  },
  { 
    path: "/about", 
    element: <About />, 
    children: [
      {
        path: ':id', 
        element: <Detail />
      }
    ] 
  },
  {
    path: '/counter',
    element: <Counter />
  },
  { 
    path: "*", 
    element: <NotFound /> 
  },
];
