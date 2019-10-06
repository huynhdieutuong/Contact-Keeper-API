const { validationResult } = require("express-validator");

const Contact = require("../models/Contact");

module.exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports.createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;
  try {
    const newContact = new Contact({
      user: req.user.id,
      name,
      email,
      phone,
      type
    });
    const contact = await newContact.save();
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports.updateContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not Authorized" });

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, type },
      {
        new: true
      }
    );

    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not Authorized" });

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: "Contact removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
