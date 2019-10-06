const express = require("express");
const router = express.Router();

const {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} = require("../controllers/contacts");
const validates = require("../validates/contacts");

// @route   GET api/contacts
// @desc    Get all contacts
// @access  Private
router.get("/", getContacts);

// @route   POST api/contacts
// @desc    Create a contact
// @access  Private
router.post("/", validates.createContact, createContact);

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put("/:id", validates.createContact, updateContact);

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete("/:id", deleteContact);

module.exports = router;
