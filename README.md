# 📸 Photobooth Simple - Railway

Application photobooth ultra-simplifiée pour Railway.

## 🏗️ Structure du projet

```
photobooth-simple/
├── server.js           # Serveur Express (API + Frontend)
├── package.json        # Dépendances
├── railway.toml        # Config Railway
├── public/            
│   ├── index.html     # Interface utilisateur
│   └── admin.html     # Interface admin
└── uploads/           # Photos (créé automatiquement)
```

## 🚀 Déploiement sur Railway

### Option 1 : Via GitHub (RECOMMANDÉ)

1. **Créer un nouveau dépôt GitHub**
   - Créez un repo vide sur GitHub
   - Poussez ce code dedans

2. **Créer le projet sur Railway**
   - Allez sur [railway.app](https://railway.app)
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez votre repo
   - Railway détecte automatiquement la config

3. **C'est tout !** ✅
   - Railway build et déploie automatiquement
   - Votre URL sera : `https://votre-projet.up.railway.app`

### Option 2 : Depuis votre machine

1. **Supprimer l'ancien projet**
   - Sur Railway, supprimez tous les anciens services

2. **Créer la structure**
   ```bash
   mkdir photobooth-simple
   cd photobooth-simple
   ```

3. **Copier les fichiers**
   - `server.js`
   - `package.json`
   - `railway.toml`
   - Créer le dossier `public/` avec `index.html` et `admin.html`

4. **Initialiser Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

5. **Pusher sur GitHub et connecter à Railway**

## 📱 Utilisation

### Interface Utilisateur
- URL : `https://votre-projet.up.railway.app/`
- Prend 3 photos automatiquement
- Upload instantané

### Interface Admin
- URL : `https://votre-projet.up.railway.app/admin`
- Voir toutes les séries
- Supprimer les séries

## 🔧 Test en local

```bash
npm install
npm start
```

Puis ouvrir :
- http://localhost:8080 (interface utilisateur)
- http://localhost:8080/admin (interface admin)

## 🎯 Caractéristiques

✅ **1 seul service** : Backend + Frontend ensemble  
✅ **Pas de build** : HTML/CSS/JS vanilla  
✅ **Pas de variables d'env** : Tout fonctionne out-of-the-box  
✅ **Design glasscore** : Turquoise, bleu, gris  
✅ **Auto-upload** : Les photos partent automatiquement  
✅ **Gestion simple** : 50 dernières séries gardées  

## 🐛 Dépannage

**Le site ne charge pas ?**
- Vérifiez les logs Railway
- Assurez-vous que le port est bien `process.env.PORT`

**La caméra ne fonctionne pas ?**
- Utilisez HTTPS (Railway fournit HTTPS automatiquement)
- Autorisez l'accès caméra dans le navigateur

**Les photos ne s'uploadent pas ?**
- Vérifiez les logs serveur
- Testez l'endpoint : `https://votre-projet.up.railway.app/api/health`

## 📝 API Endpoints

- `GET /` - Interface utilisateur
- `GET /admin` - Interface admin
- `GET /api/health` - Health check
- `POST /api/upload` - Upload des photos
- `GET /api/series` - Liste des séries
- `DELETE /api/series/:id` - Supprimer une série

## 🎨 Design

Le design utilise un thème **glasscore** avec :
- Fond : Dégradé bleu foncé (#0a0e27 → #1a1f3a)
- Accent : Turquoise (#40E0D0, #00CED1)
- Glassmorphisme avec backdrop-filter
- Bordures et ombres lumineuses

## ⚠️ Important

- Les photos sont stockées en **mémoire** (perdues au redémarrage)
- Pour persister : ajoutez un stockage S3/Cloudinary
- Limite : 50 séries maximum (configurable dans `server.js`)
- Taille max photo : 10MB"# ph0t0b00th" 
