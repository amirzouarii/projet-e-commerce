const Product = require('../model/Product')
exports.addProduct = async(req,res) => {
    try {
        const newProduct= new Product({...req.body, addedBy: req.user.id})  //mettre le id dans addedBy
        await newProduct.save();
        res.status(200).json({msg:"Product added successfuly" , newProduct})
    } catch (error) {
        res.status(400).json(error);
    };
};


exports.getAllProd = async(req,res) => {
    try {
        const listProduct = await Product.find().populate('category', 'name').sort({ brand: 1 }); // tri alphabétique croissant

        res.status(200).json({msg:"la liste des produits :", listProduct})
    } catch (error) {
        res.status(400).json(error)
    }

}

exports.getOneProduct= async(req,res) => {
    try {
        const {id} = req.params;
        const ProdToGet = await Product.findById(id).populate('category', 'name');
        if(!ProdToGet) {
            return res.status(404).json({msg:"Produit non trouvé"})
        }
        res.status(200).json({msg:"le produit :", ProdToGet})

    } catch (error) {
        res.status(400).json(error)

    }
}


exports.myProduct= async(req,res) => {
    try {
        
        const myProdList = await Product.find({addedBy:req.user._id}).populate('category','name');
        res.status(200).json({msg:"la liste de mes produits :", myProdList})

    } catch (error) {
        res.status(400).json(error)

    }
}


//mise a jour produit par propriete 
exports.editProd= async(req,res) => {
    try {
        const {id} =req.params;
        const prodToEdit = await Product.findByIdAndUpdate(id , req.body, {new:true}); //si ne trouve pas mettre new produit
        if(prodToEdit.addedBy.toString() !== req.user._id.toString()) {
            return res.status(400).json({msg:"Tu n'as pas le droit d'editer ce produit"})
        }
        res.status(200).json({msg:"Produit edité avec succée :", prodToEdit})

    } catch (error) {
        res.status(400).json(error)

    }
}

exports.suppProd= async(req,res) => {
    try {
        const {id} = req.params;
        const prodToSupp = await Product.findByIdAndDelete(id);
        if(prodToSupp.addedBy.toString() !== req.user._id.toString()) {
            return res.status(400).json({msg:"Tu n'as pas le droit d'effacer ce produit"})
        }
        res.status(200).json({msg:"Produit supprimé avec succée :", prodToSupp})


    } catch (error) {
        res.status(400).json(error)
    }
}