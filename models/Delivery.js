const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
  {
    courier: String,
    phone: String,
    size: String,
    hive_id: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
