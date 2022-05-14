const express = require("express");
const router = express.Router();

//import auth controller
const { verifyLogin } = require("../controllers/auth");
const {
  createOrder,
  fetchAllOrders,
  fetchMyOrders,
  createCashOrder,
  updateOrder,
  getSingleOrder,
  getType,
} = require("../controllers/order");

router.get("/orders", fetchAllOrders);
//type routes
router.get("/orders/payment/:type", getType);
router.get("/orders/:id", getSingleOrder);
router.get("/my-orders", verifyLogin, fetchMyOrders);
router.post("/orders", verifyLogin, createOrder);
router.post("/cash/orders", verifyLogin, createCashOrder);
router.put("/orders/:id", verifyLogin, updateOrder);

module.exports = router;
