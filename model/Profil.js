const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // lien 1-1 avec User
  fullName: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  preferences: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
