//import express

const express = require('express')
const { register, login } = require('../controllers/auth.controller')
const { registerValidator, validation, loginValidator } = require('../middleware/validator')
const isAuth = require('../middleware/isAuth')

const router = express.Router()


// creer une requete get pour faire un test de la route auth
router.get('/test',(req, res) => {
    // Tu envoies une réponse au format JSON 
    res.json('Ceci est un test du route auth')
})

// register 
// registerValidator() → retourne un tableau => besoin de l’exécuter
router.post('/register', registerValidator(), validation,     register)

//login
// login → est une fonction directement, pas besoin d’appeler
router.post('/login' ,loginValidator(), validation , login)

//curent = l'utilisateur est connecté
router.get('/current', isAuth ,(req,res)=> {
    res.json(req.user);
});

module.exports = router;