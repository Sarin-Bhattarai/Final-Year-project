import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
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
    signin({ email, password }).then((data) => {
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
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
          required
        />
        <small id="emailHelp" class="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          value={password}
          required
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
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
      if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      } else {
        return (
          <div>
            <h4>Admin please login from admin portal side</h4>
          </div>
        );
        // return <Redirect to="/admin/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Signin"
      description="Signin to Fewa Electronics"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
      {/* The JSON.stringify() method converts a JavaScript object or value to a JSON string, 
      optionally replacing values if a replacer function is specified or optionally including only 
      the specified properties if a replacer array is specified. */}
    </Layout>
  );
};

export default Signin;
