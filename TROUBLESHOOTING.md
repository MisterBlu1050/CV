# 🔧 Guide de dépannage - API Gemini

## Diagnostic rapide

Votre application fonctionne en mode démo car l'API Gemini n'est pas correctement configurée.

### ✅ Étapes de vérification

1. **Vérifiez votre fichier .env** :
   ```
   REACT_APP_GEMINI_API_KEY=AIzaSyBh8F5--LWnUzW7T66wN_fVYiHbXF9a4u8
   ```

2. **Testez votre clé API** :
   - Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Vérifiez que votre clé est active
   - Copiez une nouvelle clé si nécessaire

3. **Redémarrez l'application** :
   ```powershell
   # Arrêtez l'application (Ctrl+C)
   # Puis redémarrez
   npm start
   ```

### 🔍 Utilisation du mode debug

1. Ouvrez l'application sur http://localhost:3000
2. Allez dans la section "AI Job Matching"
3. Entrez une description de poste
4. Cliquez sur "Analyser avec l'IA"
5. Si vous voyez une erreur, cliquez sur le bouton "Debug"
6. Vérifiez les informations affichées

### 🎯 Solutions communes

**Si votre clé API a moins de 30 caractères :**
- Votre clé est incomplète
- Retournez sur Google AI Studio pour obtenir la clé complète

**Si vous voyez "Erreur 403" :**
- Votre clé API est invalide ou désactivée
- Créez une nouvelle clé API

**Si vous voyez "Erreur 429" :**
- Vous avez dépassé le quota gratuit
- Attendez quelques minutes ou vérifiez vos limites

### 📋 Checklist de dépannage

- [ ] Fichier .env existe dans le dossier racine
- [ ] Variable REACT_APP_GEMINI_API_KEY est définie
- [ ] Clé API fait plus de 30 caractères
- [ ] Application redémarrée après modification du .env
- [ ] Clé API testée sur Google AI Studio
- [ ] Pas de quota dépassé

### 🔄 En cas de problème persistant

L'application basculera automatiquement en mode démo avec une analyse simulée. Cette analyse utilise le même format que l'IA réelle et reste pleinement fonctionnelle pour les démonstrations.

### 💡 Astuce

Pour tester rapidement, utilisez les boutons d'exemples dans l'interface :
- Développeur Full Stack
- Consultant RH
- Chef de Projet Digital  
- Psychologue Clinicien
