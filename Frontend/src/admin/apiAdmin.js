import { API } from "../config";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    //first argument is URL we defined in back end and the second argument is the object you get(method, headers and so on)
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      // content type?
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    //first argument is URL we defined in back end and the second argument is the object you get(method, headers and so on)
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 * to perform crud on product
 */

/**
 *
 * @get all products
 */
export const getProducts = () => {
  return fetch(`${API}/products?limit=3`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 *
 * @get all products
 */
export const getPaginatedProducts = (page) => {
  return fetch(`${API}/admin/manage/products?page=${page}&limit=3`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 *
 * @delete product
 */

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 *
 * @get single product
 */

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

/**
 *
 * @edit product
 */

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product, //we get this product as parameter
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrders = () => {
  return fetch(`${API}/orders`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateOrder = ({ id, token, status, paymentStatus }) => {
  const data = { status, paymentStatus };
  console.log(data);
  return fetch(`${API}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSingleOrder = (id) => {
  return fetch(`${API}/orders/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
