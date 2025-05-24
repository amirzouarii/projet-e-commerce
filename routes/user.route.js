const express = require("express")
const { getAllUsers, deleteUser, getOneUser } = require("../controllers/user.controller")
const isAdmin = require("../middleware/isAdmin")

const router = express.Router()


router.get('/test',( req, res )=> {
    res.status(200).json({msg:"ceci est un test de user"})
} )


// seul admin peut lister users
router.get('/allUsers',isAdmin , getAllUsers);

//l'admin delet one user
router.delete('/deletUser/:id', isAdmin, deleteUser )

router.get('/:id', isAdmin , getOneUser)





module.exports = router;