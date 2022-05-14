import React, { useState, useEffect, useCallback } from "react";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { deleteProduct, getPaginatedProducts } from "./apiAdmin";
import ShowImage from "../core/ShowImage";
import AdminLayout from "../Assets/utils/adminLayout";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  const { user, token } = isAuthenticated();

  const loadProducts = useCallback(() => {
    getPaginatedProducts(page).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data.results);
        setNext(data.next);
        setPrev(data.previous);
      }
    });
  }, [page]);

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

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
          <div className="col-md-8 offset-md-3" style={{ paddingTop: "5px" }}>
            <h2 className="text-center mt-5" style={{ color: "white" }}>
              Total {products.length} products
            </h2>
            <hr />
            <ul className="list-group">
              {products.map((p, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <ShowImage item={p} url="p" />
                  <strong className="w-22">{p.name}</strong>
                  <div>
                    <Link
                      to={`/admin/product/update/${p._id}`}
                      className=" btn badge badge-warning badge-pill"
                    >
                      Update
                    </Link>
                    <span
                      onClick={() => destroy(p._id)}
                      className="btn badge badge-danger badge-pill ml-2"
                    >
                      Delete
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <br />
            <button
              className="btn btn-info mr-4"
              disabled={!prev}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-info "
              disabled={!next}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageProducts;
