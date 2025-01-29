import { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router";

type Props = PropsWithChildren<{
  path: string;
  isNavLink?: boolean;
}>;

function NavButton({ children, path, isNavLink = true }: Props) {
  return (
    <>
      {isNavLink ? (
        <NavLink
          to={path}
          className={({ isActive }) =>
            `hover:text-blue-600 font-medium ${isActive && "text-blue-600"}`
          }
        >
          <li key={path}>{children}</li>
        </NavLink>
      ) : (
        <Link to={path} className="hover:text-blue-600">
          {children}
        </Link>
      )}
    </>
  );
}

export default NavButton;
