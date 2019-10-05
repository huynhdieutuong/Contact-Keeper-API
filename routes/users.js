const express = require("express");
const router = express.Router();

const validates = require("../validates/users");
const { register } = require("../controllers/users");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post("/", validates.register, register);

module.exports = router;
