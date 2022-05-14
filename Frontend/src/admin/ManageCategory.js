import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getCategories, deleteCategory } from "./apiAdmin";
import AdminLayout from "../Assets/utils/adminLayout";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const destroy = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadCategories();
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <AdminLayout>
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#808080",
        }}
      >
        <div style={{ boxSizing: "border-box" }}>
          <div className="col-md-8 offset-md-3">
            <h2 className="text-center" style={{ color: "white" }}>
              Total {categories.length} categories
            </h2>
            <hr />
            <ul className="list-group">
              {categories.map((c, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <strong className="w-20">{c.name}</strong>
                  <div>
                    <Link
                      to={`/admin/category/update/${c._id}`}
                      className="btn badge badge-warning badge-pill"
                    >
                      Update
                    </Link>
                    <span
                      onClick={() => destroy(c._id)}
                      className="btn badge badge-danger badge-pill ml-2"
                    >
                      Delete
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <br />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageCategories;
