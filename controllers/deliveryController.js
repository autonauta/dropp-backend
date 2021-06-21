const Delivery = require("../models/Delivery");
const { errorHandler } = require("../helpers/dberrorHandler");

exports.list = (req, res) => {
  Delivery.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
