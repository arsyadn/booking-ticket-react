import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteApp from "./routes/Route";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  );
}

export default App;
