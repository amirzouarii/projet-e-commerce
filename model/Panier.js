const mongoose = require('mongoose')

const panierSchema = new mongoose.Schema(
    {
        addedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
         items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product', 
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
      
    }
  ]
}, {
  timestamps: true
    }
);


const Panier = mongoose.model("panier" , panierSchema)

module.exports = Panier;