const express = require('express')
const { addProduct, getAllProd, getOneProduct, myProduct, editProd, suppProd } = require('../controllers/product.controller')
const isAuth = require('../middleware/isAuth')






const router =express.Router()

//test 
router.get('/test', (req,res) => {
    res.status(200).json("Route produit fonctionne ")
})

router.post('/addProd', //celui du controlleur  
    isAuth , addProduct
    );

router.get('/getAllProd', getAllProd);

router.get('/myProd', isAuth , myProduct);


// /:id est la derniere 
router.get('/:id', getOneProduct )

router.put('/:id',isAuth , editProd)

router.delete('/:id', isAuth, suppProd)







module.exports=router