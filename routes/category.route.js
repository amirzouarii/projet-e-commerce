const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categorie.controller');
const isAdmin = require('../middleware/isAdmin');

// Créer une catégorie (admin seulement)
router.post('/', isAdmin, categoryController.createCategory);

// Récupérer toutes les catégories
router.get('/', categoryController.getCategories);

module.exports = router;
