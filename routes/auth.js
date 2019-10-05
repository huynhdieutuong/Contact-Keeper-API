const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validates = require("../validates/auth");
const { getUser, login } = require("../controllers/auth");

// @route   GET api/auth
// @desc    Get logged user
// @access  Private
router.get("/", auth, getUser);

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post("/", validates.login, login);

module.exports = router;
