import React, { useEffect, useState } from "react";
import { createOrder, createCashOrder } from "./apiCore";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import KhaltiCheckout from "khalti-checkout-web";

const Checkout = ({ products }) => {
  const [details, setDetails] = useState({
    district: "",
    city: "",
    province: "",
    phone: "",
  });

  // const [filteredProducts, setFilteredProducts] = useState([]);

  // const cartData = JSON.parse(localStorage.getItem("cart") || []);

  // useEffect(() => {
  //   if (cartData) {
  //     console.log(cartData);
  //     const filteredProducts = cartData.map((product) => {
  //       const { _id, quantity } = product;
  //       return { _id, quantity };
  //     });
  //     setFilteredProducts(filteredProducts);
  //   }
  // }, [cartData]);

  const getTotal = () => {
    //first take function as an argument and second one is index
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const { token } = isAuthenticated();
  const { district, city, province, phone } = details;

  /**
   * @Khalti gateway
   */
  let config = {
    publicKey: "test_public_key_631b5e1b40f649ec8d9f07558e390cdc",
    productIdentity: "1234567890",
    productName: "Drogon",
    productUrl: "http://gameofthrones.com/buy/Dragons",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        console.log(payload);
        createOrder({
          deliveryLocation: details,
          total: getTotal(),
          products,
          payment: {
            type: "Khalti",
            payload,
          },
          token,
        });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };

  let checkout = new KhaltiCheckout(config);
  const getKhaltiConfirmation = (amount) => {
    if (details.district && details.city && details.province && details.phone) {
      checkout.show({ amount: amount * 100 });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill up the form",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const codOrder = () => {
    if (details.district && details.city && details.province && details.phone) {
      createCashOrder({
        deliveryLocation: details,
        total: getTotal(),
        products,
        token,
      });
      Swal.fire({
        title: "Success!",
        text: "Your Order has been placed",
        icon: "success",
        confirmButtonText: "Close",
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill up the form",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const handleChange = (name) => (event) => {
    event.preventDefault();
    //function returning a another function is called high function
    setDetails({ ...details, error: false, [name]: event.target.value });
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>
        <h6>Shipping details</h6>
        <div className="form-group">
          <input
            onChange={handleChange("district")}
            type="text"
            className="form-control"
            value={district}
            placeholder="Enter District"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("city")}
            type="text"
            className="form-control"
            value={city}
            placeholder="Enter City"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("province")}
            type="text"
            className="form-control"
            value={province}
            placeholder="Enter Province-No"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("phone")}
            type="text"
            className="form-control"
            value={phone}
            placeholder="Enter Phone"
            required
          />
        </div>

        <button
          onClick={() => codOrder()}
          className="btn btn-success w-40 mr-4"
        >
          Cash On Delivery
        </button>

        <button
          onClick={() => getKhaltiConfirmation(getTotal())}
          className="btn btn-success w-40"
        >
          Pay Online
        </button>
      </div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h4>Total: R.s {getTotal()} </h4>
      <hr />
      {showCheckout()}
    </div>
  );
};

export default Checkout;
