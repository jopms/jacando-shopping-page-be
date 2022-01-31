const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["cheese", "fruits", "vegetables"],
  },
  price: { type: Number, required: true },
  currency: { type: String, required: true },
  unit: { type: String },
  amount: { type: Number, required: true },
  count: { type: Number },
});

const Item = mongoose.model("item", ItemSchema);
module.exports = Item;
