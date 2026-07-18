// Configuration Firebase — pour synchroniser entre les téléphones de la famille.
//
// Tant que cette valeur est `null`, l'application fonctionne en mode local
// (les données restent sur cet appareil uniquement).
//
// Pour activer la synchronisation :
//   1. Va sur https://console.firebase.google.com et crée un projet gratuit
//   2. Ajoute une "application Web", copie l'objet firebaseConfig
//   3. Remplace `null` ci-dessous par cet objet
// (Claude peut te guider pas à pas !)

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDfe9xBvwFGFPYrlPqmv1f9TDuTZnN2vEs",
  authDomain: "qg-famille.firebaseapp.com",
  projectId: "qg-famille",
  storageBucket: "qg-famille.firebasestorage.app",
  messagingSenderId: "283959161564",
  appId: "1:283959161564:web:0d4d7e0dfedc42a8d27a19"
};
