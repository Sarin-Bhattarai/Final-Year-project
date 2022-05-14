import React, { useState } from "react";
import { isAuthenticated } from "../auth";
import { createCategory } from "./apiAdmin";
import AdminLayout from "../Assets/utils/adminLayout";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setName(e.target.value);
  };
  const clickSubmit = (e) => {
    e.preventDefault(); //setting the behaviour of browser so it doesn't reloaded while clikcing the button without adding some value
    setError("");
    setSuccess(false);

    //make request to api to create category
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const showAdminMessage = () => {
    return (
      <div style={{ paddingTop: "50px" }}>
        <h4 className="text-center text-light">
          Welcome Admin, Ready to Create a new Category
        </h4>
      </div>
    );
  };
  const newCategoryForm = () => (
    <form
      className="py-2 "
      style={{
        padding: "0rem 1rem",
        backgroundColor: "#FFFFFF",
        marginTop: "150px",
        marginLeft: "60px",
        borderRadius: "5px",
      }}
      onSubmit={clickSubmit}
    >
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />
      </div>
      <button
        className="btn btn-outline-primary "
        style={{ borderRadius: "20px" }}
      >
        Create Category
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-light text-center">{name} is created</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger text-center">
          Category name should be unique
        </h3>
      );
    }
  };

  return (
    <AdminLayout>
      <div
        style={{
          height: "100vh",
          maxWidth: "100%",
          backgroundColor: "#808080",
        }}
      >
        <div style={{ boxSizing: "border-box" }}>
          <div className="col-md-6 offset-md-3">
            {showAdminMessage()}
            {showSuccess()}
            {showError()}
            {newCategoryForm()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCategory;
