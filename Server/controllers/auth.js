const User = require("../models/user");
const jwt = require("jsonwebtoken"); //to generate signed token
const expressJwt = require("express-jwt"); //for authorization check
const { errorHandler } = require("../helper/dbErrorhandler");

//user signup
exports.signup = (req, res) => {
  // console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({ err: errorHandler(err) });
    }

    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

//user signin
exports.signin = (req, res) => {
  //we will find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email doesn't exist. Please Signup",
      });
    }
    //if user is found we make sure that email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password doesn't match",
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//user signout
exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Successful" });
};

//user require sign(optional for now)
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

(exports.verifyLogin = async (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      return res.json({
        status: "fail",
        data: {
          user: "login required",
        },
      });
    }
    const token = await req.header("Authorization").split(" ")[1];
    if (!token) {
      return res.json({
        status: "fail",
        data: {
          user: "login required",
        },
      });
    }
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(userData._id);
    console.log(req.user);
    next();
  } catch (ex) {
    return res.json({
      status: "error",
      message: ex.stack,
    });
  }
}),
  //for checking the authorized user to give access
  (exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id; //authenticated user must have same id to sign again.
    if (!user) {
      return res.status(403).json({
        error: "Access Denied",
      });
    }
    next();
  });

//checking for the admin access
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Denied",
    });
  }
  next();
};

exports.adminSignin = (req, res) => {
  //we will find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Admin with that email doesn't exist. Please Signup",
      });
    }
    //if user is found we make sure that email and password match
    //create authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password doesn't match",
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};
