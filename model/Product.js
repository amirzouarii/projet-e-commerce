const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
            unique: true,
        },
        description:{
            type:String,
            
        },
        quantite:{
            type:Number,
        },
        image:{
            type:String,
            default: "https://img.freepik.com/photos-gratuite/boutique-vetements-boutique-vetements-cintre-boutique-moderne_1150-8886.jpg?semt=ais_hybrid&w=740"
        },
        price : Number,
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,  // pour faire la relation enbtre les deux tables 
            ref:"User"
        },
        brand: {
            type:String,
            required: true,
        }
    }, {
        timeseries: true,
    }
);

//faire la relation avec JS
const Product = mongoose.model("product", productSchema)

module.exports=Product;

