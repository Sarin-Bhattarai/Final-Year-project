import React, { useState, useEffect } from "react";
import AdminLayout from "../Assets/utils/adminLayout";
import { getSingleOrder, updateOrder } from "./apiAdmin";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "../auth";

const OrderDetail = () => {
  const URL = "http://localhost:8000/";
  const { orderId } = useParams();
  const [orders, setOrders] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    getSingleOrder(orderId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data.data);
      }
    });
  }, [orderId]);

  const { token } = isAuthenticated();

  const handleStatusUpdate = (orderId) => {
    updateOrder({
      id: orderId,
      token,
      status: newStatus,
    }).then((res) => {
      console.log(res);
    });
  };
  return (
    <AdminLayout>
      <div
        className="mw-100 w-100 d-lg-flex justify-content-end"
        style={{ overflow: "auto" }}
      >
        <table className="table w-75 mw-75" style={{ overflow: "auto" }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Payment Type</th>
              <th>Image</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orders?.order?.user}</td>
              <td>
                <select
                  className="text-black"
                  onChange={(e) => {
                    setNewStatus(e.target.value);
                  }}
                  value={orders?.order?.status}
                >
                  <option value="placed">Placed</option>
                  <option value="delivering">Delivering</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td>{orders?.order?.paymentStatus}</td>
              <td>{orders?.order?.paymentType}</td>
              <td>
                {" "}
                {orders?.items?.map((item) => {
                  return (
                    <div key={item?._id}>
                      <img
                        className="offset-md-1"
                        style={{ width: "45px", height: "45px" }}
                        src={`${URL}${item?.product?.photo}`}
                        alt={"product_image"}
                      />
                      <hr />
                      <div className="dropdown show">
                        <a
                          className="btn btn-sm btn-secondary dropdown-toggle"
                          href="#me"
                          role="button"
                          id="dropdownMenuLink"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          See Details
                        </a>

                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuLink"
                        >
                          <a className="dropdown-item" href="#me">
                            {`Product Name: ${item?.product?.name}`}
                          </a>
                          <a className="dropdown-item" href="#me">
                            {`Ordered Quantity: ${item?.quantity}`}
                          </a>
                          <a className="dropdown-item" href="#me">
                            {`Product Price: ${item?.product?.price}`}
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </td>
              <td>
                <button
                  className="btn btn-success mr-2"
                  disabled={newStatus ? false : true}
                  onClick={() => handleStatusUpdate(orderId)}
                  style={{ cursor: "pointer" }}
                >
                  Update Status
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default OrderDetail;
