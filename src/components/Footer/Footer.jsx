import React from "react";
import { Link } from "react-router-dom";
import FooterIcon from "../FooterIcon/FooterIcon.jsx";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__top">
        <h3 className="footer__top-text">Follow us @ </h3>
        <FooterIcon />
      </div>
      <p className="footer__bottom">
        &copy; 2025 Pharms{" "}
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
