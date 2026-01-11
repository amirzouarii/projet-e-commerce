# Projet E‑commerce

**Description**

Application e‑commerce full‑stack développée en **Node.js**, **Express** et **MongoDB** côté backend, et **React** + **Redux** côté frontend. Elle permet la gestion des utilisateurs (inscription/connexion), la gestion des produits (CRUD pour les administrateurs), l'ajout et la gestion d'un panier

**Fonctionnalités principales**

- Authentification avec JWT (inscription / connexion) 🔐
- Gestion des produits (ajout, édition, suppression, liste) 🛍️
- Panier d'achat (ajout / suppression / mise à jour) 🧾
- Pages publiques (catalogue, détail produit) et pages restreintes (profil, dashboard) 👤
- Notifications via toasts et interface responsive 📱

**Tech stack**

- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React, Redux, React Router
- Auth: JSON Web Tokens (JWT)
- Autres: Axios, Bootstrap, React-Bootstrap

**Installation & Lancement**

1. Cloner le dépôt:

   ```bash
   git clone <url-du-depot>
   cd projet-e-commerce
   ```

2. Backend (dossier racine):

   ```bash
   npm install
   # créer un fichier .env contenant MONGO_URI et JWT_SECRET (et éventuellement PORT)
   node server.js        # ou `npx nodemon server.js` si vous avez nodemon
   ```

3. Frontend (dossier `client`):

```bash
cd client
npm install
npm start
```

Le client tourne par défaut sur `http://localhost:3000` et l'API sur le port défini dans `.env` (par défaut `process.env.PORT` ou `7666`).

---

## ⚙️ Commandes utiles

- Démarrer le backend : `node server.js` ou `npx nodemon server.js`
- Démarrer le frontend : `cd client && npm start`
- Construire le frontend pour la production : `cd client && npm run build`

---

## 🔌 Endpoints principaux

- `/api/auth` → inscription / connexion
- `/api/user` → gestion utilisateurs (admin)
- `/api/product` → gestion produits
- `/api/panier` → gestion du panier

(Consultez les fichiers dans `routes/` pour la liste complète des endpoints et validations.)

---




