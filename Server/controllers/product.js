const { errorHandler } = require("../helper/dbErrorhandler");
const Product = require("../models/product");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.read = (req, res) => {
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

/**
 * Sell and Arrival
 * by sell = /products?sortBy=sold&order=descending&limit=4(limit can be any, for here it is 4)
 * if it is 4 then we will return only 4 products.
 * by arrival = /products?sortBy=createdAt&order=descending&limit=4
 * if no params are send , then all products are returned
 */

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc"; //ascending order
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6; //default it's going to be six.

  Product.find()
    // .select("-photo") //not selecting photo since it is in binary form and makes slow.
    .populate("category") //we are refering the category as mongose object id referencing to "Category" model so we populate it.
    .sort([[sortBy, order]]) //Arrays of array
    .limit(limit) //limit or it is set by default
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

/**
 * It will find the products based on the req product category
 * Other products that has the same category, will be returned.
 */
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    //ne = not including yourself(product itself) or same product which is requested.
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

exports.listCategories = (req, res) => {
  //Finds the distinct values for a specified field across a single collection.
  //Distinct returns a document that contains an array of the distinct values.
  //first which disntinct value is needed passed, then in second query is passed but here we don't need so we passed empty object.
  Product.distinct("category", {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "Categories not found",
      });
    }
    res.json(categories);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he/she wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {}; //we let it be empty for now when we serach product based on that it returns argument we passed in.

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10](gte and lte are already inbuilt in mongodb)
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    // .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

// exports.photo = (req, res, next) => {
//   if (req.product.photo.data) {
//     res.set("Content-Type", req.product.photo.contentType);
//     return res.send(req.product.photo.data);
//   }
//   next();
// };

exports.listSearch = (req, res) => {
  //create query object to hold search value and category value
  const query = {};
  //assign search value to query.name
  if (req.query.search) {
    //i is for case insensitivity
    query.name = { $regex: req.query.search, $options: "i" };
    //assign category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    //find the product based on query object wih 2 properties
    //search and category
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    });
  }
};
