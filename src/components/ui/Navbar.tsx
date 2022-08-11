import { Link } from "react-router-dom";
import { useAuth } from "../../hooks";
import { BarIcon, LogoutIcon } from "./icons";

const menuLinks = [
  {
    name: "Shop",
    to: "/",
  },
  {
    name: "Products",
    to: "/admin",
  },
  {
    name: "Brands",
    to: "/admin/brands",
  },
  {
    name: "Stores",
    to: "/admin/stores",
  },
];

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl" to={"/admin"}>
          Shop App
        </Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <BarIcon />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box w-52"
            data-theme="autumn"
          >
            {menuLinks.map((item) => (
              <li key={item.name}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          onClick={logout}
          className="btn btn-ghost btn-circle"
        >
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};
