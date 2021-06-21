const express = require("express");
const router = express.Router();

const { list } = require("../controllers/deliveryController");

router.get("/showall", list);

module.exports = router;
