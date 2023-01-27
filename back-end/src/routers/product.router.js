const express = require('express');

const productController = require('../controllers/products.controller');
// const authMiddleware = require('../middlewares/auth.middleware'); // adicionar middleware

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

module.exports = router;

// branch Liz