# 🚀 Guide de Démarrage Rapide - Portfolio Dynamique

---

## 📋 Table des Matières

1. [Architecture Complète](#architecture-complète)
2. [Prérequis](#prérequis)
3. [Installation Backend](#installation-backend)
4. [Installation Frontend](#installation-frontend)
5. [Configuration MongoDB](#configuration-mongodb)
6. [Déploiement](#déploiement)
7. [Diagrammes](#diagrammes)
8. [FAQ](#faq)

---

## 🏗️ Architecture Complète

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│                     React + TypeScript                       │
│                         Port: 5173                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS (REST API)
                     │ JSON
                     │
┌────────────────────▼────────────────────────────────────────┐
│                     API GATEWAY                              │
│                   Spring Boot Backend                        │
│                       Port: 8080                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   Controllers (REST Endpoints)                        │  │
│  │   - AuthController                                    │  │
│  │   - SkillController                                   │  │
│  │   - ProjectController                                 │  │
│  │   - ContactController                                 │  │
│  │   - PortfolioPublicController                         │  │
│  └─────────────────┬────────────────────────────────────┘  │
│                    │                                         │
│  ┌─────────────────▼────────────────────────────────────┐  │
│  │   Services (Business Logic)                          │  │
│  │   - SkillService, ProjectService, etc.               │  │
│  └─────────────────┬────────────────────────────────────┘  │
│                    │                                         │
│  ┌─────────────────▼────────────────────────────────────┐  │
│  │   Repositories (Data Access Layer)                   │  │
│  │   - MongoRepository interfaces                       │  │
│  └─────────────────┬────────────────────────────────────┘  │
│                    │                                         │
│  ┌─────────────────▼────────────────────────────────────┐  │
│  │   Security Layer (JWT Authentication)                │  │
│  │   - JwtTokenProvider                                 │  │
│  │   - JwtAuthenticationFilter                          │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ MongoDB Driver
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   MongoDB Atlas                              │
│                  (Cloud Database)                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │   Collections:                                        │  │
│  │   - users                                             │  │
│  │   - skills                                            │  │
│  │   - projects                                          │  │
│  │   - education                                         │  │
│  │   - certifications                                    │  │
│  │   - contact_messages                                  │  │
│  │   - about_cards                                       │  │
│  │   - stats                                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Prérequis

### Backend
- ✅ **Java 17+** (JDK)
- ✅ **Maven 3.8+** ou **Gradle**
- ✅ **IDE**: IntelliJ IDEA, Eclipse, ou VS Code

### Frontend
- ✅ **Node.js 18+** ou **Bun**
- ✅ **npm/yarn/bun**
- ✅ **IDE**: VS Code, WebStorm

### Base de Données
- ✅ **MongoDB Atlas** (gratuit) ou **MongoDB local**

### Outils Recommandés
- ✅ **Postman** ou **Insomnia** (test API)
- ✅ **MongoDB Compass** (visualisation DB)
- ✅ **Git**

---

## 🔧 Installation Backend (Spring Boot)

### Étape 1: Créer le Projet

#### Option A: Spring Initializr (Web)
1. Aller sur [https://start.spring.io/](https://start.spring.io/)
2. Configuration:
    - **Project**: Maven
    - **Language**: Java
    - **Spring Boot**: 3.2.x
    - **Group**: com.portfolio
    - **Artifact**: backend
    - **Packaging**: Jar
    - **Java**: 17

3. **Dépendances à ajouter**:
    - Spring Web
    - Spring Data MongoDB
    - Spring Security
    - Validation
    - Spring Boot DevTools
    - Lombok

4. Cliquer sur **Generate** et télécharger le projet

#### Option B: Via IDE (IntelliJ IDEA)
1. File → New → Project
2. Choisir "Spring Initializr"
3. Suivre les mêmes configurations

### Étape 2: Structure du Projet

```bash
cd backend
mkdir -p src/main/java/com/portfolio/backend/{model,repository,service,controller,dto,config,security,exception,util}
```

### Étape 3: Configuration

**src/main/resources/application.properties**
```properties
# Server
server.port=8080

# MongoDB
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/portfolio
spring.data.mongodb.database=portfolio

# JWT
app.jwt.secret=VotreSecretKeyTresLongueEtSecuriseePourJWT256Bits
app.jwt.expiration=86400000

# CORS
app.cors.allowed-origins=http://localhost:5173

# Logging
logging.level.com.portfolio.backend=DEBUG
```

### Étape 4: Ajouter les Dépendances Supplémentaires

**pom.xml** - Ajouter après les dépendances Spring:
```xml
<!-- JWT -->
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
    <scope>runtime</scope>
</dependency>

<!-- ModelMapper -->
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>3.1.1</version>
</dependency>

<!-- Swagger -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

### Étape 5: Créer les Classes

Suivez les exemples de code dans `EXEMPLES_CODE_BACKEND.md`:
1. Créer les **Models** (User, Skill, Project, etc.)
2. Créer les **Repositories**
3. Créer les **DTOs**
4. Créer les **Services**
5. Créer les **Controllers**
6. Configurer la **Security**
7. Créer le **GlobalExceptionHandler**

### Étape 6: Lancer le Backend

```bash
# Avec Maven
./mvnw spring-boot:run

# Ou avec Gradle
./gradlew bootRun
```

Le backend sera disponible sur: **http://localhost:8080**

Swagger UI: **http://localhost:8080/swagger-ui.html**

---

## 🎨 Installation Frontend (React + TypeScript)

### Étape 1: Votre Projet Existe Déjà ✅

Vous avez déjà le projet React TypeScript avec tous les composants.

### Étape 2: Installer Axios

```bash
cd Portfolio_React(Ts)

# Avec npm
npm install axios

# Ou avec bun
bun add axios
```

### Étape 3: Créer la Structure des Services

```bash
mkdir -p src/{services,types,hooks,contexts,pages/admin}
```

### Étape 4: Créer les Fichiers

Créez les fichiers suivants en utilisant le code de `INTEGRATION_FRONTEND_API.md`:

**1. Types**
```bash
src/types/
├── User.ts
├── Skill.ts
├── Project.ts
├── Education.ts
├── Certification.ts
├── ContactMessage.ts
└── index.ts
```

**2. Services**
```bash
src/services/
├── api.ts
├── authService.ts
├── skillService.ts
├── projectService.ts
├── contactService.ts
└── portfolioService.ts
```

**3. Hooks**
```bash
src/hooks/
├── useAuth.ts
├── useSkills.ts
└── useProjects.ts
```

**4. Context (optionnel)**
```bash
src/contexts/
└── AuthContext.tsx
```

### Étape 5: Configuration Variables d'Environnement

**.env.development**
```env
VITE_API_URL=http://localhost:8080/api
```

**.env.production**
```env
VITE_API_URL=https://votre-backend.com/api
```

### Étape 6: Modifier les Composants Existants

Modifiez vos composants pour utiliser les hooks et services API:
- `src/components/Skills.tsx`
- `src/components/Projects.tsx`
- `src/components/Contact.tsx`
- etc.

### Étape 7: Lancer le Frontend

```bash
# Avec npm
npm run dev

# Ou avec bun
bun run dev
```

Le frontend sera disponible sur: **http://localhost:5173**

---

## 🗄️ Configuration MongoDB

### Option 1: MongoDB Atlas (Recommandé - Gratuit)

#### Étape 1: Créer un Compte
1. Aller sur [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. S'inscrire gratuitement

#### Étape 2: Créer un Cluster
1. Choisir **M0 Sandbox** (Free Forever)
2. Sélectionner un provider (AWS, Google Cloud, Azure)
3. Choisir une région proche de vous
4. Nommer le cluster: `portfolio-cluster`
5. Cliquer sur **Create Cluster**

#### Étape 3: Créer un Utilisateur Database
1. Aller dans **Database Access**
2. Cliquer sur **Add New Database User**
3. Choisir **Password Authentication**
4. Username: `portfolio_user`
5. Password: Générer un mot de passe fort
6. **Database User Privileges**: Atlas admin
7. Cliquer sur **Add User**

#### Étape 4: Configurer le Network Access
1. Aller dans **Network Access**
2. Cliquer sur **Add IP Address**
3. Choisir **Allow Access from Anywhere** (0.0.0.0/0)
    - Pour production, restreindre aux IPs spécifiques
4. Cliquer sur **Confirm**

#### Étape 5: Obtenir la Connection String
1. Aller dans **Database** → **Connect**
2. Choisir **Connect your application**
3. Copier la connection string:
   ```
   mongodb+srv://portfolio_user:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Remplacer `<password>` par votre mot de passe
5. Ajouter le nom de la base: `/portfolio` avant les paramètres

**Connection String Finale**:
```
mongodb+srv://portfolio_user:VotreMotDePasse@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

#### Étape 6: Utiliser dans application.properties
```properties
spring.data.mongodb.uri=mongodb+srv://portfolio_user:VotreMotDePasse@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Option 2: MongoDB Local

#### Installation
```bash
# Windows (avec Chocolatey)
choco install mongodb

# macOS
brew tap mongodb/brew
brew install mongodb-community

# Linux (Ubuntu)
sudo apt-get install mongodb
```

#### Démarrer MongoDB
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

#### Configuration
```properties
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=portfolio
```

---

## 📊 Diagrammes

### Diagramme de Flux d'Authentification

```
┌──────────┐                                      ┌──────────┐
│          │  1. POST /api/auth/register          │          │
│          ├─────────────────────────────────────►│          │
│          │     {email, password, ...}           │          │
│          │                                      │          │
│  Client  │  2. 201 Created                      │  Backend │
│  (React) │◄─────────────────────────────────────┤  (Spring │
│          │     {success: true}                  │   Boot)  │
│          │                                      │          │
│          │  3. POST /api/auth/login             │          │
│          ├─────────────────────────────────────►│          │
│          │     {email, password}                │          │
│          │                                      │          │
│          │  4. 200 OK                           │          │
│          │◄─────────────────────────────────────┤          │
│          │     {token, user}                    │          │
│          │                                      │          │
│          │  5. Store token in localStorage     │          │
│          │                                      │          │
│          │  6. GET /api/skills                  │          │
│          ├─────────────────────────────────────►│          │
│          │     Header: Bearer <token>           │          │
│          │                                      │          │
│          │  7. 200 OK                           │          │
│          │◄─────────────────────────────────────┤          │
│          │     [{skill1}, {skill2}, ...]        │          │
└──────────┘                                      └──────────┘
```

### Diagramme de Flux CRUD

```
┌──────────┐                                      ┌──────────┐                    ┌──────────┐
│          │  1. POST /api/projects               │          │  2. Save to DB     │          │
│  Client  ├─────────────────────────────────────►│  Backend ├───────────────────►│ MongoDB  │
│          │     {title, description, ...}        │          │                    │          │
│          │     Header: Bearer <token>           │          │                    │          │
│          │                                      │          │  3. Return saved   │          │
│          │  4. 201 Created                      │          │◄───────────────────┤          │
│          │◄─────────────────────────────────────┤          │     {project}      │          │
│          │     {id, title, ...}                 │          │                    │          │
│          │                                      │          │                    │          │
│          │  5. PUT /api/projects/{id}           │          │  6. Update in DB   │          │
│          ├─────────────────────────────────────►│          ├───────────────────►│          │
│          │     {title: "New Title"}             │          │                    │          │
│          │                                      │          │  7. Return updated │          │
│          │  8. 200 OK                           │          │◄───────────────────┤          │
│          │◄─────────────────────────────────────┤          │     {project}      │          │
│          │     {id, title: "New Title", ...}    │          │                    │          │
│          │                                      │          │                    │          │
│          │  9. DELETE /api/projects/{id}        │          │  10. Delete from DB│          │
│          ├─────────────────────────────────────►│          ├───────────────────►│          │
│          │                                      │          │                    │          │
│          │  11. 200 OK                          │          │  12. Confirm       │          │
│          │◄─────────────────────────────────────┤          │◄───────────────────┤          │
│          │     {success: true}                  │          │                    │          │
└──────────┘                                      └──────────┘                    └──────────┘
```

### Diagramme de Classes Simplié

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ - id: String        │
│ - email: String     │
│ - username: String  │
│ - password: String  │
│ - firstName: String │
│ - lastName: String  │
│ - socialLinks: Obj  │
├─────────────────────┤
│ + getFullName()     │
└──────────┬──────────┘
           │
           │ 1:N
           │
           ▼
┌─────────────────────┐
│       Skill         │
├─────────────────────┤
│ - id: String        │
│ - userId: String    │────┐
│ - name: String      │    │
│ - level: Integer    │    │
│ - category: String  │    │
│ - icon: String      │    │
│ - color: String     │    │
└─────────────────────┘    │
                           │
           ┌───────────────┘
           │
           │ 1:N
           │
           ▼
┌─────────────────────┐
│      Project        │
├─────────────────────┤
│ - id: String        │
│ - userId: String    │
│ - title: String     │
│ - description: Text │
│ - image: String     │
│ - githubUrl: String │
│ - demoUrl: String   │
│ - technologies: []  │
│ - featured: Boolean │
└─────────────────────┘
```

---

## 🚀 Déploiement

### Backend (Spring Boot)

#### Option 1: Railway.app (Recommandé)
1. Créer un compte sur [Railway.app](https://railway.app)
2. Connecter votre repository GitHub
3. Ajouter les variables d'environnement
4. Deploy automatique

#### Option 2: Render.com
1. Créer un compte sur [Render.com](https://render.com)
2. Créer un nouveau **Web Service**
3. Connecter votre repository
4. Build Command: `./mvnw clean package`
5. Start Command: `java -jar target/backend-0.0.1-SNAPSHOT.jar`

#### Option 3: Heroku
```bash
heroku create portfolio-backend
heroku config:set SPRING_DATA_MONGODB_URI=your-mongodb-uri
heroku config:set APP_JWT_SECRET=your-secret
git push heroku main
```

### Frontend (React)

#### Option 1: Vercel (Recommandé)
1. Installer Vercel CLI: `npm i -g vercel`
2. Dans le dossier du projet: `vercel`
3. Suivre les instructions
4. Configurer les variables d'environnement dans le dashboard

#### Option 2: Netlify
```bash
npm run build
# Drag & drop le dossier dist/ sur netlify.com
```

#### Option 3: GitHub Pages
```bash
npm run build
# Utiliser gh-pages pour déployer le dossier dist/
```

---

## ❓ FAQ

### Q: Pourquoi MongoDB et pas MySQL/PostgreSQL ?
**R:** MongoDB est NoSQL, flexible, parfait pour les portfolios avec des structures de données variées. Pas besoin de migrations complexes.

### Q: Est-ce que je dois créer un dashboard admin ?
**R:** Oui, pour gérer vos projets/compétences sans toucher à la base de données directement. Vous pouvez utiliser des composants shadcn/ui existants.

### Q: Comment sécuriser mon API en production ?
**R:**
- Utilisez HTTPS
- Configurez CORS correctement
- Utilisez des mots de passe forts
- Mettez à jour les dépendances régulièrement
- N'exposez jamais les secrets dans le code

### Q: Puis-je utiliser d'autres technologies ?
**R:** Oui ! Cette architecture est flexible:
- Backend: Node.js + Express, NestJS, Django
- Frontend: Next.js, Vue.js, Angular
- Database: PostgreSQL, MySQL

### Q: Comment gérer les images ?
**R:** Plusieurs options:
1. **Cloudinary** (recommandé) - gratuit jusqu'à 25 crédits/mois
2. **AWS S3**
3. **Base64** dans MongoDB (petit fichiers uniquement)
4. Serveur local avec Spring Boot

### Q: Combien coûte l'hébergement ?
**R:**
- MongoDB Atlas: **Gratuit** (M0 Cluster)
- Backend (Railway/Render): **Gratuit** (avec limitations)
- Frontend (Vercel/Netlify): **Gratuit**
- **Total: 0€** pour commencer !

### Q: Comment ajouter des fonctionnalités ?
**R:** Suivez le pattern:
1. Créer le Model
2. Créer le Repository
3. Créer le Service
4. Créer le Controller
5. Créer le Service Frontend
6. Créer le Hook
7. Utiliser dans les composants

---

## 📚 Ressources Supplémentaires

### Documentation Officielle
- [Spring Boot](https://spring.io/projects/spring-boot)
- [React](https://react.dev/)
- [MongoDB](https://docs.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Tutoriels Recommandés
- [Bezkoder - Spring Boot + MongoDB](https://www.bezkoder.com/spring-boot-mongodb-crud/)
- [Bezkoder - JWT Authentication](https://www.bezkoder.com/spring-boot-jwt-authentication/)
- [React Query Tutorial](https://tanstack.com/query/latest/docs/react/overview)

### Outils Utiles
- [MongoDB Compass](https://www.mongodb.com/products/compass) - GUI pour MongoDB
- [Postman](https://www.postman.com/) - Test API
- [Swagger Editor](https://editor.swagger.io/) - Documenter l'API

---

## 🎯 Prochaines Étapes

1. ✅ **Lire la documentation**: `CONCEPTION_BACKEND.md`
2. ✅ **Voir les exemples**: `EXEMPLES_CODE_BACKEND.md`
3. ✅ **Intégrer le frontend**: `INTEGRATION_FRONTEND_API.md`
4. ✅ **Suivre ce guide**: `GUIDE_DEMARRAGE.md`
5. 🚀 **Commencer à coder !**

---

**Bon développement ! 💪**

Si vous avez des questions, n'hésitez pas à consulter les ressources ou à demander de l'aide.

