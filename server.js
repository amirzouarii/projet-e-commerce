//le premier fichier de l'application :
//01 import (require)

//01 importer  expresse
const express = require('express');
//importer dotenv
require("dotenv").config()
//importer mongoose
const connectDB = require('./config/connectDB')
connectDB()

//02 instance de expresse
const app= express()



//"Toutes les requêtes qui contiennent du JSON dans le corps (body),
// je veux que tu les décryptes automatiquement"
app.use(express.json()) //por faire le update / get ...
//Quand une requête commence par /api/auth, je veux que tu utilises le fichier 
// auth.route.js pour gérer la suite"
///api/auth → c’est un chemin global qu’on applique à un fichier de routes.







app.use("/api/auth", require('./routes/auth.route'))

//route pour manipuler les users par admin
app.use("/api/user", require('./routes/user.route'))

//route pour la manipulation des produit
app.use("/api/product", require('./routes/product.route'))



//route pour le panier
app.use("/api/panier" , require('./routes/panier.route'))

app.use("/api/category", require('./routes/category.route'));


app.use('/api/profile', require('./routes/profil.route'));


app.use((req,res) => {
    res.send("API is running ...")
})

//03 PORT
const PORT = process.env.PORT || 7666
//04 Activer le port (listen): C’est la méthode qui démarre le serveur Express.
//app.listen(port, callback)
app.listen(PORT, (err)=>{
    err? console.log(err) : console.log(`Le serveur est a l'ecoute sur le port: http://localhost:${PORT}`);
} )


















