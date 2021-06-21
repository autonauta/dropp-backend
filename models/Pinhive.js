const mongoose = require("mongoose");

const pinhiveSchema = new mongoose.Schema(
  {
    admin_id: {
      type: String,
      require: true,
      unique: true,
    },
    country: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    colony: {
      type: String,
      require: true,
    },
    street: {
      type: String,
      require: true,
    },
    number: {
      type: String,
      require: true,
    },
    postal_code: {
      type: String,
      require: true,
    },
    status: Boolean,
    pinboxes: {
      pb_1: Boolean,
      pb_2: Boolean,
      pb_3: Boolean,
      pb_4: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pinhive", pinhiveSchema);
