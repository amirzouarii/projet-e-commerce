const jwt = require("jsonwebtoken");
const User = require("../model/User");

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ errors: [{ msg: "Token manquant" }] });
    }

    // Extraction du token depuis "Bearer <token>"
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    // Vérifie le token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Recherche de l'utilisateur dans la base de données
    const foundUser = await User.findById(decoded.id).select("-password");
    if (!foundUser) {
      return res.status(401).json({ errors: [{ msg: "Utilisateur introuvable" }] });
    }

    // Attache l'utilisateur à la requête
    req.user = foundUser;
    next();

  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ errors: [{ msg: "Token expiré. Veuillez vous reconnecter." }] });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ errors: [{ msg: "Token invalide." }] });
    }

    return res.status(500).json({ errors: [{ msg: "Erreur serveur lors de l'authentification." }] });
  }
};

module.exports = isAuth;
