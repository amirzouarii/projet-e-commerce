# Backend Dockerfile
# Utilise une image Node légère
FROM node:18-alpine

# Création du dossier de travail
WORKDIR /app

# Copier les fichiers de dépendances en premier (cache layer)
COPY package*.json ./

# Installer uniquement les dépendances de production
RUN npm install


# Copier le reste des fichiers
COPY . .

# Exposer le port défini par l'application
EXPOSE 7666

# Commande de démarrage
CMD ["node", "server.js"]
