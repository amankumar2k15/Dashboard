import React from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../common/Loader";
import loadable from "@loadable/component";

const Dashboard = loadable(() => import("../pages/Dashboard"), {
  fallback: <Loader />,
});
const ToDo = loadable(() => import("../pages/ToDo"), {
  fallback: <Loader />,
});
const UserProfile = loadable(() => import("../pages/UserProfile"), {
  fallback: <Loader />,
});
const Settings = loadable(() => import("../pages/Settings"), {
  fallback: <Loader />,
});
const Nopage = loadable(() => import("./error"), {
  fallback: <Loader />,
});

const PrivateRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </>
  )
};
export default PrivateRoutes;