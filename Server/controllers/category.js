const Category = require("../models/category");
const { errorHandler } = require("../helper/dbErrorhandler");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist", //if we have error we let it handle by error handler which is our helper function.
      });
    }
    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err), //if we have error we let it handle by error handler which is our helper function.
      });
    }
    res.json({ data }); //we don't have to do data : data since key and value are same then we can simply write data only.
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Category Deleted",
    });
  });
};

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
