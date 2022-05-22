import React, { useState } from "react";
import { signout } from "../auth";
import { Link, useHistory } from "react-router-dom";
import { AiOutlineBars, AiFillCloseCircle } from "react-icons/ai";
import User from "../Assets/images/user.jpg";
import Cart from "../Assets/images/cart.jpg";
import { getPaymentType } from "./userApi";

const AdminDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [data, setData] = useState([]);
  const history = useHistory();

  const clickSubmit = async (type) => {
    // event.preventDefault();
    const orders = await getPaymentType(type);
    console.log(orders.data.order);
    setData(orders.data.order);
  };

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

  const adminInfo = () => {
    return (
      <div>
        <h2 className="ml-5">
          <strong>Report of Fewa Electronics</strong> <hr />
        </h2>
        <div className="d-flex">
          <div
            className="card offset-md-4"
            style={{ width: "220px", height: "150px" }}
          >
            <h5 className="card-title">Total Users</h5>
            <img
              className="card-img-top w-25 h-50 mx-auto d-block"
              src={User}
              alt="user"
            />
            <div className="card-body">
              <p className="card-text">
                {" "}
                Total: <strong>10</strong>
              </p>
            </div>
          </div>

          <div
            className="card offset-md-1"
            style={{ width: "220px", height: "150px" }}
          >
            <h5 className="card-title">Total Orders</h5>
            <img
              className="card-img-top w-25 h-50 mx-auto d-block"
              src={Cart}
              alt="order"
            />
            <div className="card-body">
              <p className="card-text">
                Total: <strong>5</strong>
              </p>
            </div>
          </div>
        </div>
        <br />
        <button
          className="btn btn-info mr-5 "
          onClick={() => clickSubmit("khalti")}
        >
          By Online Sales
        </button>
        <button
          className="btn btn-info offset-md-1"
          style={{ marginLeft: "20px" }}
          onClick={() => clickSubmit("cod")}
        >
          By Offline Sales
        </button>
        <br />
        <br />
        <br />
        <div
          className="mw-100 w-100 d-lg-flex justify-content-end"
          style={{ overflow: "auto" }}
        >
          <table className="table w-75 mw-75 mr-5" style={{ overflow: "auto" }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Payment Type</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length ? (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>{item?.user?.name}</td>
                    <td>{item.deliveryLocation}</td>
                    <td>{item.phone}</td>
                    <td>{item.paymentType}</td>
                    <td>{item.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>No results till now</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
        <div className="d-flex justify-content-center">
          <div
            className="text-center text-dark"
            style={{ width: "100%", marginTop: "2%" }}
          >
            {adminInfo()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
