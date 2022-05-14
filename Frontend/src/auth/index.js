import { API } from "../config";

export const signup = (user) => {
  return fetch(`${API}/signup`, {
    //first argument is URL we defined in back end and the second argument is the object you get(method, headers and so on)
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  return fetch(`${API}/signin`, {
    //first argument is URL we defined in back end and the second argument is the object you get(method, headers and so on)
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const adminSignin = (user) => {
  return fetch(`${API}/admin/signin`, {
    //first argument is URL we defined in back end and the second argument is the object you get(method, headers and so on)
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    next();
    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("signout", response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
