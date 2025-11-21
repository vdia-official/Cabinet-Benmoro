# Configuration des fichiers .env

## 📝 Instructions pour créer les fichiers .env

Vous devez créer **2 fichiers .env** manuellement :

### 1. Fichier `server/.env`

Créez un fichier nommé `.env` dans le dossier `server/` avec ce contenu :

```env
PORT=3001
SUPABASE_URL=votre_url_supabase_ici
SUPABASE_ANON_KEY=votre_cle_anon_supabase_ici
```

**Remplacez :**
- `votre_url_supabase_ici` par votre URL Supabase (ex: `https://xxxxx.supabase.co`)
- `votre_cle_anon_supabase_ici` par votre clé API anonyme Supabase

### 2. Fichier `vite-project/.env`

Créez un fichier nommé `.env` dans le dossier `vite-project/` avec ce contenu :

```env
VITE_API_URL=http://localhost:3001/api
VITE_SUPABASE_URL=votre_url_supabase_ici
VITE_SUPABASE_ANON_KEY=votre_cle_anon_supabase_ici
```

**Remplacez :**
- `votre_url_supabase_ici` par votre URL Supabase (ex: `https://xxxxx.supabase.co`)
- `votre_cle_anon_supabase_ici` par votre clé API anonyme Supabase

## 🔑 Comment obtenir vos clés Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Créez un nouveau projet
4. Allez dans **Settings** → **API**
5. Copiez :
   - **Project URL** → `SUPABASE_URL`
   - **anon public** key → `SUPABASE_ANON_KEY`

## ⚠️ Important

- Ne partagez **JAMAIS** vos fichiers `.env` (ils contiennent des clés secrètes)
- Les fichiers `.env` sont déjà dans `.gitignore` pour votre sécurité
- Après avoir créé les fichiers `.env`, redémarrez le serveur et le frontend

