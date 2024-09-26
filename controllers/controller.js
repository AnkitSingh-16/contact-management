const asynchandler = require("express-async-handler");
const Contact = require("../model/contactModel");

const getContact = asynchandler(async (req, res) => {
  const contacts = await Contact.find();
  console.log(contacts);
  res.status(201).json(contacts);
});

const createContact = asynchandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

const getContactWithId = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  
  res.status(200).json(contact);
});

const updateContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new : true}
  )
  res.status(200).json(updatedContact);
});

const deleteContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await Contact.findByIdAndRemove({ _id: req.params.id });
  res.status(200).json(contact);
  
});

module.exports = {
  getContact,
  createContact,
  getContactWithId,
  updateContact,
  deleteContact,
};
