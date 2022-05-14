const Order = require("../models/order");
const OrderDetail = require("../models/orderDetail");
const axios = require("axios");

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const result = await axios({
        method: "post",
        url: "https://khalti.com/api/v2/payment/verify/",
        data: {
          token: await req.body.payment.payload.token,
          amount: await req.body.payment.payload.amount,
        },
        headers: {
          Authorization: `Key test_secret_key_083de838e30947fea253db966d7fb9cb`,
          "Content-Type": "application/json",
        },
      });
      if (result.status == 200) {
        const { deliveryLocation, products } = req.body;
        const order = new Order({
          deliveryLocation: `${deliveryLocation.province}, ${deliveryLocation.district}, ${deliveryLocation.city}`,
          user: req.user._id,
          total: req.body.total,
          phone: deliveryLocation.phone,
          paymentStatus: "paid",
          paymentType: "khalti",
        });
        await order.save();
        try {
          for (let i = 0; i < products.length; i++) {
            const newOrder = {
              order: order._id,
              product: products[i]._id,
              quantity: products[i].quantity,
            };
            const orderDetail = new OrderDetail(newOrder);
            await orderDetail.save();
          }
        } catch (ex) {
          return res.status(500).send({ status: "error", message: ex.message });
        }
      } else {
        console.log(result.data);
      }
    } catch (ex) {
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },

  fetchAllOrders: async (req, res, next) => {
    try {
      const orders = await Order.find();
      return res.status(200).send({
        status: "success",
        data: {
          orders,
        },
      });
    } catch (ex) {
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },

  fetchMyOrders: async (req, res, next) => {
    try {
      const orders = await Order.find({ user: req.user._id });
      return res.status(200).json({
        status: "success",
        data: {
          orders,
        },
      });
    } catch (ex) {
      console.log(ex);
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },

  createCashOrder: async (req, res, next) => {
    const { deliveryLocation, products } = req.body;
    try {
      const order = new Order({
        deliveryLocation: `${deliveryLocation.province}, ${deliveryLocation.district}, ${deliveryLocation.city}`,
        user: req.user._id,
        total: req.body.total,
        phone: deliveryLocation.phone,
      });
      await order.save();

      for (let i = 0; i < products.length; i++) {
        const newOrder = {
          order: order._id,
          product: products[i]._id,
          quantity: products[i].quantity,
        };
        const orderDetail = new OrderDetail(newOrder);
        await orderDetail.save();
      }
    } catch (ex) {
      return res.status(500).send({ status: "error", message: ex.message });
    }
  },
  updateOrder: async (req, res, next) => {
    const id = req.params.id;
    try {
      const order = await Order.findById(id);
      if (req.body.status) {
        order.status = req.body.status;
        if (req.body.status === "delivered") {
          order.paymentStatus = "paid";
        }
      }
      if (req.body.paymentStatus) {
        order.paymentStatus = req.body.paymentStatus;
      }
      const result = await order.save();
      return res
        .status(200)
        .send({ status: "success", data: { order: result } });
    } catch (ex) {
      console.log(ex);
      return res
        .status(400)
        .send({ status: "error", message: "Something went wrong" });
    }
  },

  getSingleOrder: async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(400).json({
          status: "fail",
          message: "Order not found",
        });
      }
      const items = await OrderDetail.find({
        order: order._id,
      }).populate("product", "_id name price photo");
      console.log(items);
      return res.status(200).json({
        satus: "success",
        data: {
          order,
          items,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  },

  getType: async (req, res) => {
    const paymentType = req.params.type;
    try {
      const order = await Order.find({ paymentType });
      return res.status(200).json({
        status: "success",
        data: { order },
      });
    } catch (ex) {
      console.log(ex);
      return res
        .status(400)
        .json({ status: "error", message: "Something went wrong" });
    }
  },
};
