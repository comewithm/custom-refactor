import {
  BrowserRouter,
  useRoutes,
} from "react-router-dom";
import { routes } from "./routes";


const CustomRoutes = () => {
  return useRoutes(routes)
}

function App() {
  return (
    <BrowserRouter>
      <CustomRoutes />
    </BrowserRouter>
  );
}

export default App;
