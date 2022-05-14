const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderDetailSchema = new mongoose.Schema(
  {
    order: {
      type: ObjectId,
      ref: "Order",
    },
    product: {
      type: ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderDetail", orderDetailSchema);
