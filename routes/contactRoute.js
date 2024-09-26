const express = require("express");
const {
  getContact,
  createContact,
  getContactWithId,
  updateContact,
  deleteContact,
} = require("../controllers/controller");
const router = express.Router();

router.route("/").get(getContact);

router.route("/").post(createContact);

router.route("/:id").get(getContactWithId);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;