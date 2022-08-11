import { Link } from "react-router-dom";
import { BarIcon } from "./icons";

const menuLinksAdmin = [
  {
    name: "Admin",
    to: "/admin",
  },
];

export const NavbarShop = () => {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl" to={"/"}>
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
            {menuLinksAdmin.map((item) => (
              <li key={item.name}>
                <Link to={item.to}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
