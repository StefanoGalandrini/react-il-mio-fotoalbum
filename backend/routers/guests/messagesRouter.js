const express = require("express");
const router = express.Router();
const messagesController = require("../../controllers/guests/messagesController");

router.post("/", messagesController.sendMessage);

module.exports = router;
