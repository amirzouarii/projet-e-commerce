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
            type: mongoose.Schema.Types.ObjectId,  // pour faire la relation entre les deux tables 
            ref: "User"
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },

        brand: {
            type: String,
            required: true,
        }
    }, {
        timestamps: true,
    }
);

//faire la relation avec JS
const Product = mongoose.model('Product', productSchema)

module.exports = Product;

