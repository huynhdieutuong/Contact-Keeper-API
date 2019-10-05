const { check } = require("express-validator");

module.exports.login = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists()
];
