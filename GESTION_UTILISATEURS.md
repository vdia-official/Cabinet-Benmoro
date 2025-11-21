# 👥 Gestion des Utilisateurs

## ✅ Modifications apportées

### 1. Table `users` dans la base de données
- Nouvelle table créée avec : `username`, `password`, `role`, `nom`, `prenom`, `actif`
- Les utilisateurs sont maintenant stockés dans Supabase
- Plus besoin de comptes hardcodés !

### 2. Authentification depuis la base de données
- L'authentification se fait maintenant via l'API
- Les comptes de test ont été supprimés de la page de connexion
- Chaque utilisateur ajouté dans la DB peut se connecter

### 3. Page de gestion des utilisateurs
- Nouvelle page `/users` pour gérer les utilisateurs
- Ajouter, modifier, supprimer des utilisateurs
- Activer/désactiver des comptes
- Gérer les rôles (docteur/assistant)

## 🚀 Installation

### 1. Exécuter le script SQL mis à jour

Dans Supabase, exécutez le fichier `database.sql` mis à jour. Il contient :
- La table `users`
- Les index et triggers
- Les politiques RLS
- Deux utilisateurs par défaut (docteur/docteur123 et assistant/assistant123)

### 2. Redémarrer les serveurs

```bash
# Backend
cd server
npm run dev

# Frontend
cd vite-project
npm run dev
```

## 📝 Utilisation

### Ajouter un utilisateur

1. Connectez-vous au système
2. Allez dans **Utilisateurs** (menu de gauche)
3. Cliquez sur **Nouvel Utilisateur**
4. Remplissez le formulaire :
   - Nom d'utilisateur (unique)
   - Mot de passe
   - Rôle (docteur ou assistant)
   - Nom et prénom (optionnels)
5. Cliquez sur **Ajouter**

### Modifier un utilisateur

1. Dans la page **Utilisateurs**
2. Cliquez sur l'icône **Modifier** (crayon)
3. Modifiez les informations
4. Pour changer le mot de passe, entrez le nouveau (laisser vide pour ne pas changer)
5. Cliquez sur **Modifier**

### Désactiver/Activer un utilisateur

1. Cliquez sur l'icône **Cadenas** à côté de l'utilisateur
2. L'utilisateur sera désactivé (ne pourra plus se connecter)
3. Cliquez à nouveau pour réactiver

### Supprimer un utilisateur

1. Cliquez sur l'icône **Supprimer** (poubelle)
2. Confirmez la suppression

## 🔐 Sécurité

⚠️ **Important** : Les mots de passe sont stockés en clair dans la base de données pour l'instant.

**Pour la production**, il est fortement recommandé de :
1. Utiliser bcrypt pour hasher les mots de passe
2. Ajouter une validation plus stricte
3. Implémenter des sessions sécurisées
4. Ajouter des logs d'audit

## 📊 Structure de la table users

```sql
- id: UUID (clé primaire)
- username: VARCHAR(50) UNIQUE (nom d'utilisateur unique)
- password: VARCHAR(255) (mot de passe)
- role: VARCHAR(20) (docteur ou assistant)
- nom: VARCHAR(100) (nom de l'utilisateur)
- prenom: VARCHAR(100) (prénom de l'utilisateur)
- actif: BOOLEAN (true = peut se connecter, false = compte désactivé)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

## 🎯 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/:id` - Détails d'un utilisateur
- `POST /api/users` - Créer un utilisateur
- `PUT /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur

## ✅ C'est prêt !

Vous pouvez maintenant gérer tous vos utilisateurs depuis l'interface web, directement dans la base de données Supabase !

