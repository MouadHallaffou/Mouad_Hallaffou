# 🚀 Portfolio Dynamique - Full Stack

Un portfolio moderne et dynamique avec dashboard admin, construit avec React, TypeScript, Node.js, Express et MongoDB.

## ✨ Fonctionnalités

### 🎨 Frontend
- **Interface moderne** avec React 18 + TypeScript
- **Design responsive** avec Tailwind CSS
- **Animations fluides** avec Framer Motion
- **Thème sombre/clair** automatique
- **Composants réutilisables** avec shadcn/ui

### 🔧 Backend
- **API REST** avec Node.js + Express
- **Base de données** MongoDB avec Mongoose
- **Authentification JWT** sécurisée
- **Validation des données** complète
- **Upload de fichiers** avec gestion d'images

### 👨‍💼 Dashboard Admin
- **Gestion des compétences** (Skills)
- **Gestion des projets** avec images
- **Gestion des messages** de contact
- **Statistiques en temps réel**
- **Interface intuitive** et moderne

## 🏗️ Architecture

```
Portfolio_React(Ts)/
├── 📁 backend/                 # API Node.js/Express
│   ├── models/                # Modèles MongoDB
│   ├── routes/                # Routes API
│   ├── middleware/            # Auth & Validation
│   └── scripts/               # Scripts utilitaires
├── 📁 src/                    # Frontend React
│   ├── components/            # Composants React
│   ├── pages/                # Pages de l'application
│   ├── hooks/                 # Hooks personnalisés
│   ├── services/              # Services API
│   ├── types/                 # Types TypeScript
│   └── utils/                 # Utilitaires
└── 📁 docs/                   # Documentation
```

## 🚀 Installation Rapide

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- Git

### 1. Cloner le projet
```bash
git clone <your-repo-url>
cd Portfolio_React(Ts)
```

### 2. Configuration Backend
```bash
cd backend
npm install
cp env.example .env
# Éditer .env avec vos configurations
```

### 3. Configuration Frontend
```bash
cd ..
npm install
cp env.example .env
# Éditer .env avec vos configurations
```

### 4. Démarrer le développement
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## 🔧 Configuration

### Variables d'environnement Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio_db
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
ADMIN_EMAIL=your_email@domain.com
ADMIN_PASSWORD=your_secure_password
FRONTEND_URL=http://localhost:5173
```

### Variables d'environnement Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Portfolio Admin
```

## 📊 Utilisation

### Accès
- **Portfolio** : http://localhost:5173
- **Admin** : http://localhost:5173/admin/login
- **API** : http://localhost:5000/api

### Credentials Admin
- **Email** : Votre email configuré
- **Password** : Votre mot de passe configuré

## 🛠️ Scripts Disponibles

### Développement
```bash
npm run dev          # Démarrer le frontend
cd backend && npm run dev  # Démarrer le backend
```

### Production
```bash
npm run build        # Build du frontend
cd backend && npm start    # Démarrer le backend
```

### Utilitaires
```bash
./start-dev.sh       # Script de configuration automatique
./deploy-aws.sh      # Script de déploiement AWS EC2
```

## 🌐 Déploiement

### Déploiement Local
1. Configurer MongoDB
2. Lancer `./start-dev.sh`
3. Accéder aux URLs mentionnées

### Déploiement AWS EC2
1. Configurer les variables dans `deploy-aws.sh`
2. Lancer `./deploy-aws.sh`
3. Configurer le domaine et SSL

## 📚 Documentation

- [Guide d'installation complet](PORTFOLIO_SETUP.md)
- [Structure du projet](PROJECT_STRUCTURE.md)
- [API Documentation](docs/API.md)

## 🧪 Tests

```bash
# Tests backend
cd backend
npm test

# Tests frontend
npm test
```

## 🔒 Sécurité

- Authentification JWT sécurisée
- Validation des entrées utilisateur
- Protection CORS configurée
- Rate limiting implémenté
- Sanitisation des données

## 📈 Performance

- Lazy loading des composants
- Code splitting automatique
- Optimisation des images
- Caching intelligent
- Compression gzip

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Changelog

Voir [CHANGELOG.md](CHANGELOG.md) pour l'historique des versions.

## 📄 Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE) pour plus de détails.

## 👨‍💻 Auteur

**Mouad Hallaffou**
- Email: mouadhallaffou@gmail.com
- GitHub: [@MouadHallaffou](https://github.com/MouadHallaffou)
- LinkedIn: [hallaffou-mouad](https://linkedin.com/in/hallaffou-mouad)

## 🙏 Remerciements

- [React](https://reactjs.org/) - Framework UI
- [TypeScript](https://www.typescriptlang.org/) - Typage statique
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [MongoDB](https://www.mongodb.com/) - Base de données
- [Express.js](https://expressjs.com/) - Framework Node.js

---

⭐ N'hésitez pas à donner une étoile si ce projet vous a aidé !