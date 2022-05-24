import React, { useEffect, useState } from "react";
import AdminLayout from "../Assets/utils/adminLayout";
import { getOrders } from "./apiAdmin";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);

  const { token } = isAuthenticated();

  useEffect(() => {
    getOrders().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data.data.orders);
      }
    });
  }, []);

  return (
    <AdminLayout>
      <div
        className="mw-100 w-100 d-lg-flex justify-content-end"
        style={{ overflow: "auto" }}
      >
        <table className="table w-75 mw-75 mr-4" style={{ overflow: "auto" }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Total</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Payment Type</th>
              <th>Update</th>
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
                  <td>
                    <Link to={`/admin/order/${order._id}`}>
                      <button className="btn btn-primary">Update</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OrderAdmin;
