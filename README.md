# Photobooth Simple 📸

> Application photobooth web ultra-simple : 3 photos prises automatiquement depuis la caméra du navigateur, envoyées sur le serveur et consultables dans une interface admin avec diaporama.

![Platform](https://img.shields.io/badge/platform-Web-informational) ![Stack](https://img.shields.io/badge/stack-Node.js%20%2B%20Express-blue) ![Deploy](https://img.shields.io/badge/deploy-Railway-8A2BE2)

## À propos

Photobooth Simple tient en un seul service Node.js qui sert à la fois l'API et le frontend (HTML/CSS/JS vanilla, sans build). Les participants lancent une séance depuis la page d'accueil, l'admin retrouve les séries de photos sur `/admin`. Le projet est pensé pour être déployé sur Railway sans aucune variable d'environnement.

## Fonctionnalités

- **Séance automatique** : compte à rebours de 3 secondes avant chacune des 3 photos, prises avec la caméra frontale
- **Recadrage centré** en 1080 x 1350 sans déformation
- **Aperçu** avant envoi, avec boutons « Recommencer » et « Envoyer les photos »
- **Interface admin** (`/admin`) : liste des séries rafraîchie toutes les 10 secondes, suppression d'une série, diaporama plein écran (précédent / pause / suivant)
- **Gestion simple** : seules les 50 dernières séries sont gardées, les plus anciennes sont supprimées
- **1 seul service**, **pas de build**, **pas de variables d'environnement**
- **Design glasscore** : dégradé bleu foncé (#0a0e27 → #1a1f3a), accent turquoise (#40E0D0, #00CED1), glassmorphisme avec `backdrop-filter`, bordures et ombres lumineuses

## Installation

### Test en local

```bash
npm install
npm start
```

Puis ouvrir :

- http://localhost:8080 (interface utilisateur)
- http://localhost:8080/admin (interface admin)

Le port est `process.env.PORT`, ou 8080 par défaut.

### Déploiement sur Railway

**Via GitHub (recommandé)**

1. Pousser ce code dans un repo GitHub.
2. Sur [railway.app](https://railway.app) : « New Project » → « Deploy from GitHub repo » → choisir le repo.
3. Railway détecte la configuration ([`railway.toml`](railway.toml) : Nixpacks, `node server.js`) puis build et déploie automatiquement. L'URL sera du type `https://votre-projet.up.railway.app`.

**Depuis votre machine**

1. Sur Railway, supprimer les anciens services éventuels.
2. Créer un dossier et y copier `server.js`, `package.json`, `railway.toml` et le dossier `public/` (`index.html`, `admin.html`).
3. `git init && git add . && git commit -m "Initial commit"`
4. Pousser sur GitHub et connecter le repo à Railway.

## Utilisation

- **Interface utilisateur** : `https://votre-projet.up.railway.app/` : autoriser la caméra, cliquer sur « Démarrer la séance », puis envoyer les photos.
- **Interface admin** : `https://votre-projet.up.railway.app/admin` : voir toutes les séries, les supprimer, lancer le diaporama.

### API

| Méthode | Route | Rôle |
| --- | --- | --- |
| `GET` | `/` | Interface utilisateur |
| `GET` | `/admin` | Interface admin |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/upload` | Upload des photos (champ `photos`, 3 max) |
| `GET` | `/api/series` | Liste des séries |
| `DELETE` | `/api/series/:id` | Supprimer une série |

### Important

- La liste des séries est stockée **en mémoire** et les fichiers dans `uploads/` sur le disque du service : tout est perdu au redémarrage / redéploiement. Pour persister, ajouter un stockage externe (S3, Cloudinary…).
- Limite de 50 séries (configurable dans `server.js`).
- Taille max d'une photo : 10 Mo.

### Dépannage

- **Le site ne charge pas** : vérifier les logs Railway et que le serveur écoute bien sur `process.env.PORT`.
- **La caméra ne fonctionne pas** : utiliser HTTPS (Railway le fournit automatiquement) et autoriser l'accès caméra dans le navigateur.
- **Les photos ne s'uploadent pas** : vérifier les logs serveur et tester `https://votre-projet.up.railway.app/api/health`.

## Structure du projet

```
├── server.js        # Serveur Express (API + frontend statique)
├── package.json
├── railway.toml     # Config Railway
├── public/
│   ├── index.html   # Interface utilisateur
│   └── admin.html   # Interface admin
└── uploads/         # Photos (créé automatiquement)
```

## Stack technique

Node.js, Express, Multer, CORS ; frontend en HTML/CSS/JS vanilla (`getUserMedia`, canvas) ; hébergement Railway (Nixpacks).

## Crédits & licence

Aucune licence n'est spécifiée — tous droits réservés.

---

<p align="center">
  Fait par <a href="https://github.com/elisalien">Élisalien</a> ·
  <a href="https://gitlab.com/elisalien/catalog">Catalogue des shaders, sources & logiciels</a>
</p>
