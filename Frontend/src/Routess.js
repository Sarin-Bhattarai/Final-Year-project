import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import ManageProducts from "./admin/ManageProduct";
import ManageCategories from "./admin/ManageCategory";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/updateCategory";
import AdminSignin from "./user/adminSignin";
import Profile from "./user/Profile";
import Order from "./user/Order";
import OrderAdmin from "./admin/OrderAdmin";
import OrderDetail from "./admin/OrderDetail";

const Routess = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/admin/signin" exact component={AdminSignin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/admin/product" exact component={ManageProducts} />
        <AdminRoute path="/admin/category" exact component={ManageCategories} />
        <AdminRoute path="/admin/order" exact component={OrderAdmin} />
        <AdminRoute
          path="/admin/order/:orderId"
          exact
          component={OrderDetail}
        />
        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <Route path="/product/:productId" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/profile/:userId" exact component={Profile} />
        <PrivateRoute path="/my/orders" exact component={Order} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routess;
