const { check } = require("express-validator");

module.exports.createContact = [
  check("name", "Name is required")
    .not()
    .isEmpty(),
  check("type", "Type must be personal or professional").isIn([
    "personal",
    "professional"
  ])
];
