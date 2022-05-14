import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { readUser, updateUser, updateResult } from "./userApi";
import User from "../Assets/images/user.jpg";

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    password: "",
    email: "",
    error: false,
    success: false,
  });

  const { token } = isAuthenticated();

  const { name, password, email, error, success } = values;

  const init = (userId) => {
    readUser(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true });
      } else {
        setValues({ ...values, name: data.name, email: data.email });
      }
    });
  };

  useEffect(() => {
    init(match.params.userId);
  }, []);

  const handleChange = (name) => (e) => {
    //high order function i.e function returning another function
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    updateUser(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          updateResult(data, () => {
            setValues({ ...values, name: data.name, success: true });
          });
        }
      }
    );
  };

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/" />;
    }
  };

  const updateProfile = (name, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("name")}
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
        <small id="emailHelp" class="form-text text-muted">
          Type here if you want to change your password
        </small>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const profileMessage = () => {
    return (
      <div className="card">
        <img
          className="card-img-top"
          style={{ borderRadius: "130px" }}
          src={User}
          alt="user"
        />
        <div className="card-body">
          <h5 className="card-title">User</h5>
          <p className="card-text">
            Hello {name}!. Update your profile if you want to!
          </p>
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Profile"
      description="Update your Profile"
      className="container-fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      <div className="col-6">{updateProfile(name, password)}</div>
      <div className="display-right">
        <div className="col-6">{profileMessage()}</div>
      </div>
      {redirectUser(success)}
    </Layout>
  );
};

export default Profile;
