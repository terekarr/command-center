// ===== QG Famille — application principale =====
// Organisation du fichier :
//   1. Constantes (emojis, couleurs, rayons du magasin…)
//   2. État et sauvegarde (localStorage + Firebase si configuré)
//   3. Petits outils (dates, toast, confettis, modales)
//   4. Démarrage (code famille, choix du profil)
//   5. Les 5 écrans : Accueil, Repas, Courses, Missions, Agenda
//   6. Actions (tout ce qui se passe quand on touche un bouton)

// ---------- 1. Constantes ----------

const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const JOURS_LONGS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

const EMOJIS_PERSONNE = ['👩','👨','👧','👦','😎','🐣','🦄','🐱','🐶','🦖','🌟','🐼','🦊','👵','👴','🤖'];
const EMOJIS_MISSION = ['🛏️','🧸','🍴','🍽️','📚','🧺','🗑️','🧹','🐕','🐈','🌱','🚿','👟','🎒','🧼','🚲'];
const EMOJIS_RECETTE = ['🍝','🍗','🐟','🍕','🥣','🥞','🌮','🍔','🥗','🍚','🥘','🍜','🥧','🍳','🥪','🍛'];
const EMOJIS_RECOMPENSE = ['🎬','🍦','🎮','🎁','🏊','🎡','🧁','⚽','🎨','📖'];
const COULEURS = ['#f06ca8','#4b9cf0','#4bc98a','#f0a04b','#7c6cf0','#e0b040'];
const TAGS_RECETTE = ['rapide','pâtes','poisson','viande','végé','soupe','sucré','salade','accompagnement','apéro'];
// Ces tags ne sont pas des dîners : le suggéreur de semaine les ignore
const TAGS_PAS_DINER = ['sucré','accompagnement','apéro'];

// Les recettes de Teresa, importées de sa base Notion "Recipes" (2026-07-18).
// Sans ingrédients pour l'instant — à compléter petit à petit dans l'app.
const RECETTES_NOTION = [
  { name: 'Apple crumble', emoji: '🍏', tags: ['sucré'] },
  { name: 'Avo toast & eggs', emoji: '🥑', tags: ['rapide','végé'] },
  { name: 'Avocado & salmon toast', emoji: '🥑', tags: ['rapide','poisson'] },
  { name: 'Avocado chickpea salad', emoji: '🥑', tags: ['salade','végé'] },
  { name: 'Bœuf bourguignon', emoji: '🥩', tags: ['viande'] },
  { name: 'Bolo de brigadeiro', emoji: '🍫', tags: ['sucré'] },
  { name: 'Brussel sprouts', emoji: '🍁', tags: ['accompagnement'] },
  { name: 'Burgers', emoji: '🍔', tags: ['viande','rapide'] },
  { name: 'Caesar salad', emoji: '🥬', tags: ['salade'] },
  { name: 'Carnitas', emoji: '🐖', tags: ['viande'] },
  { name: 'Ceviche', emoji: '🐟', tags: ['poisson'] },
  { name: 'Chili con carne', emoji: '🌶️', tags: ['viande'] },
  { name: 'Chocochitas', emoji: '🍪', tags: ['sucré'] },
  { name: 'Chocolate cake', emoji: '🎂', tags: ['sucré'] },
  { name: 'Chopped medi chicken salad', emoji: '🍗', tags: ['salade','viande'] },
  { name: 'Chorisotto', emoji: '🍛', tags: ['viande'] },
  { name: 'Chupe', emoji: '🍲', tags: ['soupe'] },
  { name: 'Cinnamon rolls', emoji: '🥮', tags: ['sucré'] },
  { name: 'Crispy chicken caesar cutlets', emoji: '🍗', tags: ['viande'] },
  { name: 'Croziflette', emoji: '🫕', tags: ['viande'] },
  { name: 'Dirt cake', emoji: '🧁', tags: ['sucré'] },
  { name: 'Ensalada de esparragos', emoji: '🥗', tags: ['salade','végé'] },
  { name: 'Focaccia Bruschetta', emoji: '🇮🇹', tags: ['végé'] },
  { name: 'Frijoles', emoji: '🫘', tags: ['végé'] },
  { name: 'Gratin', emoji: '🥔', tags: ['accompagnement'] },
  { name: 'Guacamole', emoji: '🥑', tags: ['accompagnement','apéro'] },
  { name: 'Lasagnes', emoji: '👨🏻', tags: ['pâtes','viande'] },
  { name: 'Lemon blueberry loaf', emoji: '🫐', tags: ['sucré'] },
  { name: 'Mediterranean Tuna Chickpea', emoji: '🥗', tags: ['salade','poisson'] },
  { name: 'Nutella maison', emoji: '🍫', tags: ['sucré'] },
  { name: 'Oatmeal Cookies', emoji: '🍪', tags: ['sucré'] },
  { name: 'Pasta carbonara', emoji: '🍝', tags: ['pâtes'] },
  { name: 'Pasta greens', emoji: '🍝', tags: ['pâtes','végé'] },
  { name: 'Polvo Largareiro', emoji: '🐙', tags: ['poisson'] },
  { name: 'Polvorosa de pollo', emoji: '🍗', tags: ['viande'] },
  { name: 'Quiche aux brocolis', emoji: '🥚', tags: ['végé'] },
  { name: 'Quiche chèvre épinards', emoji: '🥬', tags: ['végé'] },
  { name: 'Reese’s buttercups', emoji: '❤️', tags: ['sucré'] },
  { name: 'Salmon - Gordon Ramsay', emoji: '🎏', tags: ['poisson'] },
  { name: 'Saucisses lentilles', emoji: '🐷', tags: ['viande'] },
  { name: 'Saumon en croute', emoji: '🎏', tags: ['poisson'] },
  { name: 'Shawarma', emoji: '🌯', tags: ['viande'] },
  { name: 'Shawarma chicken pan with smashed potatoes', emoji: '🌯', tags: ['viande'] },
  { name: 'Tagliatelles crevettes & chorizo', emoji: '🍤', tags: ['pâtes','poisson'] },
  { name: 'Tequeños', emoji: '🇻🇪', tags: ['apéro'] },
  { name: 'Torta de queso (familia)', emoji: '🍰', tags: ['sucré'] },
  { name: 'Torta humeda de limon', emoji: '🍋', tags: ['sucré'] },
  { name: 'Vegetable Lo Mein for Two', emoji: '🍜', tags: ['pâtes','végé'] },
];

const BRAVOS = [
  'Bravo {n} ! +{p} ⭐', 'Champion·ne, {n} ! +{p} ⭐', 'Et hop, +{p} points pour {n} ! 🎉',
  'Mission accomplie, {n} ! +{p} ⭐', 'Trop fort·e {n} ! +{p} ⭐', '{n} assure grave ! +{p} ⭐',
];

// Rayons du magasin : mot-clé → rayon (pour ranger la liste de courses)
// L'Épicerie est en premier : "coulis de tomate" doit y aller, pas aux légumes frais
const RAYONS = [
  ['🥫 Épicerie', ['pâtes','riz','farine','sucre','sel','poivre','huile','sauce','conserve','céréales','chocolat','café','thé','biscuit','gâteau','semoule','lentille','pois chiche','coulis','tortilla','taco','pizza','confiture','miel','vinaigre','moutarde','mayonnaise','ketchup','chips','sirop','jus','eau','soda','épice','herbe','bouillon','levure','olive','cornichon','soupe']],
  ['🥬 Fruits & Légumes', ['pomme de terre','patate','tomate','salade','carotte','courgette','oignon','ail','citron','banane','pomme','poire','fraise','framboise','poireau','haricot','épinard','champignon','concombre','poivron','avocat','brocoli','melon','raisin','kiwi','orange','clémentine','fruit','légume','échalote','radis','navet','potiron','courge']],
  ['🥛 Crèmerie', ['lait','beurre','yaourt','crème','fromage','œuf','oeuf','mozzarella','gruyère','emmental','parmesan','râpé','camembert','compote']],
  ['🥩 Viande & Poisson', ['poulet','bœuf','boeuf','steak','jambon','lardon','saucisse','viande','poisson','saumon','cabillaud','thon','crevette','dinde','porc','merguez','haché','pané','agneau','veau']],
  ['🥖 Boulangerie', ['pain','baguette','brioche','croissant','pain de mie']],
  ['🧊 Surgelés', ['surgelé','glace','frites','bâtonnet']],
  ['🧴 Hygiène & Maison', ['savon','shampoing','shampooing','dentifrice','lessive','papier toilette','essuie-tout','éponge','sac poubelle','liquide vaisselle','mouchoir','couche','gel douche','déodorant','brosse']],
];
const RAYON_AUTRE = '📦 Autre';

// Produits de base : proposés dans le "tu en as déjà ?" avant de finaliser la liste
const PRODUITS_DE_BASE = ['sel','poivre','huile','farine','sucre','riz','pâtes','beurre','lait','œuf','oeuf','ail','oignon','vinaigre','moutarde','épice','bouillon','levure','coulis','sauce'];

// ---------- 2. État et sauvegarde ----------

function etatParDefaut() {
  return {
    profiles: [], chores: [], completions: {}, points: {}, rewards: [],
    redemptions: [], recipes: [], weekPlans: {}, grocery: [], groceryHistory: {},
    settings: {},
  };
}

function etatInitial() {
  const pid = () => Math.random().toString(36).slice(2, 10);
  const ids = { maman: pid(), papa: pid(), pavewek: pid(), mini: pid() };
  return { ...etatParDefaut(),
    profiles: [
      { id: ids.maman, name: 'Maman', emoji: '👩', color: '#f06ca8', role: 'parent' },
      { id: ids.papa, name: 'Papa', emoji: '👨', color: '#4b9cf0', role: 'parent' },
      { id: ids.pavewek, name: 'Pavewek', emoji: '😎', color: '#4bc98a', role: 'enfant' },
      { id: ids.mini, name: 'Mini', emoji: '🐣', color: '#f0a04b', role: 'enfant' },
    ],
    chores: [
      { id: pid(), name: 'Faire son lit', emoji: '🛏️', points: 5, repeat: 'daily', assignees: [ids.pavewek, ids.mini], rotate: false },
      { id: pid(), name: 'Mettre la table', emoji: '🍴', points: 5, repeat: 'daily', assignees: [ids.pavewek, ids.mini], rotate: true },
      { id: pid(), name: 'Débarrasser la table', emoji: '🍽️', points: 5, repeat: 'daily', assignees: [ids.pavewek, ids.mini], rotate: true },
      { id: pid(), name: 'Ranger sa chambre', emoji: '🧸', points: 15, repeat: 'weekly', assignees: [ids.pavewek, ids.mini], rotate: false },
      { id: pid(), name: 'Faire ses devoirs', emoji: '📚', points: 10, repeat: 'daily', assignees: [ids.pavewek], rotate: false },
    ],
    rewards: [
      { id: pid(), name: 'Soirée film au choix', emoji: '🎬', cost: 30 },
      { id: pid(), name: '1h de jeu vidéo bonus', emoji: '🎮', cost: 40 },
      { id: pid(), name: 'Sortie glace', emoji: '🍦', cost: 50 },
      { id: pid(), name: 'Petite surprise', emoji: '🎁', cost: 100 },
    ],
    recipes: [
      { id: pid(), name: 'Pâtes bolognaise', emoji: '🍝', tags: ['pâtes'], ingredients: '500g pâtes\n400g bœuf haché\n1 oignon\n700g coulis de tomate\nfromage râpé' },
      { id: pid(), name: 'Poulet rôti & pommes de terre', emoji: '🍗', tags: ['viande'], ingredients: '1 poulet\n1kg pommes de terre\n2 gousses ail' },
      { id: pid(), name: 'Poisson pané & riz', emoji: '🐟', tags: ['poisson','rapide'], ingredients: '4 poissons panés\n250g riz\n1 citron\n400g haricots verts' },
      { id: pid(), name: 'Pizza maison', emoji: '🍕', tags: ['rapide'], ingredients: '2 pâtes à pizza\n400g coulis de tomate\n2 mozzarella\n4 tranches jambon' },
      { id: pid(), name: 'Soupe de légumes', emoji: '🥣', tags: ['végé','soupe'], ingredients: '4 carottes\n2 poireaux\n3 pommes de terre\n1 oignon' },
      { id: pid(), name: 'Crêpes', emoji: '🥞', tags: ['sucré','rapide'], ingredients: '250g farine\n3 œufs\n50cl lait\n50g sucre' },
      { id: pid(), name: 'Tacos', emoji: '🌮', tags: ['rapide'], ingredients: '8 tortillas\n400g bœuf haché\n1 salade\n2 tomates\nfromage râpé' },
    ],
  };
}

let state = etatParDefaut();
let device = JSON.parse(localStorage.getItem('qg-device') || '{}');
let fb = null;            // outils Firebase quand la synchro est active
let vueActive = 'home';
let semaineOffset = 0;    // navigation de semaine dans l'écran Repas
let modeMagasin = false;

function sauver(...cles) {
  localStorage.setItem('qg-state', JSON.stringify(state));
  if (!fb) return;
  const patch = {};
  for (const c of (cles.length ? cles : Object.keys(state))) patch[c] = state[c];
  fb.fs.updateDoc(fb.ref, patch).catch(() => fb.fs.setDoc(fb.ref, state));
}

async function demarrerFirebase() {
  const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js');
  const fs = await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js');
  const app = initializeApp(window.FIREBASE_CONFIG);
  const db = fs.getFirestore(app);
  fb = { fs, ref: fs.doc(db, 'families', device.familyCode) };
  return new Promise(resolve => {
    let premier = true;
    fs.onSnapshot(fb.ref, snap => {
      if (snap.exists()) {
        if (!snap.metadata.hasPendingWrites) {
          state = { ...etatParDefaut(), ...snap.data() };
          localStorage.setItem('qg-state', JSON.stringify(state));
          if (!premier) rendreTout();
        }
      } else if (premier) {
        state = etatInitial();
        fs.setDoc(fb.ref, state);
      }
      if (premier) { premier = false; resolve(); }
    }, () => { if (premier) { premier = false; chargerLocal(); resolve(); } });
  });
}

function chargerLocal() {
  const brut = localStorage.getItem('qg-state');
  state = brut ? { ...etatParDefaut(), ...JSON.parse(brut) } : etatInitial();
  if (!brut) localStorage.setItem('qg-state', JSON.stringify(state));
}

// ---------- 3. Petits outils ----------

const $ = s => document.querySelector(s);
const uid = () => Math.random().toString(36).slice(2, 10);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const norm = s => s.trim().toLowerCase();

function profilActuel() { return state.profiles.find(p => p.id === device.profileId); }
function estParent() { return profilActuel()?.role === 'parent'; }

function dateLocale(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function lundiDe(d) {
  const x = new Date(d);
  x.setDate(x.getDate() - (x.getDay() + 6) % 7);
  x.setHours(0, 0, 0, 0);
  return x;
}
function cleSemaine(offset = 0) {
  const m = lundiDe(new Date());
  m.setDate(m.getDate() + offset * 7);
  return dateLocale(m);
}
function numSemaine(cle) { return Math.floor(new Date(cle + 'T12:00:00').getTime() / (7 * 86400000)); }
function jourActuel() { return (new Date().getDay() + 6) % 7; }

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => t.classList.add('hidden'), 2600);
}

function confettis(n = 70) {
  const layer = $('#confetti-layer');
  const couleurs = ['#f06ca8','#4b9cf0','#4bc98a','#f0a04b','#7c6cf0','#f0d04b'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.className = 'confetto';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = couleurs[Math.floor(Math.random() * couleurs.length)];
    c.style.animationDuration = 1.2 + Math.random() * 1.6 + 's';
    c.style.animationDelay = Math.random() * 0.4 + 's';
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    layer.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}

function ouvrirModale(html) {
  $('#modal-box').innerHTML = html;
  $('#modal-backdrop').classList.remove('hidden');
}
function fermerModale() { $('#modal-backdrop').classList.add('hidden'); }
$('#modal-backdrop').addEventListener('click', e => { if (e.target.id === 'modal-backdrop') fermerModale(); });

// Sélecteurs d'emoji / couleur / tags dans les modales
function pickerEmoji(liste, sel) {
  return `<div class="emoji-pick" data-pick="emoji">` +
    liste.map(e => `<button type="button" class="${e === sel ? 'sel' : ''}" data-val="${e}">${e}</button>`).join('') + `</div>`;
}
function pickerCouleur(sel) {
  return `<div class="color-pick" data-pick="color">` +
    COULEURS.map(c => `<button type="button" class="${c === sel ? 'sel' : ''}" data-val="${c}" style="background:${c}"></button>`).join('') + `</div>`;
}
function pickerChips(liste, sels, attr) {
  return `<div class="chip-row" data-pick="${attr}">` +
    liste.map(x => `<button type="button" class="chip ${sels.includes(x.val) ? 'sel' : ''}" data-val="${esc(x.val)}" style="${sels.includes(x.val) ? 'background:var(--violet);color:#fff' : ''}">${esc(x.label)}</button>`).join('') + `</div>`;
}
// Les pickers : un clic sélectionne (les chips permettent le multi-choix)
$('#modal-box').addEventListener('click', e => {
  const b = e.target.closest('[data-pick] > button');
  if (!b) return;
  const cont = b.parentElement;
  if (cont.dataset.pick === 'emoji' || cont.dataset.pick === 'color') {
    cont.querySelectorAll('button').forEach(x => x.classList.remove('sel'));
    b.classList.add('sel');
  } else {
    b.classList.toggle('sel');
    b.style.cssText = b.classList.contains('sel') ? 'background:var(--violet);color:#fff' : '';
  }
});
function valPick(attr) {
  const cont = $(`#modal-box [data-pick="${attr}"]`);
  const sels = [...cont.querySelectorAll('button.sel')].map(b => b.dataset.val);
  return (attr === 'emoji' || attr === 'color') ? sels[0] : sels;
}

// ---------- 4. Démarrage ----------

async function demarrer() {
  if (window.FIREBASE_CONFIG && !device.familyCode) {
    $('#screen-family-code').classList.remove('hidden');
    return;
  }
  if (window.FIREBASE_CONFIG) await demarrerFirebase();
  else chargerLocal();
  if (!profilActuel()) montrerQui();
  else montrerApp();
}

function montrerQui() {
  $('#screen-family-code').classList.add('hidden');
  $('#app').classList.add('hidden');
  const liste = $('#who-list');
  liste.innerHTML = state.profiles.map(p =>
    `<button class="who-card" data-action="choisirProfil" data-id="${p.id}" style="background:${p.color}">
      <span class="who-avatar">${p.emoji}</span>${esc(p.name)}</button>`).join('');
  $('#screen-who').classList.remove('hidden');
}

function montrerApp() {
  $('#screen-who').classList.add('hidden');
  $('#app').classList.remove('hidden');
  rendreTout();
}

$('#family-code-btn').addEventListener('click', async () => {
  const code = norm($('#family-code-input').value).replace(/\s+/g, '-');
  if (code.length < 10) { toast('Le code doit faire au moins 10 caractères 😊'); return; }
  device.familyCode = code;
  localStorage.setItem('qg-device', JSON.stringify(device));
  $('#screen-family-code').classList.add('hidden');
  await demarrerFirebase();
  montrerQui();
});

// ---------- 5. Rendu des écrans ----------

const TITRES = { home: 'Accueil', meals: 'Repas', grocery: 'Courses', chores: 'Missions', calendar: 'Agenda' };

function rendreTout() {
  const p = profilActuel();
  if (p) {
    const chip = $('#profile-chip');
    chip.style.background = p.color;
    chip.innerHTML = `${p.emoji} ${esc(p.name)}`;
  }
  $('#topbar-title').textContent = TITRES[vueActive];
  ({ home: rendreAccueil, meals: rendreRepas, grocery: rendreCourses, chores: rendreMissions, calendar: rendreAgenda })[vueActive]();
}

document.querySelectorAll('#tabbar .tab').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('#tabbar .tab').forEach(x => x.classList.remove('active'));
  t.classList.add('active');
  vueActive = t.dataset.view;
  document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
  $(`#view-${vueActive}`).classList.remove('hidden');
  rendreTout();
}));
$('#profile-chip').addEventListener('click', montrerQui);

// --- Missions : logique ---

function assignesSemaine(chore, cle) {
  if (chore.rotate && chore.assignees.length > 1) {
    return [chore.assignees[numSemaine(cle) % chore.assignees.length]];
  }
  return chore.assignees;
}
function missionsDe(pid, cle) {
  return state.chores.filter(c => assignesSemaine(c, cle).includes(pid));
}
function estFaite(chore, pid, jour, cle) {
  const comp = state.completions[cle] || {};
  if (chore.repeat === 'weekly') return Object.keys(comp).some(k => k.startsWith(chore.id + '|') && k.endsWith('|' + pid));
  return !!comp[`${chore.id}|${jour}|${pid}`];
}
function joursAvecMission(pid) {
  // toutes les dates (AAAA-MM-JJ) où ce profil a fait au moins une mission
  const jours = new Set();
  for (const [cle, comp] of Object.entries(state.completions)) {
    for (const [k, ts] of Object.entries(comp)) {
      if (k.endsWith('|' + pid)) jours.add(dateLocale(new Date(ts)));
    }
  }
  return jours;
}
function serie(pid) {
  const jours = joursAvecMission(pid);
  let n = 0;
  const d = new Date();
  if (!jours.has(dateLocale(d))) d.setDate(d.getDate() - 1); // la série tient si on a fait hier
  while (jours.has(dateLocale(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

function ligneMission(chore, pid, cle, jour) {
  const faite = estFaite(chore, pid, jour, cle);
  return `<div class="mission-row ${faite ? 'done' : ''}">
    <span class="mission-emoji">${chore.emoji}</span>
    <div class="mission-info">
      <div class="mission-name">${esc(chore.name)}${chore.repeat === 'weekly' ? ' <span style="font-size:11px;color:var(--texte-doux)">(1× par semaine)</span>' : ''}</div>
      <div class="mission-points">+${chore.points} ⭐</div>
    </div>
    ${estParent() ? `<button class="icon-btn" data-action="editerMission" data-id="${chore.id}">✏️</button>` : ''}
    <button class="mission-check" data-action="cocherMission" data-id="${chore.id}" data-pid="${pid}">${faite ? '✔️' : ''}</button>
  </div>`;
}

function rendreMissions() {
  const cle = cleSemaine();
  const jour = jourActuel();
  const scores = state.profiles.map(p => {
    const s = serie(p.id);
    return `<div class="score-card" style="background:${p.color}">
      <div class="score-avatar">${p.emoji}</div>
      <div class="score-name">${esc(p.name)}</div>
      <div class="score-points">${state.points[p.id] || 0} ⭐</div>
      ${s >= 2 ? `<div class="score-streak">🔥 ${s} jours</div>` : ''}
    </div>`;
  }).join('');

  const moi = profilActuel();
  const ordre = [moi, ...state.profiles.filter(p => p.id !== moi.id)];
  const sections = ordre.map(p => {
    const missions = missionsDe(p.id, cle);
    if (!missions.length) return '';
    return `<div class="card">
      <h2>${p.emoji} ${p.id === moi.id ? 'Mes missions' : esc(p.name)}<span class="spacer"></span></h2>
      ${missions.map(c => ligneMission(c, p.id, cle, jour)).join('')}
    </div>`;
  }).join('');

  const recompenses = state.rewards.map(r => {
    const pts = state.points[moi.id] || 0;
    return `<div class="reward-row">
      <span class="mission-emoji">${r.emoji}</span>
      <div class="reward-info">
        <div class="reward-name">${esc(r.name)}</div>
        <div class="reward-cost">${r.cost} ⭐</div>
      </div>
      ${estParent() ? `<button class="icon-btn" data-action="editerRecompense" data-id="${r.id}">✏️</button>` : ''}
      <button class="small-btn" data-action="echangerRecompense" data-id="${r.id}" ${pts < r.cost ? 'style="opacity:0.4"' : ''}>Échanger</button>
    </div>`;
  }).join('');

  $('#view-chores').innerHTML = `
    <div class="section-title">Tableau des étoiles</div>
    <div class="score-strip">${scores}</div>
    <div class="section-title">Aujourd'hui — ${JOURS_LONGS[jourActuel()]}</div>
    ${sections || '<div class="card"><p class="empty-msg">Aucune mission pour l\'instant.</p></div>'}
    ${estParent() ? `<button class="btn-secondary" style="width:100%;margin-bottom:14px" data-action="editerMission">➕ Nouvelle mission</button>` : ''}
    <div class="section-title">Récompenses</div>
    <div class="card">${recompenses || '<p class="empty-msg">Pas encore de récompenses.</p>'}
    ${estParent() ? `<button class="btn-secondary" style="width:100%;margin-top:8px" data-action="editerRecompense">➕ Nouvelle récompense</button>` : ''}</div>`;
}

// --- Repas ---

function resteNotion() {
  const noms = new Set(state.recipes.map(r => norm(r.name)));
  return RECETTES_NOTION.filter(r => !noms.has(norm(r.name)));
}

function repasDuJour(cle, jour) {
  const plan = (state.weekPlans[cle] || {})[jour];
  if (!plan) return null;
  if (plan.type === 'recipe') {
    const r = state.recipes.find(x => x.id === plan.id);
    return r ? { emoji: r.emoji, name: r.name, recipe: r } : null;
  }
  return { emoji: '🍽️', name: plan.name };
}

function rendreRepas() {
  const cle = cleSemaine(semaineOffset);
  const lundi = new Date(cle + 'T12:00:00');
  const labelSemaine = semaineOffset === 0 ? 'Cette semaine' :
    semaineOffset === 1 ? 'Semaine prochaine' :
    'Semaine du ' + lundi.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

  const jours = JOURS.map((j, i) => {
    const repas = repasDuJour(cle, i);
    const estAujourdhui = semaineOffset === 0 && i === jourActuel();
    return `<div class="day-row ${estAujourdhui ? 'today' : ''}" ${estParent() ? `data-action="choisirRepas" data-jour="${i}"` : ''}>
      <span class="day-label">${j}</span>
      <span class="day-meal ${repas ? '' : 'empty'}">${repas ? `${repas.emoji} ${esc(repas.name)}` : (estParent() ? 'Choisir…' : '—')}</span>
    </div>`;
  }).join('');

  const recettes = state.recipes.map(r => `<div class="recipe-row" ${estParent() ? `data-action="editerRecette" data-id="${r.id}"` : ''}>
      <span class="recipe-emoji">${r.emoji}</span>
      <div class="recipe-info">
        <div class="recipe-name">${esc(r.name)}</div>
        <div class="recipe-tags">${(r.tags || []).join(' · ')}</div>
      </div>
      ${estParent() ? '<span class="icon-btn">✏️</span>' : ''}
    </div>`).join('');

  $('#view-meals').innerHTML = `
    <div class="card">
      <h2><button class="icon-btn" data-action="semainePrec">‹</button>
      <span class="spacer" style="text-align:center">${labelSemaine}</span>
      <button class="icon-btn" data-action="semaineSuiv">›</button></h2>
      ${jours}
      ${estParent() ? `<button class="btn-primary" style="margin-top:10px" data-action="suggererSemaine">✨ Suggère ma semaine</button>` : ''}
    </div>
    <div class="section-title">📖 Boîte à recettes</div>
    <div class="card">
      ${recettes || '<p class="empty-msg">Ajoute tes recettes préférées !</p>'}
      ${estParent() ? `<button class="btn-secondary" style="width:100%;margin-top:8px" data-action="editerRecette">➕ Nouvelle recette</button>` : ''}
      ${estParent() && resteNotion().length ? `<button class="btn-secondary" style="width:100%;margin-top:8px" data-action="importerNotion">📥 Importer mes recettes Notion (${resteNotion().length})</button>` : ''}
    </div>`;
}

// --- Courses ---

// Vrai si le mot-clé apparaît en début de mot ("œuf" dans "œufs" oui, dans "bœuf" non)
function contientMot(texte, mot) {
  const i = norm(texte).indexOf(mot);
  if (i === -1) return false;
  return i === 0 || !/[a-zà-ÿœæ]/.test(norm(texte)[i - 1]);
}

function rayonDe(nom) {
  for (const [rayon, mots] of RAYONS) {
    if (mots.some(m => contientMot(nom, m))) return rayon;
  }
  return RAYON_AUTRE;
}

function parserIngredient(ligne) {
  const m = ligne.trim().match(/^([\d.,]+\s*(?:kg|g|l|cl|ml|gousses?|tranches?|sachets?|boîtes?|paquets?)?)\s+(.{2,})$/i);
  return m ? { qty: m[1].trim(), name: m[2].trim() } : { qty: '', name: ligne.trim() };
}

function fusionnerQte(a, b) {
  if (!a) return b;
  if (!b) return a;
  const pa = a.match(/^([\d.,]+)\s*([a-z]*)$/i), pb = b.match(/^([\d.,]+)\s*([a-z]*)$/i);
  if (pa && pb && pa[2].toLowerCase() === pb[2].toLowerCase()) {
    const somme = parseFloat(pa[1].replace(',', '.')) + parseFloat(pb[1].replace(',', '.'));
    return somme + (pa[2] ? ' ' + pa[2] : '');
  }
  return a + ' + ' + b;
}

function ajouterArticle(name, qty, source) {
  if (!name.trim()) return;
  const existant = state.grocery.find(g => norm(g.name) === norm(name));
  if (existant) { existant.qty = fusionnerQte(existant.qty, qty); existant.checked = false; }
  else state.grocery.push({ id: uid(), name: name.trim(), qty: qty || '', aisle: rayonDe(name), checked: false, source: source || 'manuel' });
}

function suggestionsCourses() {
  const dansListe = new Set(state.grocery.map(g => norm(g.name)));
  const maintenant = Date.now();
  return Object.values(state.groceryHistory)
    .filter(h => h.count >= 3 && !dansListe.has(norm(h.name)) && maintenant - h.last > 4 * 86400000)
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

function rendreCourses() {
  const parRayon = {};
  for (const g of state.grocery) (parRayon[g.aisle] ||= []).push(g);
  const ordreRayons = [...RAYONS.map(r => r[0]), RAYON_AUTRE];

  const liste = ordreRayons.filter(r => parRayon[r]).map(r => `
    <div class="aisle-title">${r}</div>
    ${parRayon[r].map(g => `<div class="grocery-row ${g.checked ? 'checked' : ''}">
      <button class="grocery-check" data-action="cocherArticle" data-id="${g.id}">${g.checked ? '✔️' : ''}</button>
      <span class="grocery-name">${esc(g.name)}</span>
      <span class="grocery-qty">${esc(g.qty)}</span>
      <button class="icon-btn" data-action="supprimerArticle" data-id="${g.id}">✕</button>
    </div>`).join('')}`).join('');

  const suggs = suggestionsCourses();
  const aCocher = state.grocery.filter(g => g.checked).length;

  $('#view-grocery').innerHTML = `
    <div class="chip-row" style="margin-bottom:14px">
      <button class="chip" data-action="genererDepuisRepas">🧾 Depuis les repas</button>
      <button class="chip" data-action="modeMagasin" ${modeMagasin ? 'style="background:var(--violet);color:#fff"' : ''}>🛍️ Mode magasin</button>
    </div>
    ${suggs.length ? `<div class="card"><h2>💡 Tu achètes souvent…</h2><div class="chip-row">
      ${suggs.map(s => `<button class="chip" data-action="ajouterSuggestion" data-nom="${esc(s.name)}">➕ ${esc(s.name)}</button>`).join('')}
    </div></div>` : ''}
    <div class="card ${modeMagasin ? 'shopping-mode' : ''}">
      ${liste || '<p class="empty-msg">La liste est vide.<br>Génère-la depuis les repas de la semaine, ou ajoute des articles ici 👇</p>'}
      <div class="add-inline">
        <input id="grocery-input" placeholder="Ajouter un article…">
        <button class="small-btn" data-action="ajouterManuel">➕</button>
      </div>
    </div>
    ${aCocher ? `<button class="btn-primary" data-action="finirCourses">✅ Terminer les courses (${aCocher} article${aCocher > 1 ? 's' : ''})</button>` : ''}`;

  $('#grocery-input')?.addEventListener('keydown', e => { if (e.key === 'Enter') actions.ajouterManuel(); });
}

// --- Agenda ---

function rendreAgenda() {
  const url = state.settings.calendarUrl;
  $('#view-calendar').innerHTML = url ? `
    <iframe class="calendar-frame" src="${esc(url)}"></iframe>
    ${estParent() ? `<button class="btn-secondary" style="width:100%;margin-top:14px" data-action="modifierAgenda">Modifier le lien de l'agenda</button>` : ''}` : `
    <div class="card">
      <h2>📅 Connecter Google Agenda</h2>
      <p class="empty-msg" style="text-align:left">Pour voir l'agenda de la famille ici :<br><br>
      1. Ouvre <strong>Google Agenda</strong> sur un ordinateur<br>
      2. Paramètres → ton agenda famille → <strong>Intégrer l'agenda</strong><br>
      3. Copie le lien (ou tout le code iframe) et colle-le ici 👇</p>
      ${estParent() ? `<button class="btn-primary" data-action="modifierAgenda">Coller le lien</button>` : '<p class="empty-msg">Demande à un parent de le configurer 😊</p>'}
    </div>`;
}

// --- Accueil ---

function rendreAccueil() {
  const p = profilActuel();
  const cle = cleSemaine();
  const jour = jourActuel();
  const diner = repasDuJour(cle, jour);
  const mesMissions = missionsDe(p.id, cle);
  const faites = mesMissions.filter(c => estFaite(c, p.id, jour, cle));
  const resteCourses = state.grocery.filter(g => !g.checked).length;
  const dateFr = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  $('#view-home').innerHTML = `
    <div class="hello-banner">
      <h1>Bonjour ${p.emoji} ${esc(p.name)} !</h1>
      <p>${dateFr.charAt(0).toUpperCase() + dateFr.slice(1)}</p>
    </div>
    <div class="card">
      <h2>🍽️ Ce soir</h2>
      <div class="home-row"><span class="emoji">${diner ? diner.emoji : '🤷'}</span>
      ${diner ? `<strong>${esc(diner.name)}</strong>` : 'Rien de prévu — va voir l\'onglet Repas !'}</div>
    </div>
    ${mesMissions.length ? `<div class="card">
      <h2>⭐ Mes missions du jour <span class="spacer"></span><span style="font-size:14px;color:var(--texte-doux)">${faites.length}/${mesMissions.length}</span></h2>
      ${faites.length === mesMissions.length
        ? '<p class="empty-msg">Tout est fait, bravo ! 🎉</p>'
        : mesMissions.map(c => ligneMission(c, p.id, cle, jour)).join('')}
    </div>` : ''}
    <div class="card">
      <h2>🛒 Courses</h2>
      <div class="home-row"><span class="emoji">🧾</span>${resteCourses ? `<strong>${resteCourses}</strong>&nbsp;article${resteCourses > 1 ? 's' : ''} à acheter` : 'La liste est vide !'}</div>
    </div>
    ${!fb && estParent() ? `<div class="card">
      <h2>🔌 Synchronisation</h2>
      <p class="empty-msg" style="text-align:left">L'app fonctionne pour l'instant <strong>sur cet appareil uniquement</strong>. Pour que toute la famille la partage sur chaque téléphone, il faut connecter Firebase (gratuit, 5 minutes) — demande à Claude de te guider !</p>
    </div>` : ''}
    ${estParent() ? `<div class="card">
      <h2>⚙️ Réglages</h2>
      <button class="btn-secondary" style="width:100%;margin-bottom:8px" data-action="gererFamille">👨‍👩‍👧‍👦 Gérer la famille</button>
      <button class="btn-secondary" style="width:100%" data-action="modifierAgenda">📅 Lien Google Agenda</button>
      ${device.familyCode ? `<p class="empty-msg" style="margin-top:10px">Code famille : <strong>${esc(device.familyCode)}</strong></p>` : ''}
    </div>` : ''}`;
}

// ---------- 6. Actions ----------

const actions = {

  choisirProfil({ id }) {
    device.profileId = id;
    localStorage.setItem('qg-device', JSON.stringify(device));
    montrerApp();
  },

  // --- Missions ---

  cocherMission({ id, pid }) {
    const chore = state.chores.find(c => c.id === id);
    const moi = profilActuel();
    if (!chore) return;
    if (pid !== moi.id && !estParent()) { toast('Hé, c\'est pas ta mission ! 😄'); return; }
    const cle = cleSemaine();
    const jour = jourActuel();
    const comp = (state.completions[cle] ||= {});
    const cleComp = `${chore.id}|${jour}|${pid}`;
    const dejaFaite = estFaite(chore, pid, jour, cle);

    if (dejaFaite) {
      if (!estParent()) { toast('Déjà validée ! Un parent peut l\'annuler.'); return; }
      // un parent annule : on retire la validation du jour (ou de la semaine si hebdo)
      if (chore.repeat === 'weekly') {
        for (const k of Object.keys(comp)) {
          if (k.startsWith(chore.id + '|') && k.endsWith('|' + pid)) delete comp[k];
        }
      } else {
        delete comp[cleComp];
      }
      state.points[pid] = Math.max(0, (state.points[pid] || 0) - chore.points);
      toast('Mission annulée.');
    } else {
      comp[cleComp] = Date.now();
      state.points[pid] = (state.points[pid] || 0) + chore.points;
      const nom = state.profiles.find(p => p.id === pid)?.name || '';
      toast(BRAVOS[Math.floor(Math.random() * BRAVOS.length)].replace('{n}', nom).replace('{p}', chore.points));
      confettis();
    }
    sauver('completions', 'points');
    rendreTout();
  },

  editerMission({ id }) {
    const chore = state.chores.find(c => c.id === id) || { name: '', emoji: '🧹', points: 5, repeat: 'daily', assignees: [], rotate: false };
    ouvrirModale(`<h3>${id ? 'Modifier la mission' : 'Nouvelle mission'}</h3>
      <div class="form-field"><label>Nom</label><input id="f-nom" value="${esc(chore.name)}" placeholder="ex : Sortir la poubelle"></div>
      <div class="form-field"><label>Emoji</label>${pickerEmoji(EMOJIS_MISSION, chore.emoji)}</div>
      <div class="form-field"><label>Points</label><input id="f-points" type="number" value="${chore.points}" min="1"></div>
      <div class="form-field"><label>Répétition</label><select id="f-repeat">
        <option value="daily" ${chore.repeat === 'daily' ? 'selected' : ''}>Tous les jours</option>
        <option value="weekly" ${chore.repeat === 'weekly' ? 'selected' : ''}>1 fois par semaine</option>
      </select></div>
      <div class="form-field"><label>Qui s'en occupe ?</label>
        ${pickerChips(state.profiles.map(p => ({ val: p.id, label: p.emoji + ' ' + p.name })), chore.assignees, 'assignees')}</div>
      <div class="form-field"><label><input id="f-rotate" type="checkbox" ${chore.rotate ? 'checked' : ''} style="width:auto"> À tour de rôle (change chaque semaine)</label></div>
      <div class="modal-actions">
        ${id ? `<button class="btn-danger" data-action="supprimerMission" data-id="${id}">Supprimer</button>` : ''}
        <button class="btn-primary" data-action="sauverMission" data-id="${id || ''}">Enregistrer</button>
      </div>`);
  },

  sauverMission({ id }) {
    const nom = $('#f-nom').value.trim();
    if (!nom) { toast('Il faut un nom !'); return; }
    const data = {
      name: nom, emoji: valPick('emoji') || '🧹',
      points: Math.max(1, parseInt($('#f-points').value) || 5),
      repeat: $('#f-repeat').value,
      assignees: valPick('assignees'),
      rotate: $('#f-rotate').checked,
    };
    if (!data.assignees.length) { toast('Choisis au moins une personne !'); return; }
    if (id) Object.assign(state.chores.find(c => c.id === id), data);
    else state.chores.push({ id: uid(), ...data });
    sauver('chores');
    fermerModale();
    rendreTout();
  },

  supprimerMission({ id }) {
    state.chores = state.chores.filter(c => c.id !== id);
    sauver('chores');
    fermerModale();
    rendreTout();
  },

  editerRecompense({ id }) {
    const r = state.rewards.find(x => x.id === id) || { name: '', emoji: '🎁', cost: 30 };
    ouvrirModale(`<h3>${id ? 'Modifier la récompense' : 'Nouvelle récompense'}</h3>
      <div class="form-field"><label>Nom</label><input id="f-nom" value="${esc(r.name)}" placeholder="ex : Soirée pyjama"></div>
      <div class="form-field"><label>Emoji</label>${pickerEmoji(EMOJIS_RECOMPENSE, r.emoji)}</div>
      <div class="form-field"><label>Coût en étoiles</label><input id="f-cout" type="number" value="${r.cost}" min="1"></div>
      <div class="modal-actions">
        ${id ? `<button class="btn-danger" data-action="supprimerRecompense" data-id="${id}">Supprimer</button>` : ''}
        <button class="btn-primary" data-action="sauverRecompense" data-id="${id || ''}">Enregistrer</button>
      </div>`);
  },

  sauverRecompense({ id }) {
    const nom = $('#f-nom').value.trim();
    if (!nom) { toast('Il faut un nom !'); return; }
    const data = { name: nom, emoji: valPick('emoji') || '🎁', cost: Math.max(1, parseInt($('#f-cout').value) || 30) };
    if (id) Object.assign(state.rewards.find(x => x.id === id), data);
    else state.rewards.push({ id: uid(), ...data });
    sauver('rewards');
    fermerModale();
    rendreTout();
  },

  supprimerRecompense({ id }) {
    state.rewards = state.rewards.filter(x => x.id !== id);
    sauver('rewards');
    fermerModale();
    rendreTout();
  },

  echangerRecompense({ id }) {
    const r = state.rewards.find(x => x.id === id);
    const moi = profilActuel();
    const pts = state.points[moi.id] || 0;
    if (pts < r.cost) { toast(`Il te manque ${r.cost - pts} ⭐ — courage !`); return; }
    ouvrirModale(`<h3>${r.emoji} ${esc(r.name)}</h3>
      <p class="empty-msg">Échanger <strong>${r.cost} ⭐</strong> contre cette récompense ?</p>
      <div class="modal-actions">
        <button class="btn-secondary" data-action="fermer">Annuler</button>
        <button class="btn-primary" data-action="confirmerEchange" data-id="${id}">Oui !</button>
      </div>`);
  },

  confirmerEchange({ id }) {
    const r = state.rewards.find(x => x.id === id);
    const moi = profilActuel();
    state.points[moi.id] = (state.points[moi.id] || 0) - r.cost;
    state.redemptions.push({ pid: moi.id, reward: r.name, cost: r.cost, ts: Date.now() });
    sauver('points', 'redemptions');
    fermerModale();
    confettis(120);
    toast(`${r.emoji} Récompense gagnée : ${r.name} !`);
    rendreTout();
  },

  // --- Repas ---

  semainePrec() { semaineOffset--; rendreTout(); },
  semaineSuiv() { semaineOffset++; rendreTout(); },

  choisirRepas({ jour }) {
    const cle = cleSemaine(semaineOffset);
    const plan = (state.weekPlans[cle] || {})[jour];
    ouvrirModale(`<h3>Repas du ${JOURS_LONGS[jour]}</h3>
      <div class="pick-list" style="max-height:40vh;overflow-y:auto">
        ${state.recipes.map(r => `<button data-action="poserRecette" data-jour="${jour}" data-id="${r.id}">${r.emoji} ${esc(r.name)}</button>`).join('')}
      </div>
      <div class="form-field" style="margin-top:12px"><label>Ou écris un repas</label>
        <input id="f-repas-libre" placeholder="ex : restes, resto, tartines…" value="${plan?.type === 'custom' ? esc(plan.name) : ''}"></div>
      <div class="modal-actions">
        ${plan ? `<button class="btn-danger" data-action="retirerRepas" data-jour="${jour}">Retirer</button>` : ''}
        <button class="btn-primary" data-action="poserRepasLibre" data-jour="${jour}">Valider</button>
      </div>`);
  },

  poserRecette({ jour, id }) {
    const cle = cleSemaine(semaineOffset);
    (state.weekPlans[cle] ||= {})[jour] = { type: 'recipe', id };
    sauver('weekPlans');
    fermerModale();
    rendreTout();
  },

  poserRepasLibre({ jour }) {
    const nom = $('#f-repas-libre').value.trim();
    if (!nom) { fermerModale(); return; }
    const cle = cleSemaine(semaineOffset);
    (state.weekPlans[cle] ||= {})[jour] = { type: 'custom', name: nom };
    sauver('weekPlans');
    fermerModale();
    rendreTout();
  },

  retirerRepas({ jour }) {
    const cle = cleSemaine(semaineOffset);
    if (state.weekPlans[cle]) delete state.weekPlans[cle][jour];
    sauver('weekPlans');
    fermerModale();
    rendreTout();
  },

  suggererSemaine() {
    const cle = cleSemaine(semaineOffset);
    const semaine = (state.weekPlans[cle] ||= {});
    const clePrec = cleSemaine(semaineOffset - 1);
    const dejaPris = new Set();
    for (const p of [...Object.values(state.weekPlans[clePrec] || {}), ...Object.values(semaine)]) {
      if (p?.type === 'recipe') dejaPris.add(p.id);
    }
    // règles : pas de répétition sur 2 semaines, max 1 poisson et 1 pâtes par semaine
    const compteTag = tag => Object.values(semaine).filter(p => {
      if (p?.type !== 'recipe') return false;
      return (state.recipes.find(r => r.id === p.id)?.tags || []).includes(tag);
    }).length;
    let poisson = compteTag('poisson'), pates = compteTag('pâtes');

    // seuls les "vrais dîners" sont proposés (pas les desserts, apéros ou accompagnements)
    const pool = state.recipes
      .filter(r => !dejaPris.has(r.id) && !(r.tags || []).some(t => TAGS_PAS_DINER.includes(t)))
      .sort(() => Math.random() - 0.5);
    let ajouts = 0;
    for (let j = 0; j < 7; j++) {
      if (semaine[j]) continue;
      const idx = pool.findIndex(r => {
        const t = r.tags || [];
        return !(t.includes('poisson') && poisson >= 1) && !(t.includes('pâtes') && pates >= 1);
      });
      if (idx === -1) break;
      const r = pool.splice(idx, 1)[0];
      if ((r.tags || []).includes('poisson')) poisson++;
      if ((r.tags || []).includes('pâtes')) pates++;
      semaine[j] = { type: 'recipe', id: r.id };
      ajouts++;
    }
    sauver('weekPlans');
    toast(ajouts ? `✨ ${ajouts} repas proposé${ajouts > 1 ? 's' : ''} ! Touche un jour pour changer.` : 'La semaine est déjà remplie ! Retire un repas pour changer.');
    rendreTout();
  },

  importerNotion() {
    const nouvelles = resteNotion();
    for (const r of nouvelles) {
      state.recipes.push({ id: uid(), name: r.name, emoji: r.emoji, tags: r.tags, ingredients: '' });
    }
    state.recipes.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    sauver('recipes');
    confettis(60);
    toast(`📥 ${nouvelles.length} recettes Notion importées !`);
    rendreTout();
  },

  editerRecette({ id }) {
    const r = state.recipes.find(x => x.id === id) || { name: '', emoji: '🥘', tags: [], ingredients: '' };
    ouvrirModale(`<h3>${id ? 'Modifier la recette' : 'Nouvelle recette'}</h3>
      <div class="form-field"><label>Nom</label><input id="f-nom" value="${esc(r.name)}" placeholder="ex : Gratin de courgettes"></div>
      <div class="form-field"><label>Emoji</label>${pickerEmoji(EMOJIS_RECETTE, r.emoji)}</div>
      <div class="form-field"><label>Étiquettes</label>${pickerChips(TAGS_RECETTE.map(t => ({ val: t, label: t })), r.tags || [], 'tags')}</div>
      <div class="form-field"><label>Ingrédients (un par ligne, avec la quantité devant)</label>
        <textarea id="f-ingredients" placeholder="500g pâtes\n1 oignon\nfromage râpé">${esc(r.ingredients || '')}</textarea></div>
      <div class="modal-actions">
        ${id ? `<button class="btn-danger" data-action="supprimerRecette" data-id="${id}">Supprimer</button>` : ''}
        <button class="btn-primary" data-action="sauverRecette" data-id="${id || ''}">Enregistrer</button>
      </div>`);
  },

  sauverRecette({ id }) {
    const nom = $('#f-nom').value.trim();
    if (!nom) { toast('Il faut un nom !'); return; }
    const data = { name: nom, emoji: valPick('emoji') || '🥘', tags: valPick('tags'), ingredients: $('#f-ingredients').value.trim() };
    if (id) Object.assign(state.recipes.find(x => x.id === id), data);
    else state.recipes.push({ id: uid(), ...data });
    sauver('recipes');
    fermerModale();
    rendreTout();
  },

  supprimerRecette({ id }) {
    state.recipes = state.recipes.filter(x => x.id !== id);
    sauver('recipes');
    fermerModale();
    rendreTout();
  },

  // --- Courses ---

  genererDepuisRepas() {
    const cle = cleSemaine();
    const semaine = state.weekPlans[cle] || {};
    const recettes = Object.values(semaine)
      .filter(p => p?.type === 'recipe')
      .map(p => state.recipes.find(r => r.id === p.id))
      .filter(Boolean);
    if (!recettes.length) { toast('Aucune recette prévue cette semaine — va dans Repas !'); return; }

    // fusionne les ingrédients de toutes les recettes de la semaine
    const fusion = new Map();
    for (const r of recettes) {
      for (const ligne of (r.ingredients || '').split('\n')) {
        if (!ligne.trim()) continue;
        const { qty, name } = parserIngredient(ligne);
        const k = norm(name);
        if (fusion.has(k)) fusion.get(k).qty = fusionnerQte(fusion.get(k).qty, qty);
        else fusion.set(k, { name, qty });
      }
    }

    // passage "produits de base" : coche ce que tu as déjà, on l'enlève
    const base = [...fusion.values()].filter(i => PRODUITS_DE_BASE.some(b => contientMot(i.name, b)));
    const ajouterTout = () => {
      for (const i of fusion.values()) ajouterArticle(i.name, i.qty, 'repas');
      sauver('grocery');
      toast(`🛒 ${fusion.size} ingrédient${fusion.size > 1 ? 's' : ''} ajouté${fusion.size > 1 ? 's' : ''} à la liste !`);
      rendreTout();
    };
    if (!base.length) { ajouterTout(); return; }

    actions._fusionEnCours = { fusion, ajouterTout };
    ouvrirModale(`<h3>🏠 Tu as déjà… ?</h3>
      <p class="empty-msg" style="text-align:left">Coche ce que tu as déjà à la maison — on ne le mettra pas sur la liste.</p>
      <div class="pick-list">${base.map(i =>
        `<button type="button" class="pantry-item" data-nom="${esc(norm(i.name))}">⬜ ${esc(i.name)}</button>`).join('')}</div>
      <div class="modal-actions"><button class="btn-primary" data-action="validerGarde-manger">Créer la liste</button></div>`);
    document.querySelectorAll('.pantry-item').forEach(b => b.addEventListener('click', () => {
      b.classList.toggle('sel');
      b.textContent = (b.classList.contains('sel') ? '✅ ' : '⬜ ') + b.textContent.slice(2);
      b.style.background = b.classList.contains('sel') ? '#e9f9f1' : '';
    }));
  },

  'validerGarde-manger'() {
    const { fusion, ajouterTout } = actions._fusionEnCours;
    for (const b of document.querySelectorAll('.pantry-item.sel')) fusion.delete(b.dataset.nom);
    fermerModale();
    ajouterTout();
  },

  ajouterManuel() {
    const input = $('#grocery-input');
    const { qty, name } = parserIngredient(input.value);
    if (!name) return;
    ajouterArticle(name, qty, 'manuel');
    sauver('grocery');
    rendreTout();
    setTimeout(() => $('#grocery-input')?.focus(), 50);
  },

  ajouterSuggestion({ nom }) {
    ajouterArticle(nom, '', 'suggestion');
    sauver('grocery');
    toast(`➕ ${nom} ajouté !`);
    rendreTout();
  },

  cocherArticle({ id }) {
    const g = state.grocery.find(x => x.id === id);
    g.checked = !g.checked;
    sauver('grocery');
    rendreTout();
  },

  supprimerArticle({ id }) {
    state.grocery = state.grocery.filter(x => x.id !== id);
    sauver('grocery');
    rendreTout();
  },

  modeMagasin() { modeMagasin = !modeMagasin; rendreTout(); },

  finirCourses() {
    const achetes = state.grocery.filter(g => g.checked);
    for (const g of achetes) {
      const k = norm(g.name);
      const h = (state.groceryHistory[k] ||= { name: g.name, count: 0, last: 0 });
      h.count++;
      h.last = Date.now();
    }
    state.grocery = state.grocery.filter(g => !g.checked);
    sauver('grocery', 'groceryHistory');
    confettis(50);
    toast(`✅ Courses terminées — ${achetes.length} article${achetes.length > 1 ? 's' : ''} !`);
    rendreTout();
  },

  // --- Agenda ---

  modifierAgenda() {
    ouvrirModale(`<h3>📅 Lien Google Agenda</h3>
      <div class="form-field"><label>Colle le lien d'intégration (ou tout le code iframe)</label>
        <textarea id="f-agenda" placeholder="https://calendar.google.com/calendar/embed?...">${esc(state.settings.calendarUrl || '')}</textarea></div>
      <div class="modal-actions">
        ${state.settings.calendarUrl ? `<button class="btn-danger" data-action="retirerAgenda">Retirer</button>` : ''}
        <button class="btn-primary" data-action="sauverAgenda">Enregistrer</button>
      </div>`);
  },

  sauverAgenda() {
    let txt = $('#f-agenda').value.trim();
    const m = txt.match(/src="([^"]+)"/);
    if (m) txt = m[1].replace(/&amp;/g, '&');
    if (!txt.includes('calendar.google.com')) { toast('Ce lien ne ressemble pas à un agenda Google 🤔'); return; }
    state.settings.calendarUrl = txt;
    sauver('settings');
    fermerModale();
    rendreTout();
  },

  retirerAgenda() {
    delete state.settings.calendarUrl;
    sauver('settings');
    fermerModale();
    rendreTout();
  },

  // --- Famille ---

  gererFamille() {
    ouvrirModale(`<h3>👨‍👩‍👧‍👦 La famille</h3>
      <div class="pick-list">${state.profiles.map(p =>
        `<button data-action="editerProfil" data-id="${p.id}"><span style="font-size:24px">${p.emoji}</span> ${esc(p.name)}
         <span style="margin-left:auto;font-size:12px;color:var(--texte-doux)">${p.role === 'parent' ? 'Parent' : 'Enfant'} ✏️</span></button>`).join('')}</div>
      <div class="modal-actions"><button class="btn-secondary" data-action="editerProfil">➕ Ajouter un membre</button></div>`);
  },

  editerProfil({ id }) {
    const p = state.profiles.find(x => x.id === id) || { name: '', emoji: '🌟', color: COULEURS[4], role: 'enfant' };
    ouvrirModale(`<h3>${id ? 'Modifier ' + esc(p.name) : 'Nouveau membre'}</h3>
      <div class="form-field"><label>Prénom</label><input id="f-nom" value="${esc(p.name)}"></div>
      <div class="form-field"><label>Avatar</label>${pickerEmoji(EMOJIS_PERSONNE, p.emoji)}</div>
      <div class="form-field"><label>Couleur</label>${pickerCouleur(p.color)}</div>
      <div class="form-field"><label>Rôle</label><select id="f-role">
        <option value="parent" ${p.role === 'parent' ? 'selected' : ''}>Parent (peut tout modifier)</option>
        <option value="enfant" ${p.role === 'enfant' ? 'selected' : ''}>Enfant</option>
      </select></div>
      <div class="modal-actions">
        ${id ? `<button class="btn-danger" data-action="supprimerProfil" data-id="${id}">Supprimer</button>` : ''}
        <button class="btn-primary" data-action="sauverProfil" data-id="${id || ''}">Enregistrer</button>
      </div>`);
  },

  sauverProfil({ id }) {
    const nom = $('#f-nom').value.trim();
    if (!nom) { toast('Il faut un prénom !'); return; }
    const data = { name: nom, emoji: valPick('emoji') || '🌟', color: valPick('color') || COULEURS[4], role: $('#f-role').value };
    if (id) Object.assign(state.profiles.find(x => x.id === id), data);
    else state.profiles.push({ id: uid(), ...data });
    sauver('profiles');
    fermerModale();
    rendreTout();
  },

  supprimerProfil({ id }) {
    const p = state.profiles.find(x => x.id === id);
    const parents = state.profiles.filter(x => x.role === 'parent');
    if (p.role === 'parent' && parents.length === 1) { toast('Impossible : il faut au moins un parent !'); return; }
    state.profiles = state.profiles.filter(x => x.id !== id);
    for (const c of state.chores) c.assignees = c.assignees.filter(a => a !== id);
    sauver('profiles', 'chores');
    fermerModale();
    if (device.profileId === id) montrerQui();
    else rendreTout();
  },

  fermer() { fermerModale(); },
};

// Un seul écouteur de clics pour toutes les actions data-action
document.addEventListener('click', e => {
  // l'élément avec data-action le plus proche du clic gagne (bouton dans une ligne, etc.)
  const el = e.target.closest('[data-action]');
  if (el) actions[el.dataset.action]?.(el.dataset, el);
});

// ---------- C'est parti ! ----------
demarrer();
