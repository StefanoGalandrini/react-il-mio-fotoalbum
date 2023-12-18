const express = require("express");
const router = express.Router();
const photosController = require("../../controllers/guests/photosController");
const authHandler = require("../../middleware/authHandler");

const { checkSchema } = require("express-validator");

const { checkValidity } = require("../../middleware/validator");
const photosCreate = require("../../validations/photosCreate");


router.get("/",
	photosController.index);

router.post("/",
	authHandler,
	checkSchema(photosCreate),
	checkValidity,
	photosController.create);

router.get("/:id", photosController.show);

module.exports = router;
