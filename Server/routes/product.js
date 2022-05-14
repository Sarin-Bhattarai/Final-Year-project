const express = require("express");
const multer = require("multer");
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");

//import controllers
const { userById } = require("../controllers/user");
const Product = require("../models/product");
const {
  productById,
  read,
  remove,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listSearch,
} = require("../controllers/product");
const paginate = require("paginate-middleware");

//file or image upload
const storage = multer.diskStorage({
  //Where the incoming file should be stored is(destination)
  //There is request, file and call back
  //You get the request to the folder, access to the file and call back function
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  //It shows how the file name should be define
  filename: function (req, file, cb) {
    //we put the Date.now() function because it gives the date stamp(when we uploaded the image) and makes it unique.
    cb(null, Date.now() + "_" + file.originalname);
  },
});

//filtering the requested file
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jfif"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//limiting the size of file
const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const type = uploads.single("photo");

//get product by id

router.get("/product/:productId", read);

//post product
router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  type,
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        data: { image: "No file selected" },
      });
    }
    try {
      const productDetails = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        shipping: req.body.shipping,
        quantity: req.body.quantity,
        photo: req.file.path,
      };
      const product = new Product(productDetails);
      const result = await product.save();
      return res.send({ status: "Success", data: { product: result } });
    } catch (ex) {
      return res.send({ status: "Error", message: ex.message });
    }
  }
);

//delete a product

router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);

router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  type,
  async (req, res) => {
    const productid = req.params.productId;
    console.log(req.body);
    try {
      const product = await Product.findById(productid);
      if (req.body.name) {
        product.name = req.body.name;
      }
      if (req.body.description) {
        product.description = req.body.description;
      }
      if (req.body.price) {
        product.price = req.body.price;
      }
      if (req.body.category) {
        product.category = req.body.category;
      }
      if (req.body.quantity) {
        product.quantity = req.body.quantity;
      }
      if (req.file) {
        product.photo = req.file.path;
      }
      if (req.body.shipping) {
        product.shipping = req.body.shipping;
      }
      const result = await product.save();
      return res
        .status(200)
        .send({ status: "success", data: { product: result } });
    } catch (ex) {
      console.log(ex);
      return res
        .status(400)
        .send({ status: "error", message: "Something went wrong" });
    }
  }
);

//GET http://localhost:8000/api/admin/manage/products?page=1&limit=3
router.get("/admin/manage/products", paginate(Product), (req, res) => {
  res.json(res.paginatedResult);
});

router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
