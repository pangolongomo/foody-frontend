import Header from "./Header";
import { Outlet } from "react-router";

function layout() {
  return (
    <div className="container px-8  max-w-[1024px]">
      <Header />
      <Outlet />
    </div>
  );
}

export default layout;
