const express = require("express");
const router = express.Router();
//import controllers
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");
const { userById } = require("../controllers/user");
const paginate = require("paginate-middleware");

router.get("/category/:categoryId", read);

router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);

router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.get("/categories", list);

router.param("categoryId", categoryById);
//params property is where Express stores the values of the named sections in the URL.

router.param("userId", userById);

module.exports = router;
