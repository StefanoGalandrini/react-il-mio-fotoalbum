const express = require("express");
const router = express.Router();
const photosController = require("../../controllers/admin/photosController");

// Configurazione di Multer
const multer = require("multer");
const storage = multer.diskStorage({
	destination: (req, file, cb) =>
	{
		cb(null, "uploads/");
	},
	filename: (req, file, cb) =>
	{
		cb(null, Date.now() + "_" + file.originalname);
	}
});
const upload = multer({ storage: storage });


const { checkSchema } = require("express-validator");

const { checkValidity } = require("../../middleware/validator");
const photosCreate = require("../../validations/photosCreate");
const photosUpdate = require("../../validations/photosUpdate");
const authHandler = require("../../middleware/authHandler");
const authRoleHandler = require("../../middleware/authRoleHandler");

router.get("/",
	authHandler,
	photosController.index);
router.post("/",
	upload.single("image"),
	authHandler,
	checkSchema(photosCreate),
	checkValidity,
	photosController.create);
router.get("/:id", photosController.show);
router.patch("/:id",
	upload.single("image"),
	authHandler,
	authRoleHandler("admin"),
	checkSchema(photosUpdate),
	checkValidity,
	photosController.update);
router.delete("/:id", photosController.destroy);

module.exports = router;
