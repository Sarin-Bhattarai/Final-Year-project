const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    deliveryLocation: {
      type: String,
    },
    phone: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
      enum: ["placed", "delivering", "delivered"],
      default: "placed",
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryCharge: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
    paymentType: {
      type: String,
      enum: ["cod", "khalti"],
      default: "cod",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
