import { useState } from "react";
import { Link, useNavigate } from "react-router";
import NavButton from "../common/NavButton";
import ToggleNavButton from "../common/ToggleNavButton";
import { navRoutes } from "@/lib/navRoutes";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/app/hook";
import { Icon } from "@iconify/react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="py-2 container">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img className="h-14" src="/img/burger-logo-template_441059-18.png" />
        </Link>
        <ul className="hidden sm:flex items-center gap-6">
          {navRoutes.map((route) => (
            <NavButton key={route.path} path={route.path}>
              {route.label}
            </NavButton>
          ))}
          <ShopBadge />
        </ul>

        <ToggleNavButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
      {isOpen && (
        <ul className="sm:hidden flex flex-col gap-2 items-center">
          {navRoutes.map((route) => (
            <NavButton key={route.path} path={route.path}>
              {route.label}
            </NavButton>
          ))}
          <ShopBadge />
        </ul>
      )}
    </header>
  );
}

export default Header;

const ShopBadge = () => {
  const navigate = useNavigate();
  const { orders } = useAppSelector((state) => state.orderNavigation);
  return (
    <Badge
      variant="default"
      className="space-x-1 hover:bg-[#ed1b24] cursor-pointer"
      onClick={() => navigate("/orders")}
    >
      <Icon icon="iconamoon:shopping-bag-thin" width="24" height="24" />
      <span>{orders.length}</span>
    </Badge>
  );
};
