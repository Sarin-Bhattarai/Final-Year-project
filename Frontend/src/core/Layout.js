import React from "react";
import Menu from "./Menu";
import "../styles.css";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <div className={className} style={{ minHeight: "45vh" }}>
      {children}
    </div>
    <br />

    <footer className="footer-distributed ">
      <div className="footer-left">
        <h3>Fewa Electronics</h3>
        <br />
        <p className="footer-company-name">
          Copyright © 2022 <strong>Fewa Electronics</strong> All rights reserved
        </p>
      </div>

      <div className="footer-center">
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>Lakeside</span>
            Pokhara
          </p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+977 9000000000</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="https://mail.google.com/" className="text-white">
              fewa@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-company-about">
          <span>About the company</span>
          <strong>Fewa Electronics</strong> is an online shopping platform
          started in 2022 which works as a bridge between sellers and buyers in
          the country.
        </p>
      </div>
    </footer>
  </div>
);

export default Layout;
