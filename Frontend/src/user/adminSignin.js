import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { adminSignin, authenticate, isAuthenticated } from "../auth";

const AdminSignin = () => {
  const [values, setValues] = useState({
    email: "sarin@gmail.com",
    password: "sarin1234",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    //function returning a another function is called high function
    setValues({ ...values, error: false, [name]: event.target.value }); //we set error to false because after erro user again try and that time error should be gone.
    //grab all the properties of values with spread operator if there is error we set it to false and target the value(name, password or email)
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    adminSignin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToReferrer: true,
          });
        });
      }
    });
  };

  const signUpForm = () => (
    <form className="py-10" style={{ padding: "1rem 0.5rem" }}>
      <h2 className="text-center text-secondary">Admin Login</h2>
      <div className="form-group" style={{ marginTop: "40px" }}>
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-info btn-block sign">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        //<Redirect to="/admin/signin" />;
        return (
          <div>
            <h4>You are not allowed! please Login from user portal</h4>
          </div>
        );
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div
      className=" w-100 py-10 d-flex"
      style={{ backgroundColor: "#a9a9a9", margin: 0, height: "100vh" }}
    >
      <div
        className="col-md-5 container "
        style={{
          backgroundColor: "white",
          height: "fit-content",
          marginTop: "10%",
          borderRadius: "10px",
        }}
      >
        {showLoading()}
        {signUpForm()}
        {showError()}
        {redirectUser()}
      </div>
    </div>
  );
};

export default AdminSignin;
