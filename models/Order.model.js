const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  items: { type: Array, required: true },
});

const Order = mongoose.model("order", OrderSchema);
module.exports = Order;
