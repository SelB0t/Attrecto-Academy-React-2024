import { FC } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

import classes from "./Navbar.module.scss";
import "./Navbar.scss";
import { getDataFromTokenModel } from "../../util/token";
import { Button } from "../button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  isLoggedIn: boolean;
  logout: () => void;
}

const Navbar: FC<NavbarProps> = ({ isLoggedIn, logout }) => {
  const email = getDataFromTokenModel("email");

  const routes = [
    { label: "Home", link: "/home" },
    { label: "Users", link: "/users" },
    { label: "Badges", link: "/badges" },
  ];

  return (
    <nav className={classNames("navbar p-3", [classes.Navbar])}>
      <div className={classNames("d-flex align-items-center justify-content-between flex-grow-1 flex-wrap", classes.MinWidth0)}>
        <div className="d-flex">
          {isLoggedIn &&
            routes.map(({ link, label }) => {
              return <NavLink key={link} to={link} className="nav-link me-4">
                {label}
              </NavLink>
            })
          }
        </div>
        <div className="d-flex align-items-center">
          <p className="mb-0">
            Welcome {email ? email : "to Attrecto Academy"}
          </p>
          {
            isLoggedIn &&
            <Button
              onClick={logout}
              color="secondary"
              className="ms-3"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
            </Button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;