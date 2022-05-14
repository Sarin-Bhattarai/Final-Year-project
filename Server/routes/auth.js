const express = require("express");
const router = express.Router();

//import controllers
const {
  signup,
  signin,
  signout,
  requireSignin,
  adminSignin,
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/admin/signin", adminSignin);
router.get("/signout", signout);

module.exports = router;
