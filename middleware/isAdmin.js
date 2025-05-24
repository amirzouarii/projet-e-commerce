const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({ errors: [{ msg: "Pas de token fourni" }] });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findById(decoded.id);

        if (!foundUser) {
            return res.status(404).json({ errors: [{ msg: "Utilisateur introuvable" }] });
        }

        if (!foundUser.isAdmin) {
            return res.status(403).json({ errors: [{ msg: "Accès refusé : admin uniquement" }] });
        }

        req.user = foundUser; // Attache l'utilisateur à la requête
        next(); // Poursuit l'exécution

    } catch (error) {
        return res.status(500).json({ errors: [{ msg: "Erreur d'authentification", error: error.message }] });
    }
};

module.exports = isAdmin;
