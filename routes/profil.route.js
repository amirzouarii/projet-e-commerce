const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const isAuth = require('../middleware/isAuth');

// Créer un profil (utilisateur connecté)
router.post('/', isAuth, profileController.createProfile);

// Récupérer le profil d'un utilisateur (utilisateur connecté ou admin)
router.get('/:userId', isAuth, profileController.getProfile);

// Mettre à jour le profil (utilisateur connecté)
router.put('/:userId', isAuth, profileController.updateProfile);

module.exports = router;