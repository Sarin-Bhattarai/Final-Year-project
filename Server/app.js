const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const expressValidator = require("express-validator");

require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

//app
const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

//db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connection Successful"));

//middlewares
app.use(morgan("dev")); //Help us to know which routes have been requested and we can see it in console.
app.use(bodyParser.json()); //Parse the incoming body request in json format.
app.use(cookieParser()); //cookie-parser is a middleware which parses cookies attached to the client request object.
app.use(expressValidator());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
