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
            `hover:text-[#ed1b24] font-semibold text-lg ${
              isActive && "text-[#ed1b24]"
            }`
          }
        >
          <li key={path}>{children}</li>
        </NavLink>
      ) : (
        <Link to={path} className="hover:text-[#ed1b24]">
          {children}
        </Link>
      )}
    </>
  );
}

export default NavButton;
