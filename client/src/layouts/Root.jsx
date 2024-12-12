import { Outlet } from "react-router-dom";
import { Nav } from "../components";

export default function Root() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
