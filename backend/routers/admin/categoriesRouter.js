const express = require("express");
const { Router } = require("express");
const router = Router();
const categoriesController = require("../../controllers/admin/categoriesController");
const authHandler = require("../../middleware/authHandler");
const authRoleHandler = require("../../middleware/authRoleHandler");

router.get("/", authHandler, authRoleHandler("admin"), categoriesController.index);

router.post("/", authHandler, authRoleHandler("admin"), categoriesController.store);

router.delete("/:id", authHandler, authRoleHandler("admin"), categoriesController.destroy);

module.exports = router;
