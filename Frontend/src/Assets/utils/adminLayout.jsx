import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signout } from "../../auth";
import { AiOutlineBars, AiFillCloseCircle } from "react-icons/ai";

const AdminLayout = (props) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const history = useHistory();

  const adminLinks = () => {
    return (
      <div
        className="position-fixed bg-secondary p-4"
        style={{ height: "100vh" }}
      >
        <span
          onClick={() => setShowSidebar(false)}
          className="h3 text-white"
          style={{ cursor: "pointer" }}
        >
          <AiFillCloseCircle />
        </span>
        <h4 className=" text-light my-4 ml-4 ">Admin Links</h4>
        <ul className="list-group ">
          <li className="list-group-item bg-secondary text-light border-0">
            <Link className="nav-link text-light" to="/admin/dashboard">
              Home Page
            </Link>
          </li>

          <li className="list-group-item bg-secondary border-0">
            <Link className="nav-link text-light" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item bg-secondary border-0">
            <Link className="nav-link text-light " to="/create/product">
              Create Product
            </Link>
          </li>

          <li className="list-group-item bg-secondary text-light border-0">
            <Link className="nav-link text-light" to="/admin/product">
              Manage Products
            </Link>
          </li>

          <li className="list-group-item bg-secondary text-light border-0">
            <Link className="nav-link text-light" to="/admin/category">
              Manage Categories
            </Link>
          </li>

          <li className="list-group-item bg-secondary text-light border-0">
            <Link className="nav-link text-light" to="/admin/order">
              Order Section
            </Link>
          </li>

          <br />
        </ul>
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
      }}
    >
      <div
        className={`${!showSidebar && "d-none"}`}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "10",
          width: "50%",
        }}
      >
        {adminLinks()}
      </div>
      <div
        className="w-100"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="bg-secondary mb-20 d-flex justify-content-between p-4"
          style={{ height: "100px", width: "100%" }}
        >
          <span
            className="h3 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSidebar(true)}
          >
            <AiOutlineBars />
          </span>
          <span
            onClick={() => {
              history.push("/signin");
              signout();
            }}
          >
            <h4 className="text-white" style={{ cursor: "pointer" }}>
              Signout
            </h4>
          </span>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default AdminLayout;
