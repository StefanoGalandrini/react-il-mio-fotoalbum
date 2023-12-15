const express = require('express');
const { Router } = require('express');
const router = Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/', categoriesController.index);

router.post('/', categoriesController.store);

router.delete('/:id', categoriesController.destroy);

module.exports = router;
