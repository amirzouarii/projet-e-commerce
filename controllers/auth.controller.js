const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwb = require("jsonwebtoken")

exports.register = async(req, res) => {
    try {
        const {name, email, password, phone} = req.body
        const foundUser =await User.findOne({email})
        if(foundUser) return res
        .status(400)
        .json({errors:[{msg:" cet email existe deja"}]})

        const newUser = new User({name, email, password, phone})   //travailler avec le front

        // Hashage du mot de passe
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        newUser.password = hashPassword

        await newUser.save()

        // Creation du token
        const token = jwb.sign(
            {id:newUser._id},
            process.env.SECRET_KEY,
            {expiresIn:"1h"})

            res.status(201)
            .json({msg:"Utilisateur cree avec succes", user:newUser, token })
        
    } catch (error) {
        console.log(error)
        res.status(500)
        .json({errors:[{msg:"Erreur serveur"}]})
        
    }
}



exports.login = async(req,res) => {
    try {
        const {email , password} =req.body
        const foundUser = await User.findOne({email})
        if(!foundUser) {
            return res.status(400)
            .json({errors:[{msg:"l'email n'existe pas 1"}]})
        } 
        const checkPassword = await bcrypt.compare(password, foundUser.password)
        if(!checkPassword) {
            return res.status(400)
            .json({errors:[{msg:"l'email n'existe pas 2"}]})
        } 

        const token = jwb.sign(
            {id:foundUser._id},
            process.env.SECRET_KEY,
            {expiresIn:"1h"})
        res.status(200).json({succes: [{msg: "Login succes"}], user: foundUser, token})
        }
        
     catch (error) {
        console.log(error)
        res.status(500).json({errors:[{msg:"Erreur serveur"}]})
    }
}

