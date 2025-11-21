# 🚀 Guide de Lancement - Système Cabinet Médical

## ✅ Vérifications avant de lancer

### 1. Base de données Supabase
- [ ] Vous avez créé un projet sur Supabase
- [ ] Vous avez exécuté le script `database.sql` dans l'éditeur SQL de Supabase
- [ ] Les tables sont créées (patients, consultations, rendezvous, paiements)

### 2. Fichiers .env
- [ ] Fichier `server/.env` créé avec vos clés Supabase
- [ ] Fichier `vite-project/.env` créé avec vos clés Supabase

## 📦 Installation des dépendances

### Backend (Terminal 1)
```bash
cd server
npm install
```

### Frontend (Terminal 2)
```bash
cd vite-project
npm install
```

## 🚀 Lancement de l'application

### Étape 1 : Lancer le serveur backend

Ouvrez un terminal et exécutez :
```bash
cd server
npm run dev
```

Vous devriez voir :
```
🚀 Serveur Express démarré sur le port 3001
```

### Étape 2 : Lancer le frontend

Ouvrez un **nouveau terminal** et exécutez :
```bash
cd vite-project
npm run dev
```

Vous devriez voir quelque chose comme :
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## 🌐 Accès à l'application

1. Ouvrez votre navigateur
2. Allez sur : `http://localhost:5173`
3. Vous verrez la page de connexion

## 🔐 Connexion

Utilisez un de ces comptes :
- **Docteur** : `docteur` / `docteur123`
- **Assistant** : `assistant` / `assistant123`

## ⚠️ Problèmes courants

### Erreur "Missing Supabase credentials"
- Vérifiez que vos fichiers `.env` sont bien créés
- Vérifiez que les clés sont correctes (sans espaces)
- Redémarrez le serveur après modification du `.env`

### Erreur de connexion à Supabase
- Vérifiez que votre URL Supabase est correcte
- Vérifiez que votre clé API est la bonne (anon public)
- Vérifiez que les tables sont créées dans Supabase

### Port déjà utilisé
- Si le port 3001 est utilisé, changez `PORT=3001` dans `server/.env`
- Si le port du frontend est utilisé, Vite vous proposera automatiquement un autre port

## ✅ Test rapide

Une fois connecté, testez :
1. ✅ Ajouter un patient
2. ✅ Voir le tableau de bord
3. ✅ Prendre un rendez-vous
4. ✅ Ajouter une consultation
5. ✅ Enregistrer un paiement

## 🎉 C'est prêt !

Votre système de gestion de cabinet médical est maintenant opérationnel !

