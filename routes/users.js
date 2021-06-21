const express = require("express");
const router = express.Router();

const { signup, userExists } = require("../controllers/usersController");

router.post("/signup", signup);
router.get("/userexists", userExists);

module.exports = router;
