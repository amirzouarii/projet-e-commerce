const Profile = require('../model/Profil');
const User = require('../model/User');

// Créer un profil
exports.createProfile = async (req, res) => {
  try {
    const { fullName, address, phone, preferences } = req.body;
    const userId = req.user?._id || req.body.userId; // prefer user from token

    if (!userId) return res.status(400).json({ message: 'userId manquant' });

    // Vérifier si le profil existe déjà
    const existingProfile = await Profile.findOne({ user: userId });
    if (existingProfile) return res.status(400).json({ message: "Profil déjà existant" });

    const profile = new Profile({ user: userId, fullName, address, phone, preferences });
    await profile.save();

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer le profil d'un utilisateur
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.userId })
      .populate('user', 'name email phone isAdmin'); // ajoute les infos de l'utilisateur
    if (!profile) return res.status(404).json({ message: "Profil non trouvé" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un profil
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: "Profil non trouvé" });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
