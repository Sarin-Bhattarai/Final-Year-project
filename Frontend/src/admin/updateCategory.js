import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { getCategory, updateCategory } from "./apiAdmin";
import AdminLayout from "../Assets/utils/adminLayout";

const UpdateCategory = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    error: "",
    redirectToProfile: false,
    formData: "",
  });

  // destructure user and token from localStorage
  const { user, token } = isAuthenticated();

  const { name, error, redirectToProfile } = values;

  const init = (categoryId) => {
    getCategory(categoryId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // populate the state
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submitCategoryForm = (e) => {
    e.preventDefault();
    // update with ? you should send category name otherwise what to update?
    const category = {
      name: name,
    };
    updateCategory(match.params.categoryId, user._id, token, category).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            error: false,
            redirectToProfile: true,
          });
        }
      }
    );
  };

  const updateCategoryForm = () => (
    <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
      <form
        className="mb-5"
        style={{
          padding: "1rem 1rem",
          backgroundColor: "#FFFFFF",
          marginTop: "20px",
          marginLeft: "40px",
          borderRadius: "5px",
        }}
        onSubmit={submitCategoryForm}
      >
        <br />
        <br />
        <h5>
          <span className="text-muted">Category Name</span>
        </h5>
        <br />
        <br />
        <div className="wrap-input100 validate-input m-b-36">
          <input
            onChange={handleChange("name")}
            value={name}
            className="form-control"
            type="text"
            required
            name="name"
          />
        </div>
        <br />
        <div className="w-size25">
          <button type="submit" className="btn btn-outline-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );

  const showError = () => (
    <div
      className={"alert alert-danger"}
      role="alert"
      style={{ display: error ? "" : "none" }}
    >
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
      {error}
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/category" />;
      }
    }
  };

  const showAdminMessage = () => {
    return (
      <div className="mt-5" style={{ marginTop: "25px" }}>
        <h4 className="text-center text-light">
          Hello Admin, Ready to Update the Category
        </h4>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#808080",
        }}
      >
        <div className="col-md-8 offset-md-3 m-b-250 mb-5">
          {showAdminMessage()}
          {showError()}
          {updateCategoryForm()}
          {redirectUser()}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateCategory;
