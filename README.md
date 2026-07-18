# 🏠 QG Famille

Le centre de commande de la famille : repas, courses, missions et agenda — sur le téléphone de chacun.

**App en ligne : https://terekarr.github.io/command-center/**

## Les 5 onglets

- **🏠 Accueil** — le résumé du jour : dîner prévu, mes missions, la liste de courses
- **🍽️ Repas** — boîte à recettes + planning de la semaine + bouton "✨ Suggère ma semaine"
- **🛒 Courses** — liste générée depuis les repas de la semaine, rangée par rayon, avec suggestions intelligentes
- **⭐ Missions** — corvées gamifiées : points, séries 🔥 et récompenses pour les enfants
- **📅 Agenda** — l'agenda Google de la famille

## Technique

Vanilla JS, aucun outil de build : `index.html` + `style.css` + `app.js`.
- Sans configuration : mode local (données sur l'appareil, via localStorage)
- Avec Firebase configuré dans `firebase-config.js` : synchronisation en temps réel entre tous les téléphones de la famille (Firestore, code famille partagé)
- PWA : "Ajouter à l'écran d'accueil" pour l'utiliser comme une vraie app

Fait en famille avec Claude 💜
