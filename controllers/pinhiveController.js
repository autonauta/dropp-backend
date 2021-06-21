const Pinhive = require("../models/Pinhive");
const { errorHandler } = require("../helpers/dberrorHandler");

exports.create = (req, res) => {
  const pinhive = new Pinhive(req.body);
  pinhive.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.list = (req, res) => {
  Pinhive.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
