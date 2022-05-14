exports.userSignupValidator = (req, res, next) => {
  //we will check for details of user and if not found we will display meaningful error message.
  req.check("name", "Name is required").notEmpty();
  req
    .check("email", "Email must be between 3 to 32 charcters long")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });

  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/) //It means password must contain a number.
    .withMessage("Password must contain a number");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0]; //for the first one so index 0
    return res.status(400).json({ error: firstError });
  }
  next();
};
