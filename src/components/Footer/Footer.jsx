import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <p className="footer__bottom">
        &copy; 2024 Snaps{" "}
        <Link to="" className="footer__bottom-link">
          . Terms
        </Link>{" "}
        <Link to="" className="footer__bottom-link">
          Privacy
        </Link>{" "}
        <Link to="" className="footer__bottom-link">
          Cookies
        </Link>
      </p>
    </div>
  );
}

export default Footer;
