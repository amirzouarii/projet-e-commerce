const express = require('express')
const { addPanier, getPanier, clearPanier } = require('../controllers/panier.controller')
const isAuth = require('../middleware/isAuth')


const router = express.Router()


//test

router.get('/test', (req,res) => {
    res.status(200).json("Route fonctionne")
})

router.post('/addPanier',isAuth , addPanier )
router.get('/getPanier', isAuth , getPanier)
router.delete('/deleteP' , isAuth , clearPanier )

module.exports= router