/* ==========================================================================
   Ria V2 — interactive prototype
   Built from the "Ria AI Redesign" V2 screen set (390 x 844).
   Single phone, real state: plan edits, food log and totals all recompute.
   ========================================================================== */

/* ---------------------------------- icons -------------------------------- */
const S = (d, w = 22, extra = '') =>
  `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${d}</svg>`;

const I = {
  user: w => S('<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.8-3.6 3.6-5.4 7-5.4s6.2 1.8 7 5.4"/>', w),
  logo: w => S('<path d="M4 8l4 4 4-6 4 6 4-4-1.5 10h-13z"/>', w),
  chevD: w => S('<path d="M6 9.5l6 6 6-6"/>', w),
  book: w => S('<path d="M5 5a2 2 0 0 1 2-2h11v16H7a2 2 0 0 0-2 2z"/><path d="M9 7h6M9 11h4"/>', w),
  chevR: w => S('<path d="M9 6l6 6-6 6"/>', w),
  back: w => S('<path d="M19 12H5"/><path d="M11 6l-6 6 6 6"/>', w),
  close: w => S('<path d="M6 6l12 12M18 6L6 18"/>', w),
  bolt: w => S('<path d="M3 12h4l3-7 4 14 3-7h4"/>', w),
  cutlery: w => S('<path d="M6 3v7a2 2 0 0 0 2 2v9"/><path d="M10 3v7a2 2 0 0 1-2 2"/><path d="M8 3v6"/><path d="M17 21V3c-2 1-3 3.5-3 7h3"/>', w),
  home: w => S('<path d="M4 10.4L12 4l8 6.4V19a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19z"/>', w),
  doc: w => S('<path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4h4"/>', w),
  streak: w => S('<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>', w),
  plus: w => S('<path d="M12 5v14M5 12h14"/>', w),
  minus: w => S('<path d="M5 12h14"/>', w),
  mic: w => S('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0"/><path d="M12 17.5V21"/>', w),
  camera: w => S('<path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.5-2h5.6l1.5 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/>', w),
  keyboard: w => S('<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/>', w),
  clipboard: w => S('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9z"/><path d="M9 11h6M9 15h4"/>', w),
  bulb: w => S('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/>', w),
  chart: w => S('<path d="M4 20h16"/><path d="M7 16v-4M12 16V8M17 16V5"/>', w),
  grid: w => S('<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>', w),
  eq: w => S('<path d="M6 10v4M10 7v10M14 9v6M18 11v2"/>', w, 'stroke-width="2"'),
  dots: w => S('<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>', w),
  info: w => S('<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>', w),
  check: w => S('<path d="M5 12.5l4.5 4.5L19 7"/>', w, 'stroke-width="2.2"'),
  undo: w => S('<path d="M4 9h9.5a4.5 4.5 0 0 1 0 9H7"/><path d="M7.5 5.5L4 9l3.5 3.5"/>', w),
  swap: w => S('<path d="M4 8h12l-3-3M20 16H8l3 3"/>', w),
  pencil: w => S('<path d="M5 19h3l10-10-3-3L5 16z"/><path d="M14.5 6.5l3 3"/>', w),
  sparkIco: (w = 26) =>
    `<svg width="${w}" height="${w}" viewBox="0 0 24 24" aria-hidden="true" class="spark"><path d="M14.5 8l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill="#39CA97"/><path d="M6.5 3.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="#39CA97"/></svg>`,
};

/* ---------------------------------- data --------------------------------- */
/* Per-unit nutrition, so every swap and stepper recomputes for real. */
const COMP = {
  paneer:  { cal: 2.96, p: 0.18, f: 0.22, c: 0.04,  fb: 0 },
  tofu:    { cal: 1.76, p: 0.13, f: 0.10, c: 0.02,  fb: 0.01 },
  soya:    { cal: 2.20, p: 0.25, f: 0.04, c: 0.18,  fb: 0.05 },
  roti:    { cal: 84,   p: 3,    f: 1.8,  c: 15,    fb: 2.4 },
  rice:    { cal: 216,  p: 5,    f: 1.8,  c: 45,    fb: 3.5 },
  millet:  { cal: 207,  p: 6,    f: 1.7,  c: 41,    fb: 4.2 },
  quinoa:  { cal: 222,  p: 8,    f: 3.6,  c: 39,    fb: 5.2 },
  dal:     { cal: 198,  p: 11,   f: 7,    c: 33,    fb: 7.5 },
  poriyal: { cal: 90,   p: 2.25, f: 1.65, c: 7,     fb: 0.9 },
  chana:   { cal: 3.6,  p: 0.20, f: 0.09, c: 0.55,  fb: 0.17 },
  curd:    { cal: 0.97, p: 0.10, f: 0.05, c: 0.036, fb: 0 },
  peanuts: { cal: 5.67, p: 0.26, f: 0.49, c: 0.16,  fb: 0.085 },
  fruit:   { cal: 112,  p: 2,    f: 1.3,  c: 21.5,  fb: 1.9 },
  almonds: { cal: 5.79, p: 0.21, f: 0.50, c: 0.22,  fb: 0.125 },
  walnuts: { cal: 6.54, p: 0.15, f: 0.65, c: 0.14,  fb: 0.067 },
  seeds:   { cal: 5.59, p: 0.30, f: 0.49, c: 0.11,  fb: 0.060 },
  veg:     { cal: 0,    p: 0,    f: 0,    c: 0,     fb: 0 },
};

const HALVES = { 0.25: '¼', 0.5: '½', 0.75: '¾', 1: '1', 1.25: '1¼', 1.5: '1½', 1.75: '1¾', 2: '2' };
const qty = n => HALVES[n] !== undefined ? HALVES[n] : String(n);

/* Each swappable meal is one choice plus two portions, over a fixed remainder.
   Dinner was modelled this way already; lunch and snack now share the shape, so
   one sheet drives all three. */
const RECIPES = {
  'Morning snack': {
    group: 'Base',
    options: [
      { id: 'almonds', comp: 'almonds', name: 'Almonds', tag: 'Current',    short: 'almonds' },
      { id: 'walnuts', comp: 'walnuts', name: 'Walnuts', tag: 'Omega-3',    short: 'walnuts' },
      { id: 'seeds',   comp: 'seeds',   name: 'Seeds',   tag: 'More iron',  short: 'pumpkin seeds' },
    ],
    main: { unit: 'g', min: 5, max: 40, step: 5 },
    side: { comp: 'fruit', name: 'Fruit', unit: 'fruit', min: 0, max: 2, step: 1 },
    fixed: {},
    dish: (o, main, side) => side ? `${o.name} with fruit` : `A handful of ${o.short}`,
    items: (o, main, side) =>
      `${qty(main)} g ${o.name.toLowerCase()}${side ? ` • ${qty(side)} fruit` : ''}`,
  },
  Lunch: {
    group: 'Grain',
    options: [
      { id: 'rice',   comp: 'rice',   name: 'Rice',   tag: 'Current',      short: 'brown rice' },
      { id: 'millet', comp: 'millet', name: 'Millet', tag: 'More fibre',   short: 'millet' },
      { id: 'quinoa', comp: 'quinoa', name: 'Quinoa', tag: 'More protein', short: 'quinoa' },
    ],
    main: { unit: 'cup', min: 0.25, max: 1.5, step: 0.25 },
    side: { comp: 'dal', name: 'Dal', unit: 'cup', min: 0.5, max: 2, step: 0.5 },
    fixed: { poriyal: 1 },
    dish: o => `Dal, ${o.short} and poriyal`,
    items: (o, main, side) =>
      `${qty(side)} cup dal • ${qty(main)} cup ${o.name.toLowerCase()} • 1 cup poriyal`,
  },
  'Evening snack': {
    group: 'Protein',
    options: [
      { id: 'chana',   comp: 'chana',   name: 'Chana',   tag: 'Current',      short: 'roasted chana' },
      { id: 'curd',    comp: 'curd',    name: 'Curd',    tag: 'Lighter',      short: 'Greek curd' },
      { id: 'peanuts', comp: 'peanuts', name: 'Peanuts', tag: 'Healthy fats', short: 'peanuts' },
    ],
    main: { unit: 'g', min: 10, max: 150, step: 10 },
    side: { comp: 'fruit', name: 'Fruit', unit: 'fruit', min: 0, max: 2, step: 1 },
    fixed: {},
    dish: o => `Fruit with ${o.short}`,
    items: (o, main, side) =>
      `${side ? `${qty(side)} fruit • ` : ''}${qty(main)} g ${o.name.toLowerCase()}`,
  },
  Dinner: {
    group: 'Protein',
    options: [
      { id: 'paneer', comp: 'paneer', name: 'Paneer', tag: 'Dairy',         short: 'paneer' },
      { id: 'tofu',   comp: 'tofu',   name: 'Tofu',   tag: 'Dairy-free',    short: 'tofu' },
      { id: 'soya',   comp: 'soya',   name: 'Soya',   tag: 'More protein',  short: 'soya' },
    ],
    main: { unit: 'g', min: 50, max: 200, step: 25 },
    side: { comp: 'roti', name: 'Whole-wheat roti', unit: 'roti', min: 0, max: 4, step: 1 },
    fixed: { veg: 1 },
    dish: o => `${o.name} bhurji with roti`,
    items: (o, main, side) =>
      `${qty(main)} g ${o.name.toLowerCase()} • ${qty(side)} roti${side === 1 ? '' : 's'} • vegetables`,
  },
};

const recipeOf = m => m.recipe && RECIPES[m.kind];
const optionOf = m => recipeOf(m).options.find(o => o.id === m.recipe.opt);

const EGG = {
  Boiled:     { cal: 156, p: 13, f: 11, c: 1, fb: 0, name: 'Eggs, whole, boiled',    short: 'boiled eggs' },
  Fried:      { cal: 181, p: 13, f: 14, c: 1, fb: 0, name: 'Eggs, whole, fried',     short: 'fried eggs' },
  Scrambled:  { cal: 182, p: 13, f: 14, c: 1, fb: 0, name: 'Eggs, whole, scrambled', short: 'scrambled eggs' },
  Omelette:   { cal: 188, p: 14, f: 15, c: 1, fb: 0, name: 'Eggs, omelette',         short: 'omelette' },
  'Not sure': { cal: 156, p: 13, f: 11, c: 1, fb: 0, name: 'Eggs, whole, boiled',    short: 'boiled eggs' },
};

/* The food log names meals the way the app does; the plan names them its own way. */
const LOG_SLOT = {
  Breakfast: 'Breakfast', 'Morning snack': 'Morning snack', Lunch: 'Lunch',
  'Evening snack': 'Evening snack', Dinner: 'Dinner',
};
const SLOT_OF_LOG = Object.fromEntries(Object.entries(LOG_SLOT).map(([k, v]) => [v, k]));

/* Ideas are per meal, because a 420 Cal rajma is a fine dinner and a silly snack. */
/* Lunch is the fuller, grain-forward meal; dinner is lighter. They no longer
   share a list, so asking about each gives a different answer. */
const LUNCH_IDEAS = [
  [
    { id: 'rajma-rice',   name: 'Rajma with brown rice',       items: '1 cup rajma • ¾ cup rice',
      mins: 35, cal: 420, p: 17, f: 7,  c: 72, fb: 12, why: 'Protein from rajma' },
    { id: 'chana-pulao',  name: 'Chana pulao with raita',      items: '1 cup pulao • ½ cup raita',
      mins: 30, cal: 390, p: 15, f: 10, c: 60, fb: 9,  why: 'Protein from chana' },
    { id: 'khichdi',      name: 'Vegetable khichdi with curd', items: '1½ cup khichdi • ½ cup curd',
      mins: 25, cal: 380, p: 14, f: 8,  c: 60, fb: 9,  why: 'One pot, easy on the stomach' },
  ],
  [
    { id: 'curd-rice',    name: 'Curd rice with kosambari',    items: '1 cup curd rice • ½ cup kosambari',
      mins: 15, cal: 360, p: 12, f: 9,  c: 56, fb: 6,  why: 'Cooling, quick to put together' },
    { id: 'chole-roti',   name: 'Chole with 2 roti',           items: '1 cup chole • 2 roti',
      mins: 35, cal: 430, p: 16, f: 11, c: 64, fb: 13, why: 'Fibre and plant protein' },
    { id: 'bisibele',     name: 'Bisi bele bath',              items: '1½ cup',
      mins: 30, cal: 400, p: 13, f: 10, c: 64, fb: 8,  why: 'Lentils and rice in one pot' },
  ],
];

const DINNER_IDEAS = [
  [
    { id: 'moong-chilla', name: 'Moong dal chilla with curd',  items: '2 chilla • ½ cup curd',
      mins: 20, cal: 320, p: 18, f: 9,  c: 42, fb: 8, why: 'Protein from moong and curd' },
    { id: 'bharta',       name: 'Baingan bharta with roti',    items: '1 cup bharta • 2 roti',
      mins: 30, cal: 300, p: 9,  f: 12, c: 38, fb: 8, why: 'Smoky, mostly vegetables' },
    { id: 'sambar-idli',  name: 'Sambar with 2 idli',          items: '1 cup sambar • 2 idli',
      mins: 15, cal: 280, p: 11, f: 5,  c: 50, fb: 7, why: 'Light, quick to put together' },
  ],
  [
    { id: 'stew-appam',   name: 'Vegetable stew with appam',   items: '1 cup stew • 2 appam',
      mins: 30, cal: 340, p: 9,  f: 13, c: 48, fb: 6, why: 'Light and warming' },
    { id: 'thepla',       name: 'Methi thepla with curd',      items: '3 thepla • ½ cup curd',
      mins: 25, cal: 310, p: 12, f: 11, c: 40, fb: 7, why: 'Greens with some protein' },
    { id: 'dalia',        name: 'Vegetable dalia',             items: '1½ cup dalia',
      mins: 25, cal: 300, p: 10, f: 6,  c: 52, fb: 8, why: 'Light grain, lots of vegetables' },
  ],
];

const SNACK_IDEAS = [
  [
    { id: 'makhana',      name: 'Roasted makhana',         items: '40 g makhana',
      mins: 10, cal: 160, p: 5,  f: 6,  c: 23, fb: 4, why: 'Light and crunchy' },
    { id: 'boiled-eggs',  name: 'Boiled eggs with pepper', items: '2 large eggs',
      mins: 10, cal: 156, p: 13, f: 11, c: 1,  fb: 0, why: 'Quick and filling' },
    { id: 'masala-corn',  name: 'Masala corn',             items: '1 cup sweetcorn',
      mins: 10, cal: 150, p: 5,  f: 2,  c: 32, fb: 4, why: 'Warm and filling' },
  ],
  [
    { id: 'dal-soup',     name: 'Moong dal soup',          items: '1 bowl',
      mins: 15, cal: 140, p: 9,  f: 2,  c: 20, fb: 5, why: 'Protein without much fat' },
    { id: 'paneer-tikka', name: 'Paneer tikka bites',      items: '60 g paneer',
      mins: 20, cal: 190, p: 13, f: 12, c: 4,  fb: 1, why: 'High protein, low carb' },
    { id: 'fruit-lime',   name: 'Fruit bowl with lime',    items: '1 bowl mixed fruit',
      mins: 5,  cal: 120, p: 2,  f: 1,  c: 28, fb: 4, why: 'Simple and light' },
  ],
];

const BREAKFAST_IDEAS = [
  [
    { id: 'pesarattu', name: 'Pesarattu with curd',        items: '2 pesarattu • ½ cup curd',
      mins: 25, cal: 350, p: 14, f: 9,  c: 52, fb: 7, why: 'Protein from moong' },
    { id: 'upma',      name: 'Vegetable upma',             items: '1 cup upma • vegetables',
      mins: 20, cal: 300, p: 8,  f: 10, c: 45, fb: 5, why: 'Quick and warm' },
    { id: 'besan',     name: 'Besan chilla with chutney',  items: '2 chilla • chutney',
      mins: 15, cal: 280, p: 14, f: 10, c: 32, fb: 6, why: 'High protein, low carb' },
  ],
];

const MORNING_IDEAS = [
  [
    { id: 'banana-pb',     name: 'Banana with peanut butter', items: '1 banana • 10 g peanut butter',
      mins: 5,  cal: 180, p: 5, f: 8, c: 25, fb: 3, why: 'Quick energy with some protein' },
    { id: 'buttermilk',    name: 'Buttermilk',                items: '1 glass chaas',
      mins: 5,  cal: 60,  p: 3, f: 2, c: 7,  fb: 0, why: 'Light and hydrating' },
    { id: 'sprouts-lime',  name: 'Sprouts with lime',         items: '½ cup moong sprouts',
      mins: 10, cal: 120, p: 8, f: 1, c: 18, fb: 5, why: 'Protein, barely any fat' },
  ],
  [
    { id: 'coconut-dates', name: 'Coconut water with dates',  items: '1 glass • 2 dates',
      mins: 5,  cal: 140, p: 2, f: 0, c: 34, fb: 3, why: 'Easy energy before lunch' },
    { id: 'corn-lime',     name: 'Boiled corn with lime',     items: '1 cup sweetcorn',
      mins: 10, cal: 130, p: 4, f: 1, c: 29, fb: 4, why: 'Fibre and very little fat' },
    { id: 'guava',         name: 'Guava with chaat masala',   items: '1 guava',
      mins: 5,  cal: 70,  p: 2, f: 1, c: 16, fb: 5, why: 'Mostly fibre, barely any calories' },
  ],
];

const IDEAS = {
  Breakfast: BREAKFAST_IDEAS, 'Morning snack': MORNING_IDEAS, Lunch: LUNCH_IDEAS,
  'Evening snack': SNACK_IDEAS, Dinner: DINNER_IDEAS,
};

const TARGETS = { cal: 1500, p: 75, f: 50, c: 170, fb: 30 };

function freshState() {
  return {
    screen: 'home',
    back: false,
    sheet: null,                     // 'ria' | 'swap'
    voice: null,                     // { phase, text }
    composer: '',
    plan: {
      status: 'draft',               // 'draft' | 'logged'
      updated: null,
      meals: [
        { kind: 'Breakfast', name: 'Idli with coconut chutney', items: '4 idli • 15 g coconut chutney',
          state: 'eaten', cal: 259, p: 8, f: 4, c: 49, fb: 3 },
        { kind: 'Morning snack',  state: 'planned', recipe: { opt: 'almonds', main: 15,   side: 0 } },
        { kind: 'Lunch',          state: 'planned', recipe: { opt: 'rice',    main: 0.75, side: 1 } },
        { kind: 'Evening snack',  state: 'planned', recipe: { opt: 'chana',   main: 30,   side: 1 } },
        { kind: 'Dinner',         state: 'planned', recipe: { opt: 'paneer',  main: 100,  side: 1 }, changed: false },
      ],
    },
    log: [
      { meal: 'Breakfast',     name: 'Idli with coconut chutney', short: 'idli with chutney', qty: '4 idli, 15 g chutney', cal: 259, p: 8, f: 4, c: 49, fb: 3 },
      { meal: 'Evening snack', name: 'Khakra',              short: 'khakra',              qty: '0.5 piece',                cal: 55,  p: 2,  f: 1.5, c: 9, fb: 1 },
    ],
    messages: [],
    msgSeq: 0,
    typing: false,
    pending: null,                   // clarifying question in flight
    lastEgg: null,                   // id of the logged egg entry
    swap: null,                      // draft of the swap sheet
    flash: null,
    logUndo: null,                   // snapshot taken before "Log plan", so it stays reversible
    tab: 'home',
  };
}
let st = freshState();

/* ------------------------------- utilities ------------------------------- */
const app = () => document.getElementById('app');
const ov = () => document.getElementById('overlay');
const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const r0 = n => Math.round(n);
const fmt = n => r0(n).toLocaleString('en-US');

let clockMin = 17 * 60 + 29;          // the deck's 5:29 pm moment
function stamp(offset = 0) {
  const t = clockMin + offset;
  const h24 = Math.floor(t / 60) % 24, m = t % 60;
  const ap = h24 >= 12 ? 'pm' : 'am';
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}
function tick(mins = 1) { clockMin += mins; paintClock(); }
function paintClock() {
  const h24 = Math.floor(clockMin / 60) % 24, m = clockMin % 60;
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  document.getElementById('clock').textContent = `${h}:${String(m).padStart(2, '0')}`;
}

/* A meal with a recipe is computed from its parts; a meal that has been logged
   carries the logged totals instead. */
function recipeMacros(m) {
  const r = RECIPES[m.kind], { opt, main, side } = m.recipe;
  const parts = [[r.options.find(o => o.id === opt).comp, main], [r.side.comp, side],
                 ...Object.entries(r.fixed)];
  const out = { cal: 0, p: 0, f: 0, c: 0, fb: 0 };
  for (const [comp, n] of parts) for (const k in out) out[k] += COMP[comp][k] * n;
  return out;
}

function mealMacros(m) {
  if (recipeOf(m)) return recipeMacros(m);
  return { cal: m.cal, p: m.p, f: m.f, c: m.c, fb: m.fb };
}

function mealName(m) {
  return recipeOf(m) ? RECIPES[m.kind].dish(optionOf(m)) : m.name;
}

function mealItems(m) {
  if (!recipeOf(m)) return m.items;
  return RECIPES[m.kind].items(optionOf(m), m.recipe.main, m.recipe.side);
}

/* A meal can be swapped while it is still planned; once it is eaten the card
   shows what was logged and there is nothing left to choose. */
function canSwap(m) { return !!recipeOf(m) && m.state !== 'eaten'; }

/* What to suggest for: the first meal of the day still to come. Breakfast is
   already eaten, so "suggest a meal" means lunch — not dinner. */
function nextMeal() { return st.plan.meals.find(m => m.state !== 'eaten') || null; }
function mealOf(kind) { return st.plan.meals.find(m => m.kind === kind); }
function indexOfMeal(kind) { return st.plan.meals.findIndex(m => m.kind === kind); }

/* Things worth eating alongside a thin meal, ranked by protein per calorie. */
const BOOSTERS = [
  { name: '100 g of curd',     cal: 97,  p: 10 },
  { name: 'two boiled eggs',   cal: 156, p: 13 },
  { name: 'a bowl of sambar',  cal: 110, p: 6 },
  { name: 'a side of sprouts', cal: 60,  p: 5 },
];

/* A meal you have already eaten cannot be changed, but it can be judged — and
   the judgement is what tells you whether the rest of the day has work to do.
   The bar is the day's own ratio: 75 g over 1,500 Cal, so 5 g per 100 Cal. */
function eatenReview() {
  const bar = (TARGETS.p / TARGETS.cal) * 100;
  let worst = null;
  for (const m of st.plan.meals) {
    if (m.state !== 'eaten') continue;
    const mm = mealMacros(m);
    if (mm.cal < 50) continue;
    const density = (mm.p / mm.cal) * 100;
    if (!worst || density < worst.density) worst = { meal: m, macros: mm, density };
  }
  if (!worst) return null;
  const short = ((bar - worst.density) * worst.macros.cal) / 100;
  if (short < 3) return { ...worst, bar, ok: true };
  const booster = [...BOOSTERS].sort((a, b) => b.p / b.cal - a.p / a.cal)[0];
  return { ...worst, bar, short, booster };
}

/* Eaten so far, plus what the rest of the plan will add. The question worth
   answering is not "how am I doing" but "where does today land". */
function dayProjection() {
  const eaten = logTotals();
  const planned = { cal: 0, p: 0, f: 0, c: 0, fb: 0 };
  for (const m of st.plan.meals) {
    if (m.state === 'eaten') continue;
    const mm = mealMacros(m);
    for (const k in planned) planned[k] += mm[k];
  }
  const projected = {};
  for (const k in planned) projected[k] = eaten[k] + planned[k];
  return { eaten, planned, projected };
}

function planTotals() {
  const t = { cal: 0, p: 0, f: 0, c: 0, fb: 0 };
  for (const m of st.plan.meals) {
    const mm = mealMacros(m);
    for (const k in t) t[k] += mm[k];
  }
  return t;
}
function logTotals(meal) {
  const t = { cal: 0, p: 0, f: 0, c: 0, fb: 0 };
  for (const e of st.log) if (!meal || e.meal === meal) for (const k in t) t[k] += e[k];
  return t;
}

/* =============================== rendering =============================== */
function render(opts = {}) {
  const prev = app().firstElementChild;
  const html = st.screen === 'home' ? viewHome()
    : st.screen === 'chat' ? viewChat()
    : viewPlan();
  const cls = `screen${opts.animate === false ? '' : ' screen--enter'}${st.back ? ' screen--back' : ''}`;
  app().innerHTML = `<section class="${cls}" data-screen="${st.screen}">${html}</section>`;
  st.back = false;
  renderOverlay();
  afterPaint();
  document.getElementById('crumb').textContent = crumbText();
  renderGuide();
}

function crumbText() {
  if (st.voice) return 'Voice';
  if (st.sheet === 'swap') return 'Change ' + st.plan.meals[st.swap.i].kind.toLowerCase();
  return { home: 'Home', chat: 'Ria', plan: "Today's plan" }[st.screen];
}

function afterPaint() {
  // animate macro bars + restore scroll positions
  requestAnimationFrame(() => {
    document.querySelectorAll('.bar>i[data-w]').forEach(el => { el.style.width = el.dataset.w + '%'; });
  });
  const thread = document.querySelector('.thread');
  if (thread) {
    const pin = () => { thread.scrollTop = thread.scrollHeight; };
    pin();
    requestAnimationFrame(pin);
    setTimeout(pin, 180);
    setTimeout(pin, 420);
  }
  const body = document.querySelector('.plan__body');
  if (body && st.planScroll) body.scrollTop = st.planScroll;
  if (st.flash) {
    const el = document.querySelector(`[data-meal="${st.flash}"]`);
    if (el) { el.classList.add('meal--flash'); }
    st.flash = null;
  }
  // mark rendered messages so they don't re-animate
  st.messages.forEach(m => { m.seen = true; });
}

/* --------------------------------- home ---------------------------------- */
/* The home screen is the supplied screenshot, used as-is — it already carries its
   own status bar and the Voice / Chat choice. Only Chat is live; its rect was
   measured off the image, so the hit area sits exactly on the button. Voice is
   deliberately inert here. */
const HOTSPOTS = [
  { act: 'chat-open', label: 'Chat with Ria', left: 66.67, top: 69.70, w: 26.95, h: 6.55 },
];

function viewHome() {
  return `
  <div class="photo">
    <img src="assets/home.webp" alt="HealthifySmart home with Ria open" draggable="false">
    ${HOTSPOTS.map(h => `
      <button class="photo__hit" data-act="${h.act}" aria-label="${h.label}"
        style="left:${h.left}%;top:${h.top}%;width:${h.w}%;height:${h.h}%"></button>`).join('')}
  </div>`;
}

/* --------------------------------- chat ---------------------------------- */
function viewChat() {
  return `
  <header class="hdr">
    <button class="iconbtn press" data-act="go-home" aria-label="Back">${I.back(24)}</button>
    <h1>Ria</h1>
    <span style="width:44px" aria-hidden="true"></span>
  </header>
  <div class="thread">
    ${st.messages.map(renderMsg).join('')}
    ${st.typing ? `<div class="ria msg">${I.sparkIco(24)}<div class="typing"><i></i><i></i><i></i></div></div>` : ''}
  </div>
  ${viewComposer()}`;
}

function viewComposer() {
  return `
  <div class="composer">
    <label for="talk" class="sr">Message Ria</label>
    <input id="talk" type="text" placeholder="Talk to Ria" autocomplete="off" data-role="talk" value="${esc(st.composer)}">
    <button class="iconbtn press" data-act="toast" data-msg="Tools tray isn’t part of this prototype" aria-label="More tools" style="color:var(--ink-2)">${I.grid(22)}</button>
    <button class="mic press" data-act="composer-send" aria-label="Send or speak to Ria">${st.composer.trim() ? I.chevR(22) : I.eq(22)}</button>
  </div>`;
}

function renderMsg(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  if (m.role === 'user') {
    return `
    <div class="me ${cls}">
      <div class="me__bubble">${esc(m.text)}</div>
      <div class="stamp">
        ${m.fromVoice ? `<span style="display:inline-flex">${I.mic(14)}</span>From voice • ${m.time}` : m.time}
        ${m.fromVoice && m.editable ? `<button class="btn btn--ghost" style="height:32px;padding:0 4px;font-size:12.5px" data-act="toast" data-msg="Transcript editing isn’t wired in this prototype">Edit text</button>` : ''}
      </div>
    </div>`;
  }
  if (m.kind === 'text') {
    return `<div class="ria ${cls}">${I.sparkIco(24)}<p>${m.text}</p></div>`;
  }
  if (m.kind === 'meta') {
    return `<div class="meta-line ${cls}">${I.check(16)}${esc(m.text)}</div>`;
  }
  if (m.kind === 'summary') {
    return `<div class="ria ${cls}" style="align-items:center">${I.sparkIco(24)}
      <div style="flex:1;display:flex;align-items:center;justify-content:space-between;background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 14px;font-size:13.5px">
        <span>${esc(m.text)}</span><span style="color:var(--muted)">${m.time}</span></div></div>`;
  }
  if (m.kind === 'menu') return renderMenu(m);
  if (m.kind === 'suggest') return renderSuggest(m);
  if (m.kind === 'clarify') return renderClarify(m);
  if (m.kind === 'log') return renderLogCard(m);
  if (m.kind === 'update') return renderUpdateCard(m);
  if (m.kind === 'change') return renderChangeCard(m);
  if (m.kind === 'planbrief') return renderPlanBrief(m);
  if (m.kind === 'nutrition') return renderNutrition(m);
  return '';
}

/* Ria's opening suggestions. Not a menu or a tab — a block of things she
   offers, indented under her first message like any other reply. */
const STARTERS = [
  { act: 'suggest',   ico: 'bulb',  t: 'Suggest a meal',          s: 'A few ideas to choose from' },
  { act: 'nutrition', ico: 'chart', t: 'Understand my nutrition', s: 'Trends and what drives them' },
];

function renderMenu(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  const line = planLine(st.plan.status !== 'draft');
  return `
  <div class="starters indent ${cls}">
    <button class="starter starter--plan press" data-act="plan-open">
      <span class="starter__head">
        <span class="starter__t">Today’s plan</span>
        ${planChip()}
      </span>
      <span class="starter__s">${line}</span>
      <span class="starter__go">Open plan ${I.chevR(15)}</span>
    </button>
    ${STARTERS.map(o => `
      <button class="starter press" data-act="${o.act}">
        <span class="starter__ico">${I[o.ico](18)}</span>
        <span class="starter__txt"><span class="starter__t">${o.t}</span><span class="starter__s">${o.s}</span></span>
      </button>`).join('')}
    <span class="starters__hint">Or just tell me what you need.</span>
  </div>`;
}

/* "Breakfast and snack eaten • lunch and dinner drafted" — written from the plan
   itself, so it keeps up when Ria logs something. */
function nameList(xs) {
  if (!xs.length) return '';
  if (xs.length === 1) return xs[0];
  return `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
}
function planChip() {
  const st_ = st.plan.status;
  const label = st_ === 'logged' ? 'Logged' : st_ === 'saved' ? 'Saved' : 'Draft';
  return `<span class="chip ${st_ === 'draft' ? 'chip--draft' : 'chip--saved'}">${label}</span>`;
}

function planLine(saved) {
  const eaten = st.plan.meals.filter(m => m.state === 'eaten').map(m => m.kind.toLowerCase());
  const rest = st.plan.meals.filter(m => m.state !== 'eaten').map(m => m.kind.toLowerCase());
  const parts = [];
  if (eaten.length) parts.push(`${nameList(eaten)} eaten`);
  if (rest.length) parts.push(`${nameList(rest)} ${saved ? 'planned' : 'drafted'}`);
  const out = parts.join(' • ');
  return out ? out[0].toUpperCase() + out.slice(1) : 'Nothing planned yet';
}

function renderSuggest(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  const ideas = IDEAS[m.slot][m.set];
  return `
  <div class="${cls}">
    <div class="using">
      <span>Using: Vegetarian • Indian meals • Quick</span>
      <button data-act="toast" data-msg="Preference editing isn’t wired in this prototype">Edit</button>
    </div>
    <div style="margin-top:6px;display:flex;flex-direction:column;gap:8px">
      ${ideas.map(i => `
        <div class="idea${m.added === i.id ? ' idea--added' : ''}">
          <div style="flex:1;min-width:0">
            <div class="idea__t">${i.name}</div>
            <div class="idea__m">${i.mins} min • about ${i.cal} Cal</div>
            <div class="idea__w">${i.why}</div>
          </div>
          ${m.added === i.id
            ? `<span class="chip chip--saved" style="height:28px;padding:0 10px">${I.check(14)}Logged</span>`
            : `<button class="btn press" data-act="idea-add" data-id="${i.id}" data-mid="${m.id}">${I.plus(16)}Log</button>`}
        </div>`).join('')}
    </div>
    ${m.added ? '' : `
    <div style="margin-top:10px;display:flex;gap:8px;padding-left:32px">
      <button class="btn press" data-act="ideas-more" data-mid="${m.id}">Different ideas</button>
    </div>`}
  </div>`;
}

function renderClarify(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  return `
  <div class="${cls}">
    <div class="readback indent">
      <div class="kv"><span>Food</span><b>Whole eggs</b></div>
      <div class="kv"><span>Amount</span><b>2 large</b></div>
      <div class="kv"><span>Meal</span><b>Evening snack • Today</b></div>
    </div>
    ${m.answered ? '' : `
    <div class="qcard indent" style="margin-left:32px">
      <div class="qcard__t">How were they cooked?</div>
      <div class="chips" role="group" aria-label="How the eggs were cooked">
        ${Object.keys(EGG).map(k => `<button class="chipbtn press" data-act="egg-pick" data-how="${k}">${k}</button>`).join('')}
      </div>
      <div class="qcard__note">Nothing is logged until you answer.</div>
    </div>`}
  </div>`;
}

function renderLogCard(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  const entries = st.log.filter(e => e.meal === m.meal)
    .sort((x, y) => (y.id === m.entry) - (x.id === m.entry));
  const total = logTotals(m.meal);
  return `
  <div class="logcard ${cls}">
    <div class="logcard__head">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="tick">${I.check(16)}</span>
        <span style="font-size:15px;font-weight:600">Logged to ${m.meal}</span>
      </div>
      ${m.undone
        ? `<span class="chip chip--planned" style="margin-right:8px">Undone</span>`
        : `<button class="btn btn--ghost press" data-act="undo-log" data-mid="${m.id}" style="font-size:13px">${I.undo(16)}Undo</button>`}
    </div>
    <div class="divider"></div>
    ${entries.map(e => `
      <div class="logrow${e.id === m.entry ? '' : ' logrow--muted'}">
        <div>
          <div class="logrow__n">${esc(e.name)}
            ${e.id === m.entry ? '<span class="chip chip--new">Just added</span>'
              : '<span style="font-size:12px;color:var(--muted);font-weight:400">(already logged)</span>'}</div>
          <div class="logrow__q">${esc(e.qty)}</div>
        </div>
        <span class="logrow__c">${fmt(e.cal)} Cal</span>
      </div>`).join('')}
    <div class="divider" style="margin:0 16px"></div>
    <div class="logtotal"><span>${m.meal} total</span><span>${fmt(total.cal)} Cal</span></div>
    ${m.undone ? '' : `<div class="note"><span style="display:inline-flex;margin-top:1px">${I.check(16)}</span>${m.meal} is marked eaten in today’s plan.</div>`}
    <div class="duo">
      <button class="btn press" data-act="toast" data-msg="Entry editing isn’t wired in this prototype">Edit entry</button>
      <button class="btn btn--tint press" data-act="toast" data-msg="Food log isn’t part of this prototype">View food log</button>
    </div>
  </div>`;
}

function renderUpdateCard(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  return `
  <div class="logcard ${cls}">
    <div class="logcard__head">
      <div style="display:flex;align-items:center;gap:10px">
        <span class="tick">${I.check(16)}</span>
        <span style="font-size:15px;font-weight:600">Entry updated</span>
      </div>
      ${m.undone
        ? `<span class="chip chip--planned" style="margin-right:8px">Undone</span>`
        : `<button class="btn btn--ghost press" data-act="undo-update" data-mid="${m.id}" style="font-size:13px">${I.undo(16)}Undo</button>`}
    </div>
    <div class="divider"></div>
    <div style="padding:8px 16px 4px">
      <div style="font-size:15px;font-weight:600">Eggs, whole • 2 large</div>
      <div class="kv" style="min-height:34px"><span style="color:var(--ink-3)">Cooked</span>
        <span><span class="strike">${m.fromHow}</span> → <b style="font-weight:500">${m.toHow}</b></span></div>
      <div class="kv" style="min-height:34px"><span style="color:var(--ink-3)">Calories</span>
        <span><span class="strike">${fmt(m.fromCal)}</span> → <b style="font-weight:500">${fmt(m.toCal)} Cal</b></span></div>
    </div>
    <div class="divider" style="margin:4px 16px"></div>
    <div style="padding:4px 16px 8px">
      <div class="kv" style="min-height:34px"><span style="color:var(--ink-3)">${m.meal} total</span>
        <span><span class="strike">${fmt(m.fromTotal)}</span> → <b>${fmt(m.toTotal)} Cal</b></span></div>
    </div>
    <div class="note"><span style="display:inline-flex;margin-top:1px">${I.info(16)}</span>Only this entry changed. Your khakra stays the same.</div>
    <div style="padding:0 12px 12px">
      <button class="btn btn--tint btn--block press" data-act="toast" data-msg="Food log isn’t part of this prototype">View food log</button>
    </div>
  </div>`;
}

function renderChangeCard(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  return `
  <div class="changecard indent ${cls}">
    <div class="changecard__k">Change to Today’s plan</div>
    <div class="changecard__v"><span class="strike">${m.from}</span> → <b>${m.to}</b> at ${m.slot}</div>
    <div class="changecard__d">${m.slot[0].toUpperCase() + m.slot.slice(1)} about ${fmt(m.fromCal)} → ${fmt(m.toCal)} Cal</div>
    <div style="display:flex;gap:4px;margin-left:-10px">
      ${m.undone
        ? `<span class="chip chip--planned" style="margin:10px 0 10px 10px">Reverted</span>`
        : `<button class="btn btn--ghost press" data-act="undo-change" data-mid="${m.id}">${I.undo(16)}Undo</button>`}
      <button class="btn btn--ghost press" data-act="plan-open">Open plan</button>
    </div>
  </div>`;
}

function renderPlanBrief(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  return `
  <div class="ria ${cls}" style="margin-top:4px">${I.sparkIco(24)}
    <div class="planbrief">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:15px;font-weight:600">Today’s plan</span>
        ${planChip()}
      </div>
      <div class="planbrief__sub">Always shows the latest version${st.plan.updated ? ` • updated ${st.plan.updated}` : ''}</div>
      ${st.plan.meals.map(mm => `
        <div class="planbrief__row">
          <span>${mm.kind}</span>
          <span style="flex:1">${mealName(mm)}</span>
          ${mm.changed ? '<span class="chip chip--saved">Changed</span>' : ''}
        </div>`).join('')}
      <button class="btn btn--ghost press" style="padding:0 10px 0 0" data-act="plan-open">Open plan ${I.chevR(16)}</button>
    </div>
  </div>`;
}

function renderNutrition(m) {
  const cls = `msg${m.seen ? ' msg--seen' : ''}`;
  const { eaten, projected } = dayProjection();
  const next = nextMeal();
  const review = eatenReview();
  const rows = [['Calories', 'cal', 'Cal'], ['Protein', 'p', 'g'], ['Fats', 'f', 'g'], ['Fibre', 'fb', 'g']];
  const over = projected.cal - TARGETS.cal;
  const short = TARGETS.p - projected.p;

  // what to say about where the day lands
  let verdict;
  if (!next) verdict = `You finished on ${fmt(eaten.cal)} Cal and ${fmt(eaten.p)} g protein.`;
  else if (over > 20 && short > 5) verdict = `On this plan you land near ${fmt(projected.cal)} Cal and ${fmt(projected.p)} g protein — a little over on calories and about ${fmt(short)} g short on protein.`;
  else if (short > 5) verdict = `On this plan you land near ${fmt(projected.p)} g protein, about ${fmt(short)} g short of your target.`;
  else if (over > 20) verdict = `On this plan you land near ${fmt(projected.cal)} Cal, about ${fmt(over)} over target.`;
  else verdict = `On this plan you land near ${fmt(projected.cal)} Cal and ${fmt(projected.p)} g protein — right where you want to be.`;

  return `
  <div class="${cls}">
    <div class="card-out indent" style="margin-top:10px;padding:14px 16px 12px">
      <div style="font-size:15px;font-weight:600">Eaten so far today</div>
      <div style="font-size:12.5px;color:var(--muted);margin-bottom:8px">From your food log, not your plan</div>
      ${rows.map(([l, k, u]) => {
        const pctEaten = Math.min(100, (eaten[k] / TARGETS[k]) * 100);
        const pctAll = Math.min(100, (projected[k] / TARGETS[k]) * 100);
        return `
        <div style="margin-top:8px">
          <div style="display:flex;justify-content:space-between;font-size:13px">
            <span style="color:var(--ink-3)">${l}</span>
            <span>${fmt(eaten[k])} / ${fmt(TARGETS[k])} ${u}</span></div>
          <div class="bar bar--stack">
            <i class="bar__plan" data-w="${pctAll.toFixed(1)}"></i>
            <i data-w="${pctEaten.toFixed(1)}"></i>
          </div>
        </div>`;
      }).join('')}
      ${next ? `<div class="legend">${I.check(12)}eaten · <span class="legend__plan"></span>with the rest of your plan</div>` : ''}
    </div>

    ${review ? `
      <p class="answer indent">
        <b>Your ${review.meal.kind.toLowerCase()}</b> — ${esc(review.meal.name.toLowerCase())},
        ${fmt(review.macros.cal)} Cal with ${fmt(review.macros.p)} g protein.
        ${review.ok
          ? 'That carries its weight for the day.'
          : `That is light: your target works out at about ${review.bar.toFixed(0)} g protein per 100 Cal,
             so it came up roughly ${fmt(review.short)} g short. ${review.booster.name[0].toUpperCase() + review.booster.name.slice(1)}
             alongside would have added ${fmt(review.booster.p)} g for ${fmt(review.booster.cal)} Cal.`}
      </p>` : ''}

    <p class="answer indent">${verdict}</p>

    ${next ? `<div class="indent" style="margin-top:10px">
      <button class="btn press" data-act="suggest">${I.bulb(16)}${next.kind} ideas</button>
    </div>` : ''}
  </div>`;
}



/* ----------------------------- plan workspace ---------------------------- */
function viewPlan() {
  const t = planTotals();
  return `
  <header class="hdr">
    <button class="iconbtn press" data-act="plan-back" aria-label="Back">${I.back(24)}</button>
    <h1>Today’s plan</h1>
    <button class="iconbtn press" data-act="toast" data-msg="Plan options aren’t part of this prototype" aria-label="Plan options">${I.dots(22)}</button>
  </header>
  <div class="plan__body">
    <div class="plan__status">
      ${planChip()}
      <span>${st.plan.status === 'logged'
        ? `In your food log${st.plan.updated ? ` • ${st.plan.updated}` : ''}`
        : 'Meals count once you log them'}</span>
    </div>

    <div class="totals">
      <div style="flex:1">
        <div class="totals__n">About ${fmt(t.cal)} Cal</div>
        <div class="totals__l">of your ${fmt(TARGETS.cal)} target</div>
      </div>
      <div class="totals__sep"></div>
      <div style="flex:1">
        <div class="totals__n">About ${fmt(t.p)} g</div>
        <div class="totals__l">protein</div>
      </div>
      <button class="iconbtn press" style="color:var(--ink-3)" data-act="toast"
        data-msg="Estimates come from your portion sizes and our food database"
        aria-label="How these estimates are worked out">${I.info(20)}</button>
    </div>

    <div class="meals">
      ${st.plan.meals.map((m, i) => mealCard(m, i)).join('')}
    </div>
  </div>

  <div class="plan__foot">
    <button class="askria press" data-act="plan-ask">${I.sparkIco(20)}Ask Ria for other options</button>
    ${st.plan.status === 'logged'
      ? (st.logUndo
          ? `<button class="btn btn--block press" style="height:50px;border-radius:25px;font-size:15px" data-act="undo-log-plan">${I.undo(18)}Undo logging</button>`
          : `<button class="btn btn--block press" style="height:50px;border-radius:25px;font-size:15px" data-act="toast" data-msg="Already in your food log">Plan logged</button>`)
      : `<button class="btn btn--primary btn--block press" data-act="plan-log">Log plan</button>`}
  </div>`;
}

function mealCard(m, i) {
  const name = mealName(m);
  const items = mealItems(m);
  // "Planned" is the default and says nothing; only a state worth noticing gets a chip
  const chip = m.state === 'eaten'
    ? `<span class="chip chip--eaten">${I.check(14)}Eaten</span>`
    : m.changed ? '<span class="chip chip--saved">Changed</span>' : '';
  const action = canSwap(m)
    ? `<button class="btn press" data-act="meal-swap" data-i="${i}">${I.swap(16)}Change</button>`
    : `<button class="btn btn--ghost press" style="font-size:13px" data-act="toast" data-msg="Food log isn’t part of this prototype">View log</button>`;
  return `
  <div class="meal" data-meal="${m.kind}">
    <div class="meal__top">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:8px"><span class="meal__kind">${m.kind}</span>${chip}</div>
        <div class="meal__name">${name}</div>
        <div class="meal__items">${items}</div>
      </div>
      ${action}
    </div>
    ${recipeOf(m) ? `
    <button class="meal__recipe press" data-act="toast" data-msg="Recipe pages already exist in the app">
      <span>${I.book(16)}View recipe</span>
      <span style="display:inline-flex;color:var(--muted-2)">${I.chevR(16)}</span>
    </button>` : ''}
  </div>`;
}

/* ------------------------------- swap sheet ------------------------------ */
/* One sheet for every swappable meal. The slot's recipe supplies the choice,
   the two portions and the wording; the preview is computed, never canned. */
function swapCalc() {
  const d = st.swap;
  const meal = st.plan.meals[d.i];
  const r = RECIPES[meal.kind];
  const opt = r.options.find(o => o.id === d.opt);
  const after = recipeMacros({ kind: meal.kind, recipe: { opt: d.opt, main: d.main, side: d.side } });
  const before = d.before;
  return {
    d, meal, r, opt, after, before,
    slot: meal.kind.toLowerCase(),
    dayAfter: d.dayBefore - before.cal + after.cal,
    changed: d.opt !== d.was.opt || d.main !== d.was.main || d.side !== d.was.side,
    wasOpt: r.options.find(o => o.id === d.was.opt),
  };
}

/* The arrow cell: "450 → about 380 Cal", or just the new figure when nothing
   has been touched yet. */
const swapArrow = (changed, b, a) =>
  `${changed ? `<span class="strike">${b}</span> → ` : ''}<b>about ${a}</b>`;

function viewSwapSheet() {
  const { d, meal, r, slot, opt, after, before, dayAfter, changed, wasOpt } = swapCalc();
  return `
  <button class="scrim" data-act="swap-close" aria-label="Close"></button>
  <section class="sheet" role="dialog" aria-label="Change ${slot}">
    <div class="grabber"></div>
    <div class="sheet__head">
      <h2 style="margin:0;font-size:19px">Change ${slot}</h2>
      <button class="iconbtn press" style="margin-right:-10px" data-act="swap-close" aria-label="Close">${I.close(22)}</button>
    </div>
    <div style="font-size:13px;color:var(--muted);flex-shrink:0">Only ${slot} changes. Your other meals stay as they are.</div>
    <div class="sheet__body">
      <div class="label" style="margin-top:16px">${r.group}</div>
      <div class="radios" role="radiogroup" aria-label="${r.group}">
        ${r.options.map(o => `
          <button class="radio press ${d.opt === o.id ? 'radio--on' : ''}" role="radio"
            aria-checked="${d.opt === o.id}" data-act="swap-opt" data-id="${o.id}">
            <span class="radio__dot"><i></i></span>
            <span><span class="radio__t">${o.name}</span><span class="radio__s">${o.id === d.was.opt ? 'Current' : o.tag}</span></span>
          </button>`).join('')}
      </div>

      <div class="label" style="margin-top:16px">Portions</div>
      <div class="steppers">
        ${stepper(opt.name, amount(d.main, r.main.unit), 'main', d.main <= r.main.min, d.main >= r.main.max)}
        <div class="divider"></div>
        ${stepper(r.side.name, amount(d.side, r.side.unit), 'side', d.side <= r.side.min, d.side >= r.side.max)}
      </div>

      <div class="preview">
        <div class="preview__k">Your new ${slot}</div>
        <div class="preview__t" data-hook="dish">${r.dish(opt)}</div>
        <div class="preview__grid">
          <span>${meal.kind}</span><span data-hook="cal">${swapArrow(changed, fmt(before.cal), `${fmt(after.cal)} Cal`)}</span>
          <span>Protein</span><span data-hook="p">${swapArrow(changed, `${fmt(before.p)} g`, `${fmt(after.p)} g`)}</span>
          <span>Day total (target ${fmt(TARGETS.cal)})</span><span data-hook="day">${swapArrow(changed, fmt(d.dayBefore), `${fmt(dayAfter)} Cal`)}</span>
        </div>
      </div>

      <div style="margin-top:14px;display:flex;flex-direction:column;align-items:stretch">
        <button class="btn btn--primary press" data-act="swap-apply" ${changed ? '' : 'disabled style="opacity:.5;cursor:default"'}>Apply to ${slot}</button>
        <div style="display:flex;justify-content:center">
          <button class="btn btn--ghost press" data-act="swap-close">Keep ${wasOpt.name.toLowerCase()}</button>
        </div>
      </div>
    </div>
  </section>`;
}

/* "¾ cup", "100 g", "1 roti", "2 fruit" */
function amount(n, unit) {
  if (unit === 'g') return `${n} g`;
  if (unit === 'roti') return `${n} roti${n === 1 ? '' : 's'}`;
  if (unit === 'fruit') return n === 0 ? 'none' : `${qty(n)} fruit`;
  return `${qty(n)} ${unit}`;
}

function stepper(label, value, field, minned, maxed) {
  return `
  <div class="stepper" data-stepper="${field}">
    <span class="stepper__l" style="font-size:14px">${label}</span>
    <div class="stepper__ctl">
      <button class="stepbtn" data-act="step" data-f="${field}" data-d="-1" ${minned ? 'disabled' : ''} aria-label="Less ${label}"><span>${I.minus(16)}</span></button>
      <span class="stepval">${value}</span>
      <button class="stepbtn" data-act="step" data-f="${field}" data-d="1" ${maxed ? 'disabled' : ''} aria-label="More ${label}"><span>${I.plus(16)}</span></button>
    </div>
  </div>`;
}

/* ------------------------------ voice overlay ---------------------------- */
function viewVoice() {
  const v = st.voice;
  const label = v.phase === 'listening' ? 'Listening' : v.phase === 'thinking' ? 'Working on it' : 'Heard you';
  return `
  <div class="voice">
    <button class="iconbtn voice__close press" data-act="voice-cancel" aria-label="Cancel">${I.close(22)}</button>
    <div class="voice__state">
      <div class="voice__label">${label}</div>
      <div class="voice__text">${esc(v.text)}${v.phase === 'listening' ? '<span class="voice__caret"></span>' : ''}</div>
    </div>
    <div class="wave ${v.phase === 'thinking' ? 'wave--idle' : ''}">${'<i></i>'.repeat(9)}</div>
    <button class="voice__stop press" data-act="voice-stop" aria-label="Stop and send">
      ${v.phase === 'thinking' ? I.eq(28) : I.check(30)}
    </button>
    <div class="voice__hint">${v.phase === 'thinking' ? 'Nothing is logged until you confirm' : 'Tap when you’re done'}</div>
  </div>`;
}

/* Picking an option or nudging a portion changes a handful of values, not the
   sheet. Rebuilding the overlay for those replayed the slide-up and the scrim
   fade on every tap, reset the body's scroll to the top, and dropped focus off
   the button just pressed — so patch the live nodes instead. */
function paintSwapSheet() {
  const sheet = document.querySelector('.overlay .sheet');
  if (!sheet) return renderOverlay();            // not mounted yet — build it
  const { d, r, opt, after, before, dayAfter, changed } = swapCalc();

  sheet.querySelectorAll('.radio[data-id]').forEach(b => {
    const on = b.dataset.id === d.opt;
    b.classList.toggle('radio--on', on);
    b.setAttribute('aria-checked', on);
  });

  const paintStep = (field, label, value, minned, maxed) => {
    const row = sheet.querySelector(`[data-stepper="${field}"]`);
    if (!row) return;
    row.querySelector('.stepper__l').textContent = label;
    row.querySelector('.stepval').textContent = value;
    const [less, more] = row.querySelectorAll('.stepbtn');
    less.disabled = minned;
    more.disabled = maxed;
    less.setAttribute('aria-label', 'Less ' + label);
    more.setAttribute('aria-label', 'More ' + label);
  };
  paintStep('main', opt.name, amount(d.main, r.main.unit), d.main <= r.main.min, d.main >= r.main.max);
  paintStep('side', r.side.name, amount(d.side, r.side.unit), d.side <= r.side.min, d.side >= r.side.max);

  const set = (hook, html) => {
    const el = sheet.querySelector(`[data-hook="${hook}"]`);
    if (el) el.innerHTML = html;
  };
  set('dish', r.dish(opt));
  set('cal', swapArrow(changed, fmt(before.cal), `${fmt(after.cal)} Cal`));
  set('p',   swapArrow(changed, `${fmt(before.p)} g`, `${fmt(after.p)} g`));
  set('day', swapArrow(changed, fmt(d.dayBefore), `${fmt(dayAfter)} Cal`));

  const apply = sheet.querySelector('[data-act="swap-apply"]');
  apply.disabled = !changed;
  apply.style.opacity = changed ? '' : '.5';
  apply.style.cursor = changed ? '' : 'default';
}

/* ------------------------------ overlay host ----------------------------- */
function renderOverlay() {
  const host = ov();
  const html = st.voice ? viewVoice()
    : st.sheet === 'swap' ? viewSwapSheet()
    : '';
  host.innerHTML = html;
  const sb = document.querySelector('.statusbar');
  // the home screenshot carries its own status bar
  sb.classList.toggle('statusbar--hidden', st.screen === 'home' && !st.voice);
  sb.classList.toggle('on-dark', !!(st.voice || st.sheet));
}

/* ================================ engine ================================= */
function nextId() { return 'm' + (++st.msgSeq); }
function msg(o) { const m = { id: nextId(), seen: false, ...o }; st.messages.push(m); return m; }
function userMsg(text, o = {}) { return msg({ role: 'user', text, time: stamp(), ...o }); }
function riaText(text) { return msg({ role: 'ria', kind: 'text', text }); }

/* Ria introduces herself the first time the thread is opened, then offers
   what she can do. Voice logging skips this — it starts with the utterance. */
function ensureIntro() {
  if (st.messages.length) return;
  riaText('Hi, I’m Ria. I can plan your day, suggest meals and keep your food log straight.');
  msg({ role: 'ria', kind: 'menu' });
}

function toast(text, ms = 2400) {
  const host = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = text;
  host.appendChild(el);
  setTimeout(() => { el.classList.add('toast--out'); setTimeout(() => el.remove(), 280); }, ms);
}

function closeSheet(then) {
  const sheet = document.querySelector('.overlay .sheet');
  const scrim = document.querySelector('.overlay .scrim');
  if (!sheet) { st.sheet = null; then && then(); return; }
  sheet.classList.add('sheet--out');
  scrim && scrim.classList.add('scrim--out');
  setTimeout(() => { st.sheet = null; st.swap = null; ov().innerHTML = ''; then ? then() : render({ animate: false }); }, 250);
}

function goto(screen, opts = {}) {
  st.screen = screen;
  st.back = !!opts.back;
  st.tab = screen === 'home' ? 'home' : st.tab;
  render();
  if (opts.focus) setTimeout(() => {
    const el = document.querySelector('[data-role="talk"]');
    el && el.focus();
  }, 120);
}

/* Ria answers after a beat, with a typing indicator */
function think(fn, delay = 820) {
  st.typing = true;
  render({ animate: false });
  setTimeout(() => {
    st.typing = false;
    fn();
    render({ animate: false });
  }, delay);
}

/* --------------------------- plan mutation helpers ----------------------- */
const snapMeal = m => JSON.parse(JSON.stringify(m));
function restoreMeal(slot, snap) {
  const i = st.plan.meals.findIndex(m => m.kind === slot);
  st.plan.meals[i] = snap;
}

function applySwap(i, next, opts = {}) {
  const meal = st.plan.meals[i];
  const r = RECIPES[meal.kind];
  const snap = snapMeal(meal);
  const before = { ...mealMacros(meal), name: mealName(meal) };
  meal.recipe = { ...next };
  meal.changed = true;
  st.plan.updated = stamp();
  const after = mealMacros(meal);
  if (opts.card) {
    const trim = n => n.replace(/ (with|and) .*$/, '');
    msg({
      role: 'ria', kind: 'change', from: trim(before.name), to: trim(mealName(meal)),
      slot: meal.kind.toLowerCase(), fromCal: before.cal, toCal: after.cal, snap,
    });
  }
  return { before, after, snap };
}

function replaceMeal(slot, idea) {
  const i = st.plan.meals.findIndex(m => m.kind === slot);
  const m = st.plan.meals[i];
  const before = { snap: snapMeal(m), macros: mealMacros(m), name: mealName(m) };
  if (slot === 'Dinner' && idea.id === 'tofu-bhurji' && m.recipe) {
    m.recipe = { opt: 'tofu', main: 100, side: 1 };
  } else {
    delete m.recipe;
    m.name = idea.name;
    m.items = idea.items;
    m.cal = idea.cal; m.p = idea.p; m.f = idea.f; m.c = idea.c; m.fb = idea.fb;
  }
  m.changed = true;
  st.plan.updated = stamp();
  st.flash = slot;
  return before;
}

/* Anything Ria logs lands in the plan too: the slot it belongs to flips to
   "eaten" and starts showing what was actually eaten rather than what was
   planned, with the plan's estimate replaced by the logged totals. */
function slotSummary(entries) {
  const names = entries.map(e => e.short || e.name.toLowerCase());
  const head = names[0][0].toUpperCase() + names[0].slice(1);
  if (names.length === 1) return head;
  if (names.length === 2) return `${head} and ${names[1]}`;
  return `${head}, ${names[1]} and ${names.length - 2} more`;
}

function syncSlotFromLog(logMeal) {
  const kind = SLOT_OF_LOG[logMeal];
  const meal = kind && st.plan.meals.find(m => m.kind === kind);
  if (!meal) return;
  const entries = st.log.filter(e => e.meal === logMeal);
  if (!entries.length) return;
  const t = { cal: 0, p: 0, f: 0, c: 0, fb: 0 };
  for (const e of entries) for (const k in t) t[k] += e[k];
  delete meal.recipe;               // it is a record of a meal now, not a recipe
  meal.state = 'eaten';
  meal.fromLog = logMeal;
  meal.changed = false;
  meal.name = slotSummary(entries);
  meal.items = entries.map(e => `${e.qty} ${(e.short || e.name).toLowerCase()}`).join(' • ');
  Object.assign(meal, t);
  st.plan.updated = stamp();
}

/* "Log plan" means what it says: every meal still to come is written into the
   food log and marked eaten, exactly as if Ria had logged each one. */
function logWholePlan() {
  const logged = [];
  for (const m of st.plan.meals) {
    if (m.state === 'eaten') continue;
    const name = mealName(m), items = mealItems(m), mm = mealMacros(m);
    logEntry({ meal: LOG_SLOT[m.kind], name, short: name.toLowerCase(), qty: items,
      cal: mm.cal, p: mm.p, f: mm.f, c: mm.c, fb: mm.fb });
    delete m.recipe;
    m.state = 'eaten';
    m.changed = false;
    m.name = name;
    m.items = items;
    Object.assign(m, mm);
    logged.push(m.kind.toLowerCase());
  }
  st.plan.status = 'logged';
  st.plan.updated = stamp();
  return logged;
}

/* --------------------------------- logging -------------------------------- */
let entrySeq = 0;
function logEntry(e) { const en = { id: 'e' + (++entrySeq), ...e }; st.log.push(en); return en; }

/* ------------------------------- chat intents ---------------------------- */
function respond(raw) {
  const t = raw.toLowerCase();
  const dinner = mealOf('Dinner');

  if (/\b(dairy[- ]?free|no dairy|lactose|tofu)\b/.test(t) && dinner.recipe && dinner.recipe.opt === 'paneer') {
    return think(() => {
      riaText('Done. I swapped paneer for tofu at dinner. Nothing else in your plan changed.');
      applySwap(indexOfMeal('Dinner'), { ...dinner.recipe, opt: 'tofu' }, { card: true });
    });
  }
  if (/\begg/.test(t)) {
    return think(() => {
      riaText('Here’s what I understood. One quick question first, because it changes the calories.');
      st.pending = msg({ role: 'ria', kind: 'clarify', answered: false });
    });
  }
  if (st.lastEgg && /\b(fried|boiled|scrambled|omelette)\b/.test(t)) {
    const how = ['Fried', 'Boiled', 'Scrambled', 'Omelette'].find(k => t.includes(k.toLowerCase()));
    return think(() => correctEgg(how));
  }
  if (/\b(suggest|idea|option|alternative|recipe|what else|what should i (eat|have)|dinner|lunch|snack|breakfast)s?\b/.test(t)) {
    const named = /\bdinner\b/.test(t) ? 'Dinner'
      : /\blunch\b/.test(t) ? 'Lunch'
      : /\bmorning snack\b/.test(t) ? 'Morning snack'
      : /\bevening snack\b/.test(t) ? 'Evening snack'
      : /\bsnack\b/.test(t) ? 'snack'
      : /\bbreakfast\b/.test(t) ? 'Breakfast' : null;
    const match = named === 'snack'
      ? m => m.kind.endsWith('snack') && m.state !== 'eaten'
      : m => m.kind === named && m.state !== 'eaten';
    const meal = (named && st.plan.meals.find(match)) || nextMeal();
    if (!meal) return think(() => riaText('Every meal today is already logged, so there is nothing left to plan.'));
    const slot = meal.kind;
    const eatenNamed = named && named !== 'snack' && named !== slot;
    return think(() => {
      riaText(`${eatenNamed
          ? `You have already eaten ${named.toLowerCase()}, so here are other options for your ${slot.toLowerCase()}`
          : `Three other things you could have for your ${slot.toLowerCase()}`}. `
        + `Add one to ${slot === 'Dinner' ? 'tonight' : 'today'} and it replaces what is planned, in your plan rather than your food log.`);
      msg({ role: 'ria', kind: 'suggest', set: 0, slot, added: null });
    });
  }
  if (/\b(plan|today|schedule)s?\b/.test(t)) {
    return think(() => {
      riaText('Here’s today as it stands. You can open it and change any meal.');
      msg({ role: 'ria', kind: 'planbrief' });
    });
  }
  if (/\b(nutrition|protein|calorie|macro|trend|fibre|fiber)s?\b/.test(t)) {
    return think(() => {
      riaText('Here’s today so far.');
      msg({ role: 'ria', kind: 'nutrition' });
    });
  }
  if (/\b(workout|fitness|exercise|gym|train)s?\b/.test(t)) {
    return think(() => riaText('Fitness planning isn’t built into this prototype yet — the diet side is. Try “plan my day”, “suggest something for dinner”, or log food by voice.'));
  }
  return think(() => riaText('I can plan your day, suggest a meal, log food by voice or photo, and explain your nutrition. Try “suggest something for dinner” or “make dinner dairy-free”.'));
}

function correctEgg(how) {
  const prev = st.log.find(e => e.id === st.lastEgg);
  if (!prev) return riaText('That entry isn’t in your log any more.');
  const before = { how: prev.how, cal: prev.cal, total: logTotals(prev.meal).cal };
  // collapse the earlier log card into a one-line summary, as in the deck
  const oldIdx = st.messages.findIndex(m => m.kind === 'log' && m.entry === prev.id);
  if (oldIdx > -1) {
    const old = st.messages[oldIdx];
    old.kind = 'summary';
    old.text = `Logged 2 ${prev.how.toLowerCase()} eggs`;
    old.time = old.time || stamp(-12);
    // the "Logged 2 boiled eggs, about 156 Cal." line folds into the summary
    const before = st.messages[oldIdx - 1];
    if (before && before.kind === 'text' && /^Logged /.test(before.text)) st.messages.splice(oldIdx - 1, 1);
  }
  const n = EGG[how];
  Object.assign(prev, { how, name: n.name, short: n.short, cal: n.cal, p: n.p, f: n.f, c: n.c, fb: n.fb });
  riaText(`No problem. I changed the eggs to ${how.toLowerCase()} and updated your totals.`);
  syncSlotFromLog(prev.meal);
  msg({
    role: 'ria', kind: 'update', meal: prev.meal, entry: prev.id,
    fromHow: before.how, toHow: how, fromCal: before.cal, toCal: n.cal,
    fromTotal: before.total, toTotal: logTotals(prev.meal).cal, prev: before,
  });
}

/* =============================== controller ============================== */
const ACTIONS = {
  toast: (el) => toast(el.dataset.msg || 'Not part of this prototype'),

  'guide-toggle': () => { guideOpen = !guideOpen; saveGuide(); renderGuide(); },

  /* The note pane lives in the document and only toggles a class, so opening it
     is a transition on a live node rather than a rebuild. */
  'note-open': () => setNote(true),
  'note-close': () => setNote(false),

  'chat-open': () => {
    ensureIntro();
    goto('chat');
  },

  suggest: () => {
    const meal = nextMeal();
    const slot = meal ? `my ${meal.kind.toLowerCase()}` : 'today';
    userMsg(`Suggest something for ${slot}`);
    render({ animate: false });
    respond(`suggest something for ${slot}`);
  },

  nutrition: () => {
    userMsg('Help me understand my nutrition');
    render({ animate: false });
    respond('understand my nutrition');
  },

  'plan-open': () => {
    st.planScroll = 0;
    goto('plan');
  },
  'plan-back': () => goto(st.messages.length ? 'chat' : 'home', { back: true }),
  'go-home': () => goto('home', { back: true }),

  'plan-ask': () => {
    const meal = nextMeal();
    const slot = meal ? `my ${meal.kind.toLowerCase()}` : 'today';
    ensureIntro();
    userMsg(`What other options do I have for ${slot}?`);
    goto('chat');
    respond(`other options for ${slot}`);
  },

  'plan-log': () => {
    if (st.plan.status === 'logged') { toast('Already in your food log'); return; }
    // snapshot the whole plan and log before the write, and keep it: the toast
    // offers the undo straight away, the footer keeps offering it afterwards
    st.logUndo = {
      meals: JSON.parse(JSON.stringify(st.plan.meals)),
      log: JSON.parse(JSON.stringify(st.log)),
      status: st.plan.status,
      updated: st.plan.updated,
    };
    logWholePlan();
    tick(1);
    render({ animate: false });
  },

  'undo-log-plan': () => {
    const snap = st.logUndo;
    if (!snap) { toast('Nothing to undo'); return; }
    st.plan.meals = snap.meals;
    st.log = snap.log;
    st.plan.status = snap.status;
    st.plan.updated = snap.updated;
    st.logUndo = null;
    tick(-1);
    render({ animate: false });
  },

  'meal-swap': (el) => {
    const i = +el.dataset.i;
    const meal = st.plan.meals[i];
    if (!canSwap(meal)) return;
    st.swap = {
      i, ...meal.recipe, was: { ...meal.recipe },
      before: mealMacros(meal),
      dayBefore: planTotals().cal,
    };
    st.sheet = 'swap';
    renderOverlay();
    document.getElementById('crumb').textContent = crumbText();
  },

  'swap-opt': (el) => { st.swap.opt = el.dataset.id; paintSwapSheet(); },
  step: (el) => {
    const d = st.swap, f = el.dataset.f, dir = +el.dataset.d;
    const spec = RECIPES[st.plan.meals[d.i].kind][f];
    const next = Math.round((d[f] + dir * spec.step) / spec.step) * spec.step;
    d[f] = Math.min(spec.max, Math.max(spec.min, +next.toFixed(2)));
    paintSwapSheet();
  },
  'swap-close': () => closeSheet(() => render({ animate: false })),
  'swap-apply': () => {
    const d = { ...st.swap };
    const kind = st.plan.meals[d.i].kind;
    closeSheet(() => {
      const { after } = applySwap(d.i, { opt: d.opt, main: d.main, side: d.side });
      st.flash = kind;
      render({ animate: false });
      toast(`${kind} updated • about ${fmt(after.cal)} Cal`);
    });
  },


  'idea-add': (el) => {
    const mId = el.dataset.mid;
    const m = st.messages.find(x => x.id === mId);
    const idea = IDEAS[m.slot][m.set].find(i => i.id === el.dataset.id);
    m.added = idea.id;
    const slot = m.slot || 'Dinner';
    const before = replaceMeal(slot, idea);
    msg({
      role: 'ria', kind: 'change', from: before.name.replace(' with roti', ''),
      to: idea.name.replace(' with roti', ''), slot: slot.toLowerCase(),
      fromCal: before.macros.cal, toCal: idea.cal, snap: before.snap,
    });
    render({ animate: false });
    toast(`${idea.name} logged to ${slot.toLowerCase()}`);
  },
  'ideas-more': (el) => {
    const m = st.messages.find(x => x.id === el.dataset.mid);
    m.set = (m.set + 1) % IDEAS[m.slot].length;
    m.seen = false;
    render({ animate: false });
  },

  'voice-start': () => {
    st.swap = null;
    st.voice = { phase: 'listening', text: '' };
    renderOverlay();
    document.getElementById('crumb').textContent = crumbText();
    typeVoice();
  },
  'voice-cancel': () => { stopVoiceTimer(); st.voice = null; renderOverlay(); render({ animate: false }); },
  'voice-stop': () => {
    if (!st.voice) return;
    if (st.voice.phase === 'listening') {
      stopVoiceTimer();
      st.voice.text = VOICE_LINE;
      st.voice.phase = 'thinking';
      renderOverlay();
      setTimeout(finishVoice, 760);
    }
  },

  'egg-pick': (el) => {
    const how = el.dataset.how;
    const card = st.pending;
    if (card) { card.kind = 'meta'; card.text = 'Asked how they were cooked'; card.seen = true; }
    st.pending = null;
    userMsg(how);
    render({ animate: false });
    think(() => {
      const n = EGG[how];
      const slot = st.plan.meals.find(m => m.kind === SLOT_OF_LOG['Evening snack']);
      const planSnap = slot ? snapMeal(slot) : null;
      const en = logEntry({ meal: 'Evening snack', name: n.name, short: n.short, qty: '2 large',
        how: how === 'Not sure' ? 'Boiled' : how,
        cal: n.cal, p: n.p, f: n.f, c: n.c, fb: n.fb });
      st.lastEgg = en.id;
      syncSlotFromLog('Evening snack');
      riaText(`Logged 2 ${(how === 'Not sure' ? 'boiled' : how.toLowerCase())} eggs, about ${fmt(n.cal)} Cal.`
        + (how === 'Not sure' ? ' I assumed boiled — say the word if that’s wrong.' : ''));
      msg({ role: 'ria', kind: 'log', meal: 'Evening snack', entry: en.id, time: stamp(), planSnap });
      tick(1);
    }, 700);
  },

  'undo-log': (el) => {
    const m = st.messages.find(x => x.id === el.dataset.mid);
    st.log = st.log.filter(e => e.id !== m.entry);
    if (m.planSnap) restoreMeal(m.planSnap.kind, snapMeal(m.planSnap));
    m.undone = true;
    st.lastEgg = null;
    st.flash = m.planSnap && m.planSnap.kind;
    render({ animate: false });
    toast('Removed from your log and back to planned');
  },
  'undo-update': (el) => {
    const m = st.messages.find(x => x.id === el.dataset.mid);
    const e = st.log.find(x => x.id === m.entry);
    if (e) {
      const n = EGG[m.fromHow];
      Object.assign(e, { how: m.fromHow, name: n.name, short: n.short, cal: n.cal, p: n.p, f: n.f, c: n.c, fb: n.fb });
      syncSlotFromLog(e.meal);
    }
    m.undone = true;
    render({ animate: false });
    toast(`Back to ${m.fromHow.toLowerCase()}`);
  },
  'undo-change': (el) => {
    const m = st.messages.find(x => x.id === el.dataset.mid);
    const slot = m.slot[0].toUpperCase() + m.slot.slice(1);
    restoreMeal(slot, snapMeal(m.snap));
    m.undone = true;
    const sug = st.messages.find(x => x.kind === 'suggest' && x.added);
    if (sug) sug.added = null;
    st.plan.updated = stamp();
    st.flash = slot;
    render({ animate: false });
    toast('Change reverted');
  },

  'composer-send': () => sendFromComposer(),
};

function sendFromComposer() {
  const input = document.querySelector('[data-role="talk"]');
  const text = (input ? input.value : st.composer).trim();
  if (!text) { ACTIONS['voice-start'](); return; }
  st.composer = '';
  userMsg(text);
  tick(1);
  render({ animate: false });
  respond(text);
}

/* --------------------------------- voice --------------------------------- */
const VOICE_LINE = 'Can you add 2 eggs to my evening snack today?';
let voiceTimer = null;
function stopVoiceTimer() { clearInterval(voiceTimer); voiceTimer = null; }
function typeVoice() {
  stopVoiceTimer();
  let i = 0;
  voiceTimer = setInterval(() => {
    if (!st.voice) return stopVoiceTimer();
    i += 1;
    st.voice.text = VOICE_LINE.slice(0, i);
    const node = document.querySelector('.voice__text');
    if (node) node.innerHTML = esc(st.voice.text) + '<span class="voice__caret"></span>';
    if (i >= VOICE_LINE.length) {
      stopVoiceTimer();
      setTimeout(() => { if (st.voice && st.voice.phase === 'listening') ACTIONS['voice-stop'](); }, 900);
    }
  }, 42);
}
function finishVoice() {
  st.voice = null;
  st.screen = 'chat';
  st.sheet = null;
  userMsg(VOICE_LINE, { fromVoice: true, editable: true });
  render();
  respond(VOICE_LINE);
}

/* ================================= guide ================================= */
/* Prototype chrome, outside the device. Three cards — one per core flow —
   that double as routes in, because a first-time viewer clicks before they
   read. Reaching a flow any other way (a starter, the plan's "Ask Ria",
   or just typing) ticks the same card, so the panel never lies about
   where you have been. */

const GUIDE = [
  { k: 'plan', ico: 'swap', t: 'Change your plan',
    s: 'Ria planned the day already. Swap anything not yet eaten — the component inside the dish, and the portions.',
    tap: 'Chat &rarr; <b>Open plan</b>, then <b>Change</b> on a meal',
    asks: ['plan my day', 'make dinner dairy-free'] },

  { k: 'suggest', ico: 'bulb', t: 'Suggest a meal',
    s: 'Whole alternatives for a meal, sized for that slot. Adding one replaces what is planned; it does not log it.',
    tap: 'Chat &rarr; <b>Suggest a meal</b>, or the plan&rsquo;s <b>Ask Ria for other options</b>',
    asksLead: 'Name the meal and you get that one:',
    asks: ['suggest lunch options', 'dinner options', 'snack ideas', 'what else could I have?'] },

  { k: 'nutrition', ico: 'chart', t: 'Understand my nutrition',
    s: 'Where the day lands and what to do about the next meal — a recommendation, not a dashboard.',
    tap: 'Chat &rarr; <b>Understand my nutrition</b>',
    asks: ['how is my protein?', 'how am I doing on calories?'] },
];

let guideOpen = true;
try { guideOpen = localStorage.getItem('ria.guide') !== 'off'; } catch (e) { /* private mode */ }
function saveGuide() { try { localStorage.setItem('ria.guide', guideOpen ? 'on' : 'off'); } catch (e) {} }

let noteOpen = false;
function setNote(open) {
  noteOpen = open;
  const pane = document.getElementById('note');
  const scrim = document.querySelector('.note-scrim');
  if (!pane) return;
  pane.classList.toggle('note--open', open);
  pane.setAttribute('aria-hidden', String(!open));
  if (scrim) scrim.classList.toggle('note-scrim--on', open);
  if (open) pane.scrollTop = 0;
}

function renderGuide() {
  const host = document.getElementById('guide');
  if (!host) return;
  host.classList.toggle('guide--off', !guideOpen);
  // the stage re-centres in whatever room the sidebar leaves
  document.body.classList.toggle('guide-off', !guideOpen);

  if (!guideOpen) {
    host.innerHTML = `
      <button class="guide__pill" data-act="guide-toggle">
        ${I.info(15)}Three core flows
      </button>`;
    return;
  }

  host.innerHTML = `
  <div class="guide__card">
    <div class="guide__top">
      <div>
        <div class="guide__eyebrow">Ria &middot; prototype</div>
        <h1 class="guide__title">Three core flows</h1>
      </div>
      <button class="guide__hide" data-act="guide-toggle">Hide</button>
    </div>
    <p class="guide__sub">Everything starts in chat. Tap <b>Chat with Ria</b> on the phone, then use the cards in the thread &mdash; or just type.</p>

    <div class="guide__flows">
      ${GUIDE.map((f, i) => `
        <div class="flow">
          <div class="flow__head">
            <span class="flow__ico">${I[f.ico](15)}</span>
            <span class="flow__t">${f.t}</span>
            <span class="flow__n">0${i + 1}</span>
          </div>
          <p class="flow__s">${f.s}</p>
          <p class="flow__how">${f.tap}</p>
          ${f.asksLead ? `<p class="flow__lead">${f.asksLead}</p>` : ''}
          <div class="flow__asks">
            ${f.asks.map(a => `<span class="ask">&ldquo;${a}&rdquo;</span>`).join('')}
          </div>
        </div>`).join('')}
    </div>

    <p class="guide__foot">
      ${I.info(14)}
      <span>Underneath all three: <b>logging</b>. Log a meal by voice and that slot turns Eaten
      &mdash; it locks, and the day&rsquo;s totals come from the log.</span>
    </p>
  </div>`;
}

/* ------------------------------- bootstrap ------------------------------- */
document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-act]');
  if (!el || el.disabled) return;
  const fn = ACTIONS[el.dataset.act];
  if (fn) { ev.preventDefault(); fn(el); }
});

document.addEventListener('input', (ev) => {
  const el = ev.target;
  if (el.dataset.role === 'talk') {
    const had = !!st.composer.trim();
    st.composer = el.value;
    if (had !== !!el.value.trim()) {
      const btn = document.querySelector('.composer .mic');
      if (btn) btn.innerHTML = el.value.trim() ? I.chevR(22) : I.eq(22);
    }
  }
});

document.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Enter') return;
  const el = ev.target;
  if (el.dataset.role === 'talk') { ev.preventDefault(); sendFromComposer(); }
});

document.addEventListener('keydown', (ev) => {
  if (ev.key !== 'Escape') return;
  if (noteOpen) setNote(false);
  else if (st.voice) ACTIONS['voice-cancel']();
  else if (st.sheet) closeSheet(() => render({ animate: false }));
});

document.addEventListener('scroll', (ev) => {
  const t = ev.target;
  if (t.classList && t.classList.contains('plan__body')) st.planScroll = t.scrollTop;
}, true);

document.getElementById('restart').addEventListener('click', () => {
  stopVoiceTimer();
  st = freshState();
  entrySeq = 2;
  st.log[0].id = 'e1'; st.log[1].id = 'e2';
  clockMin = 17 * 60 + 29;
  paintClock();
  ov().innerHTML = '';
  render();
});

/* give the two seeded log entries ids so undo/update can find them */
entrySeq = 2;
st.log[0].id = 'e1';
st.log[1].id = 'e2';
paintClock();
render({ animate: false });
