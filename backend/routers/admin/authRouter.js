const express = require('express');
const router = express.Router();
const authController = require('../../controllers/admin/authController');

const authHandler = require('../../middleware/authHandler');
const authRoleHandler = require('../../middleware/authRoleHandler');


router.get('/me', authHandler, authRoleHandler("admin"), authController.me);

module.exports = router;
