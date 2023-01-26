import React, { useState } from "react";
import logoWhite from "../../images/logo-white.png";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { BiListUl } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

const Navbar = ({ func }) => {
  const [isActive, setIsActive] = useState(false);
  const [selected, setSelected] = useState("");

  const menuItem = [
    {
      id: "1",
      title: "Dashboard",
      path: "./dashboard",
      icon: <BiListUl />,
    },
    {
      id: "2",
      title: "Add new",
      path: "/addNew",
      icon: <IoMdAdd />,
    },
  ];
  const navLinkStyles = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "#1A1A27" : "",
      color: isActive ? "white" : "",
    };
  };

  return (
    <div className="navbarr">
      <div className="logo">
        <a href="">
          <img src={logoWhite} />
        </a>
      </div>

      <div className="menu_container">
        <ul className="menu">
          {menuItem.map(({ id, path, icon, title }) => (
            <NavLink
              onClick={() => {
                setSelected(title);
                func(title);
              }}
              style={navLinkStyles}
              to={path}
            >
              <li key={id}>
                <div className="icon_">{icon}</div> {title}
              </li>
            </NavLink>
          ))}
        </ul>
        <div className="btn_div">
          <button>Docs & Components</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
