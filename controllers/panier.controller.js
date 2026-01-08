const Panier = require('../model/Panier')

exports.addPanier = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    // Chercher panier existant
    let panier = await Panier.findOne({ addedBy: userId });

    if (!panier) {
      // Créer panier si inexistant
      panier = new Panier({
        addedBy: userId,
        items: [{ productId, quantity }]
      });
    } else {
      // Si panier existe, vérifier si produit est déjà dans items
      const index = panier.items.findIndex(item => item.productId.toString() === productId);

      if (index > -1) {
        // Produit déjà dans panier, mise à jour quantité
        panier.items[index].quantity += quantity;
      } else {
        // Ajouter nouveau produit
        panier.items.push({ productId, quantity });
      }
    }

    // Sauvegarder panier
    await panier.save();

    // Envoyer panier complet (avec population si tu veux)
    const panierUpdated = await Panier.findById(panier._id).populate('items.productId');
    res.status(200).json(panierUpdated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout au panier", error });
  }
};

exports.getPanier = async (req, res) => {
  try {
    const userId = req.user.id;
    const panier = await Panier.findOne({ addedBy: userId }).populate('items.productId');

    if (!panier) {
      return res.status(404).json({ message: "Panier non trouvé" });
    }

    res.status(200).json(panier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération du panier", error });
  }
};


// Vider le panier de l'utilisateur connecté
exports.clearPanier = async (req, res) => {
  try {
    console.log("User dans clearPanier:", req.user);  // <-- Ajouté pour debug
    const userId = req.user.id;

    // correction : rechercher par `addedBy` pour être cohérent avec le schéma
    const panier = await Panier.findOne({ addedBy: userId });
    if (!panier) return res.status(404).json({ msg: "Panier introuvable" });

    panier.items = [];
    await panier.save();

    res.status(200).json({ msg: "Panier vidé avec succès" });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
};
