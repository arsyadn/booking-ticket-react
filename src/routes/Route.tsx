import { Route, Routes } from "react-router-dom";
import Login from "../layout/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../layout/Home";
import CreateConcert from "../layout/CreateConcert";
import DetailConcert from "../layout/DetailConcert";

const RouteApp = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />} />
      <Route path="/concert/:id" element={<DetailConcert />} />
      <Route path="/create-concert" element={<CreateConcert />} />
    </Route>
  </Routes>
);

export default RouteApp;
