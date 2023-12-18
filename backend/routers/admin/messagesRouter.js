const express = require("express");
const { Router } = require("express");
const router = Router();
const messagesController = require("../../controllers/admin/messagesController");
const authHandler = require("../../middleware/authHandler");
const authRoleHandler = require("../../middleware/authRoleHandler");

router.get("/",
	authHandler,
	authRoleHandler("admin"),
	messagesController.index);

router.delete("/:id",
	authHandler,
	authRoleHandler("admin"),
	messagesController.destroy);

module.exports = router;
