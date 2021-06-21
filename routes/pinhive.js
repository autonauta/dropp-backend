const express = require("express");
const router = express.Router();

const { list, create } = require("../controllers/pinhiveController");

router.get("/showall", list);
router.post("/create", create);

module.exports = router;
