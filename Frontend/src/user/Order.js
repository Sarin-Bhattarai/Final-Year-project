import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getMyOrders } from "./userApi";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";

const OrderUser = () => {
  const [orders, setOrders] = useState([]);

  const { _id, token } = isAuthenticated();

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>

          <li className="list-group-item">
            <Link className="nav-link" to={`/my/orders`}>
              My Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  useEffect(() => {
    getMyOrders(token).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data.data.orders);
      }
    });
  }, []);

  return (
    <Layout title="Order" description="My Orders">
      <div
        className="mw-100 w-100 d-lg-flex justify-content-end"
        style={{ overflow: "auto" }}
      >
        <div className="col-3">{userLinks()}</div>
        <table className="table w-75 mw-75 mr-5" style={{ overflow: "auto" }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Total</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, i) => (
                <tr key={i}>
                  <td>{order.user}</td>
                  <td>{order.total}</td>
                  <td>{order.status}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.phone}</td>
                  <td>{order.deliveryLocation}</td>
                  <td>{order.paymentType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default OrderUser;
