// ===================== THEME (clair / sombre) =====================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

(function initTheme() {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    applyTheme(prefersLight ? 'light' : 'dark');
  }
})();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ===================== SIDEBAR : OUVRIR / FERMER =====================
const layout = document.querySelector('.layout');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarReopen = document.getElementById('sidebarReopen');

function setSidebarCollapsed(collapsed) {
  layout.classList.toggle('sidebar-collapsed', collapsed);
  sidebarReopen.hidden = !collapsed;
  localStorage.setItem('portfolio-sidebar-collapsed', collapsed ? '1' : '0');
}

(function initSidebar() {
  const saved = localStorage.getItem('portfolio-sidebar-collapsed');
  setSidebarCollapsed(saved === '1');
})();

sidebarToggle.addEventListener('click', () => setSidebarCollapsed(true));
sidebarReopen.addEventListener('click', () => setSidebarCollapsed(false));

// ===================== LANGUE (FR / EN) =====================
const translations = {
  fr: {
    badge: "Étudiante Data Science & IA",
    email_label: "EMAIL",
    phone_label: "TÉLÉPHONE",
    location_label: "LOCALISATION",
    age_label: "ÂGE",
    age_value: "22 ans",
    nav_about: "À propos",
    nav_formations: "Formations",
    nav_experience: "Expérience",
    nav_projets: "Projets",
    nav_competences: "Compétences",
    nav_contact: "Contact",
    about_title: "À propos de moi",
    about_p1: "Je suis Olivia Adamah, étudiante en Master à l'Université de Strasbourg, passionnée par la Data Science et l'Intelligence Artificielle. Mon projet professionnel est de devenir Data Scientist.",
    about_p2: "Après une Licence en Informatique à l'UFR Mathématiques et Informatique de Strasbourg, je poursuis actuellement un Master en Connaissances, Science des Données et Intelligence Artificielle (CODIA). J'ai renforcé mes compétences grâce à un stage en data science autour de la modélisation prédictive, ainsi qu'à travers plusieurs projets réalisés tout au long de mon parcours.",
    interests_label: "Centres d'intérêt",
    interests_text: "Voyages — j'ai notamment eu l'occasion de séjourner au Luxembourg, une expérience qui a nourri mon ouverture d'esprit et mon goût pour la découverte de nouvelles cultures.",
    formations_title: "Formations",
    edu1_date: "2025 – 2027",
    edu1_role: "Master CODIA — Connaissances, Science des Données et IA",
    edu1_sub: "UFR Mathématiques et Informatique, Strasbourg",
    edu2_date: "2024 – 2025",
    edu2_role: "Licence en Informatique",
    edu2_sub: "UFR Mathématiques et Informatique, Strasbourg",
    experience_title: "Expérience",
    exp_tab_pro: "Expérience professionnelle",
    exp_tab_assoc: "Engagement associatif",
    exp1_date: "Avr. 2026 – Juil. 2026",
    exp1_role: "Stage — Data Scientist, TWISTAROMA (laboratoire d'analyse chimique)",
    exp1_l1: "Collecte, nettoyage et préparation des données d'analyse chimique GC-MS",
    exp1_l2: "Exploration des corrélations entre composés chimiques et profils aromatiques",
    exp1_l3: "Développement de modèles de prédiction des arômes de la bière à partir des composés du houblon",
    exp1_l4: "Conception d'une interface de visualisation avec Streamlit",
    assoc1_date: "Depuis 2025",
    assoc1_role: "Vice-trésorière (Campus d'Illkirch)",
    assoc1_sub: "Amicale des Informaticiens de l'Université de Strasbourg (AIUS), Strasbourg",
    assoc1_l1: "Gestion de la caisse, suivi et enregistrement des recettes",
    assoc1_l2: "Transmission des fonds au trésorier",
    assoc2_date: "Séminaire",
    assoc2_role: "Séminaire international EUCOR — Informatique",
    assoc2_sub: "Programme trinational réunissant plusieurs universités du Rhin supérieur (France, Allemagne, Suisse)",
    assoc2_l1: "Participation au séminaire international EUCOR en informatique",
    assoc2_photo_label: "Voir la photo →",
    projets_title: "Projets",
    projets_ml_title: "Projets Machine Learning",
    projets_bi_title: "Projets BI & Analytics",
    projets_llm_title: "Projets IA / LLM",
    proj1_name: "Prédiction des arômes de la bière",
    proj1_desc: "Modélisation prédictive des profils aromatiques à partir des composés chimiques du houblon (régression, arbres de régression) et visualisation Streamlit.",
    proj2_name: "Breast Cancer Classification (Deep Learning)",
    proj2_desc: "Classification d'images histologiques avec un CNN pour la détection du cancer du sein ; gestion du déséquilibre des classes et évaluation par recall / F1-score.",
    proj3_name: "Prédiction de survie des startups en France",
    proj3_desc: "Collecte de données INSEE, feature engineering et comparaison de modèles (régression logistique, Random Forest, réseaux de neurones).",
    proj4_name: "Tableau de bord interactif des ventes",
    proj4_desc: "Conception d'un tableau de bord Power BI selon un processus en trois étapes : chargement des données depuis une source OLTP, transformation avec Power Query (nettoyage, gestion des valeurs manquantes, calcul du chiffre d'affaires et des bénéfices), puis analyse sur un modèle OLAP agrégeant les données par temps, pays et catégories de produits. Visualisations dynamiques pour suivre l'évolution du chiffre d'affaires mensuel et identifier les tendances clés.",
    proj5_name: "Assistant personnel RAG sur documents privés",
    proj5_desc: "Conception et développement d'un assistant conversationnel permettant d'interroger des documents privés en langage naturel avec réponses sourcées, via une architecture RAG. Benchmark comparatif de solutions LLM locales vs API. Projet en équipe de 4, gestion via Git/GitHub.",
    proj_details: "En savoir plus",
    proj_github: "Voir sur GitHub",
    modal_tw_tag: "TWISTAROMA · Laboratoire d'analyse chimique",
    modal_tw_title: "Prédiction des arômes de la bière",
    modal_tw_loc: "Illkirch-Graffenstaden · Avr. 2026 – Juil. 2026",
    modal_tw_private: "Projet réalisé en entreprise dans le cadre d'un stage — code source privé, non disponible publiquement",
    modal_tw_lab_label: "Le laboratoire",
    modal_tw_lab_text: "TWISTAROMA est un laboratoire d'analyse chimique spécialisé dans l'étude des composés aromatiques, notamment via la technique GC-MS (chromatographie en phase gazeuse couplée à la spectrométrie de masse).",
    modal_tw_project_label: "Le projet",
    modal_tw_project_text: "Développer un modèle capable de prédire les arômes de la bière à partir des composés chimiques mesurés dans le houblon, afin d'aider à anticiper les profils aromatiques.",
    modal_tw_missions_label: "Mes missions",
    modal_tw_l5: "Mesure de la performance des modèles et ajustement des paramètres",
    competences_title: "Compétences",
    skill1_title: "Langages",
    skill2_title: "Data Science & IA",
    skill3_title: "BI & Analytics",
    skill4_title: "Bases de données",
    skill5_title: "Langues",
    skill6_title: "IA / LLM",
    lang_fr_tag: "Français — Professionnel",
    lang_en_tag: "Anglais — Professionnel",
    contact_title: "Contact",
    contact_intro: "À la recherche d'un stage de fin d'études en Data Science / IA à partir de février 2027 (6 mois). N'hésitez pas à me contacter.",
    footer_rights: "Tous droits réservés",
  },
  en: {
    badge: "Data Science & AI Student",
    email_label: "EMAIL",
    phone_label: "PHONE",
    location_label: "LOCATION",
    age_label: "AGE",
    age_value: "22 years old",
    nav_about: "About",
    nav_formations: "Education",
    nav_experience: "Experience",
    nav_projets: "Projects",
    nav_competences: "Skills",
    nav_contact: "Contact",
    about_title: "About Me",
    about_p1: "I'm Olivia Adamah, a Master's student at the University of Strasbourg, passionate about Data Science and Artificial Intelligence. My career goal is to become a Data Scientist.",
    about_p2: "After a Bachelor's degree in Computer Science at the UFR Mathematics and Computer Science of Strasbourg, I am currently pursuing a Master's in Data, Knowledge and Artificial Intelligence (CODIA). I have strengthened my skills through a data science internship focused on predictive modeling, as well as through several projects throughout my studies.",
    interests_label: "Interests",
    interests_text: "Travel — I notably had the chance to stay in Luxembourg, an experience that broadened my mind and fueled my taste for discovering new cultures.",
    formations_title: "Education",
    edu1_date: "2025 – 2027",
    edu1_role: "CODIA Master's — Data, Knowledge and Artificial Intelligence",
    edu1_sub: "UFR Mathematics and Computer Science, Strasbourg",
    edu2_date: "2024 – 2025",
    edu2_role: "Bachelor's in Computer Science",
    edu2_sub: "UFR Mathematics and Computer Science, Strasbourg",
    experience_title: "Experience",
    exp_tab_pro: "Professional Experience",
    exp_tab_assoc: "Volunteer Involvement",
    exp1_date: "Apr. 2026 – Jul. 2026",
    exp1_role: "Internship — Data Scientist, TWISTAROMA (chemical analysis laboratory)",
    exp1_l1: "Collected, cleaned and prepared GC-MS chemical analysis data",
    exp1_l2: "Explored correlations between chemical compounds and aromatic profiles",
    exp1_l3: "Developed models to predict beer aromas from hop chemical compounds",
    exp1_l4: "Designed a visualization interface with Streamlit",
    assoc1_date: "Since 2025",
    assoc1_role: "Vice-Treasurer (Illkirch Campus)",
    assoc1_sub: "Amicale des Informaticiens de l'Université de Strasbourg (AIUS), Strasbourg",
    assoc1_l1: "Managed the treasury fund, tracked and recorded revenue",
    assoc1_l2: "Transferred funds to the treasurer",
    assoc2_date: "Seminar",
    assoc2_role: "EUCOR International Seminar — Computer Science",
    assoc2_sub: "Trinational program bringing together several universities of the Upper Rhine region (France, Germany, Switzerland)",
    assoc2_l1: "Participated in the EUCOR international computer science seminar",
    assoc2_photo_label: "View photo →",
    projets_title: "Projects",
    projets_ml_title: "Machine Learning Projects",
    projets_bi_title: "BI & Analytics Projects",
    projets_llm_title: "AI / LLM Projects",
    proj1_name: "Beer Aroma Prediction",
    proj1_desc: "Predictive modeling of aromatic profiles from hop chemical compounds (regression, regression trees) with a Streamlit dashboard.",
    proj2_name: "Breast Cancer Classification (Deep Learning)",
    proj2_desc: "Histological image classification using a CNN for breast cancer detection; class imbalance handling and evaluation via recall / F1-score.",
    proj3_name: "Startup Survival Prediction in France",
    proj3_desc: "INSEE data collection, feature engineering and model comparison (logistic regression, Random Forest, neural networks).",
    proj4_name: "Interactive Sales Dashboard",
    proj4_desc: "Designed a Power BI dashboard following a three-step process: loading data from an OLTP source, transforming it with Power Query (cleaning, handling missing values, computing revenue and profit), then analyzing it on an OLAP model aggregating data by time, country and product category. Dynamic visualizations to track monthly revenue trends and identify key insights.",
    proj5_name: "RAG Personal Assistant on Private Documents",
    proj5_desc: "Designed and developed a conversational assistant that answers natural-language questions over private documents with sourced answers, using a RAG architecture. Comparative benchmark of local vs API LLM solutions. Team project of 4, managed via Git/GitHub.",
    proj_details: "Learn more",
    proj_github: "View on GitHub",
    modal_tw_tag: "TWISTAROMA · Chemical Analysis Laboratory",
    modal_tw_title: "Beer Aroma Prediction",
    modal_tw_loc: "Illkirch-Graffenstaden · Apr. 2026 – Jul. 2026",
    modal_tw_private: "Project carried out at the company as part of an internship — source code is private and not publicly available",
    modal_tw_lab_label: "The Laboratory",
    modal_tw_lab_text: "TWISTAROMA is a chemical analysis laboratory specialized in the study of aromatic compounds, notably using the GC-MS technique (gas chromatography coupled with mass spectrometry).",
    modal_tw_project_label: "The Project",
    modal_tw_project_text: "Build a model able to predict beer aromas from the chemical compounds measured in hops, to help anticipate aromatic profiles.",
    modal_tw_missions_label: "My Missions",
    modal_tw_l5: "Measured model performance and tuned parameters",
    competences_title: "Skills",
    skill1_title: "Languages",
    skill2_title: "Data Science & AI",
    skill3_title: "BI & Analytics",
    skill4_title: "Databases",
    skill5_title: "Spoken Languages",
    skill6_title: "AI / LLM",
    lang_fr_tag: "French — Professional",
    lang_en_tag: "English — Professional",
    contact_title: "Contact",
    contact_intro: "Looking for a final-year internship in Data Science / AI starting February 2027 (6 months). Feel free to reach out.",
    footer_rights: "All rights reserved",
  }
};

const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });
  langOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
  localStorage.setItem('portfolio-lang', lang);
}

(function initLang() {
  const saved = localStorage.getItem('portfolio-lang') || 'fr';
  applyLang(saved);
})();

langToggle.addEventListener('click', () => {
  const current = document.documentElement.lang === 'en' ? 'en' : 'fr';
  applyLang(current === 'fr' ? 'en' : 'fr');
});

// ===================== NAV SCROLL SPY =====================
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = sections[0]?.id;
  const scrollPos = window.scrollY + 140;
  sections.forEach(section => {
    if (section.offsetTop <= scrollPos) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// ===================== EXPÉRIENCE : ONGLETS =====================
const expTabBtns = document.querySelectorAll('.exp-tab-btn');
const expPanels = document.querySelectorAll('.exp-panel');

expTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    expTabBtns.forEach(b => b.classList.remove('active'));
    expPanels.forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.exp-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
  });
});

// ===================== PROJETS : MODAL =====================
document.querySelectorAll('[data-modal]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const modal = document.getElementById(trigger.dataset.modal);
    if (modal) modal.classList.add('active');
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
  overlay.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => overlay.classList.remove('active'));
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  }
});

// ===================== LIGHTBOX PHOTO =====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('[data-lightbox]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    lightboxImg.src = trigger.dataset.lightbox;
    lightboxImg.alt = trigger.dataset.lightboxAlt || '';
    lightbox.classList.add('active');
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.remove('active');
});

lightbox.querySelectorAll('[data-close-lightbox]').forEach(btn => {
  btn.addEventListener('click', () => lightbox.classList.remove('active'));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});
