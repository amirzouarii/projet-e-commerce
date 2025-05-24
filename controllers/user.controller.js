const User = require("../model/User");

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const listUsers = await User.find();
        res.status(200).json({
            success: {msg:"Liste de tous les utilisateurs"},
            listUsers,
            
        });
    } catch (error) {
        res.status(500)
        .json({
            
            errors: {msg:"Erreur lors de la récupération des utilisateurs"}
        });
    }
};

// Récupérer un utilisateur par ID
exports.getOneUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToGet = await User.findById(id);
        if (!userToGet) {
            return res.status(404).json({
                errors: {msg : "Utilisateur non trouvé"},
               
            });
        }
        res.status(200).json({
            success:{ msg: "Utilisateur trouvé"},
            
            userToGet
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erreur lors de la récupération de l'utilisateur",
            error: error.message
        });
    }
};

// Supprimer un utilisateur par ID
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const UserToDelete = await User.findByIdAndDelete(id);
        if ( !UserToDelete) {
            return res.status(404).json({
                errors:{msg: "Utilisateur non trouvé"},
               
            });
        }
        res.status(200).json({
            success: {msg: "Utilisateur supprimé avec succès"},
            UserToDelete,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            errors: { msg: "Erreur lors de la suppression de l'utilisateur" },
            
        });
    }
};
