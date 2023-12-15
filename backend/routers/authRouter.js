const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const { checkSchema } = require("express-validator");
const { checkValidity } = require("../middleware/validator");
const userLogin = require("../validations/userLogin");


router.post("/login", checkSchema(userLogin), checkValidity, authController.login);
router.post("/verify-token", authController.verifyToken);

module.exports = router;
