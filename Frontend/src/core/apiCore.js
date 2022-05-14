import { API } from "../config";
import queryString from "query-string";

export const getProducts = (sortBy) => {
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
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

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    skip,
    limit,
    filters,
  };

  return fetch(`${API}/products/by/search`, {
    //first argument is URL we defined in back end and the second argument is the object you get(method, headers and so on)
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const list = (params) => {
  const query = queryString.stringify(params);
  console.log(query);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listRelated = (productId) => {
  return fetch(`${API}/products/related/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createOrder = ({
  deliveryLocation,
  total,
  products,
  payment,
  token,
}) => {
  const data = { deliveryLocation, total, products, payment };
  return fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response.json());
      return response.json();
    })

    .then((res) => {
      console.log(res);
    })

    .catch((err) => {
      console.log(err);
    });
};

export const createCashOrder = ({
  deliveryLocation,
  total,
  products,
  token,
}) => {
  const data = { deliveryLocation, total, products };
  return fetch(`${API}/cash/orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response.json());
      return response.json();
    })

    .then((res) => {
      console.log(res);
    })

    .catch((err) => {
      console.log(err);
    });
};
