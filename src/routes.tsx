import { Home } from "./components/Home";
import { About } from "./components/About";
import { NotFound } from "./components/NotFound";
import { RouteObject } from "react-router-dom";
import { Detail } from "./components/Detail";
import { Counter } from "./pages/Counter";

export const routes: RouteObject[] = [
  { 
    path: "/", 
    element: <Home />
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
