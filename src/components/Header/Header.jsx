import React from "react";
import logo from "../../assets/images/findmypharm-logo-1.png";
import { Link } from "react-router-dom";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
      <Link to={"/"} className="header-link">
        <img src={logo} alt="findmypharm logo" className="header-logo" />
      </Link>
    </div>
  );
}

export default Header;
