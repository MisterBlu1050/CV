# AI Job Matching - Configuration

## Description
La fonctionnalité "AI Job Matching" utilise l'API Gemini 2.5 Pro de Google pour analyser la correspondance entre un CV et une description de poste. L'IA applique une expertise en recrutement et ressources humaines pour fournir une analyse détaillée.

## Configuration de l'API Gemini

### 1. Obtenir une clé API
1. Rendez-vous sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Créez une nouvelle clé API
4. Copiez la clé générée

### 2. Configuration locale
1. Créez un fichier `.env` à la racine du projet
2. Ajoutez votre clé API :
```
REACT_APP_GEMINI_API_KEY=votre_cle_api_ici
```

### 3. Mode Démo
Si aucune clé API n'est configurée, l'application fonctionne en mode démo avec une analyse simulée.

## Fonctionnalités

### Analyse IA
- **Partie 1 :** Points forts du profil par rapport au poste
- **Partie 2 :** Points de préoccupation ou faiblesses
- **Partie 3 :** Score sur 100 avec résumé de l'évaluation

### Utilisation
1. Entrez un titre de poste ou une description complète
2. Cliquez sur "Analyser avec l'IA"
3. Attendez l'analyse (généralement 3-10 secondes)
4. Consultez les résultats détaillés

## Sécurité

⚠️ **Important pour la production :**
- Ne jamais exposer votre clé API côté client en production
- Utilisez un backend sécurisé pour les appels API
- Implémentez une authentification appropriée
- Limitez les quotas d'utilisation

## Dépannage

### Erreurs communes
- **"Clé API manquante"** : Vérifiez que `REACT_APP_GEMINI_API_KEY` est défini dans votre `.env`
- **"Erreur API 403"** : Votre clé API n'est pas valide ou a atteint ses limites
- **"Erreur API 429"** : Vous avez dépassé le quota de requêtes, attendez un moment

### Mode démo automatique
En cas d'erreur avec l'API, l'application bascule automatiquement sur une analyse simulée pour maintenir la fonctionnalité.

## Coûts
- L'API Gemini a un quota gratuit généreux
- Consultez la [page de tarification](https://ai.google.dev/pricing) pour les détails
- Une requête typique utilise environ 1000-2000 tokens
