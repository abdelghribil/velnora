# VELNORA STUDIO — Site vitrine

Site statique premium en HTML, CSS et JavaScript natifs. Aucun framework, aucune compilation, aucune dépendance à installer : le dossier peut être déposé tel quel sur n'importe quel hébergement statique.

La langue principale est le français. L'architecture est préparée pour l'anglais et l'arabe (RTL), actuellement signalés comme « bientôt disponibles ».

---

## 1. Démarrage local

### Option A — ouvrir directement le fichier

Ouvrir `index.html` dans un navigateur. Le site fonctionne sans serveur, mais un serveur local est recommandé pour tester les chemins, le manifeste et le formulaire dans des conditions proches de la production.

### Option B — serveur local

Avec Node.js :

```bash
npx serve .
```

Avec Python :

```bash
python -m http.server 4173
```

Puis ouvrir `http://localhost:4173/`.

Aucune commande de build n'est nécessaire : il n'y a ni `node_modules`, ni étape de compilation.

---

## 2. Déploiement sur Cloudflare Pages

### Via le tableau de bord (recommandé)

1. Pousser le contenu du dossier dans un dépôt GitHub, GitLab ou Bitbucket.
2. Dans Cloudflare, ouvrir **Workers & Pages → Create → Pages → Connect to Git**.
3. Sélectionner le dépôt.
4. Configuration du build :
   - **Framework preset** : `None`
   - **Build command** : laisser vide
   - **Build output directory** : `/` (racine du dépôt)
5. Lancer le déploiement. Cloudflare sert automatiquement `404.html` pour les URL inconnues.
6. Ajouter le domaine définitif dans **Custom domains** et activer HTTPS.

### Upload direct (sans dépôt Git)

Dans **Pages → Upload assets**, glisser le dossier complet (ou son archive) puis publier. Cette méthode convient pour une mise en ligne ponctuelle, mais ne bénéficie pas des déploiements automatiques à chaque commit.

### Avec Wrangler (ligne de commande)

```bash
npx wrangler pages project create velnora-studio
npx wrangler pages deploy . --project-name velnora-studio
```

### Après le déploiement

Remplacer partout le domaine provisoire `https://velnora.studio` par l'URL réelle :

- balises `canonical` et Open Graph/Twitter des pages HTML ;
- `sitemap.xml` ;
- `robots.txt` (ligne `Sitemap`) ;
- `js/config.js` → `site.url`.

Aucune règle de réécriture n'est nécessaire : les liens utilisent les fichiers `.html` explicites.

---

## 3. Configuration centrale

Tout ce qui change d'un projet à l'autre est regroupé dans `js/config.js` :

```js
window.VELNORA = {
  brand: {
    name: "VELNORA",
    suffix: "STUDIO",
    full: "VELNORA STUDIO",
    tagline: "…",
    legalName: ""
  },
  contact: {
    email: "bonjour@velnora.studio",
    whatsapp: "",
    formEndpoint: "",
    location: "Maroc · International",
    availability: "Disponible pour des projets sélectionnés"
  },
  social: {
    instagram: "",
    linkedin: "",
    behance: ""
  },
  site: {
    url: "https://velnora.studio",
    locale: "fr",
    locales: [ /* fr, en, ar */ ]
  }
};
```

### Contacts et réseaux sociaux

- `contact.email` : adresse réellement relevée. Elle alimente les liens `mailto:` et le repli du formulaire.
- `contact.whatsapp` : format international sans `+` ni espaces, par exemple `212600000000`. Laisser vide ouvre WhatsApp avec un message prérempli et laisse le visiteur choisir le destinataire.
- `social.instagram`, `social.linkedin`, `social.behance` : une URL non vide affiche le lien correspondant dans le pied de page. Les liens vides restent masqués.
- `brand.legalName` : à renseigner uniquement si une entité légale réelle doit apparaître.

### Formulaire de contact

Sans `contact.formEndpoint`, **aucune donnée n'est envoyée**. Après validation, le formulaire affiche un état « Votre message est prêt » avec trois actions : email, WhatsApp et copie du message. Il ne prétend jamais avoir envoyé la demande.

Pour activer l'envoi direct, renseigner `contact.formEndpoint` avec une URL acceptant un `POST` JSON (Formspree, Cloudflare Worker, API interne, etc.). Le corps envoyé est :

```json
{
  "name": "…",
  "email": "…",
  "company": "…",
  "projectType": "…",
  "budget": "…",
  "message": "…",
  "consent": true,
  "source": "https://exemple.com/index.html#contact",
  "submittedAt": "2026-11-03T12:00:00.000Z"
}
```

Le formulaire affiche un état de succès uniquement si le serveur répond avec un statut HTTP 2xx. En cas d'échec réseau ou serveur, il propose les mêmes solutions de repli (email, WhatsApp, copie), sans perdre le message saisi.

### Couleurs et typographie

- Couleurs, rayons, ombres, espacements et polices : `css/tokens.css`.
- Polices chargées via Google Fonts dans le `<head>` de chaque page : Space Grotesk (titres), DM Sans (texte), Instrument Serif (accents éditoriaux).
- Pour changer de polices, mettre à jour les variables `--font-display`, `--font-body`, `--font-serif` **et** le lien Google Fonts des pages HTML.

Palette de marque :

| Rôle | Valeur |
| --- | --- |
| Bleu nuit | `#101828` |
| Blanc cassé | `#F7F7F2` |
| Lime électrique | `#C7F36B` |
| Gris | `#8A8F98` |
| Blanc | `#FFFFFF` |

---

## 4. Structure du projet

```text
digital-boost-maroc-agency/
├── index.html                  # Accueil : hero, services, projets, à propos, process, offres, insights, contact
├── services.html               # Détail des six services
├── work.html                   # Trois études de cas conceptuelles
├── insights.html               # Index des articles
├── insights/
│   ├── why-a-professional-website.html
│   ├── web-design-trends.html
│   └── automation-for-small-business.html
├── privacy.html                # Politique de confidentialité (noindex)
├── 404.html                    # Page d'erreur personnalisée
├── site.webmanifest            # Manifeste PWA
├── robots.txt
├── sitemap.xml
├── css/
│   ├── tokens.css              # Variables de marque, couleurs, typographie, espacements
│   ├── base.css                # Reset, typographie, accessibilité, utilitaires
│   ├── components.css          # En-tête, navigation, boutons, tags, pied de page, menu mobile
│   ├── mockups.css             # Maquettes CSS des projets conceptuels
│   ├── sections.css            # Sections de pages et styles éditoriaux
│   └── responsive.css          # Points de rupture et adaptations mobile/tablette
├── js/
│   ├── config.js               # Configuration centrale (marque, contacts, réseaux, URL)
│   ├── app.js                  # Navigation, menu mobile, révélations au scroll, sélection d'offre
│   └── forms.js                # Validation accessible et envoi/repli du formulaire
└── assets/
    ├── favicon.svg
    ├── logo-mark.svg
    ├── logo-horizontal.svg
    ├── logo-horizontal-light.svg
    ├── pattern-zellige.svg
    ├── apple-touch-icon.png
    └── og-image.png            # Image sociale 1200 × 630
```

### Pages et ancres

- `index.html#services`, `#work`, `#about`, `#process`, `#pricing`, `#insights`, `#contact`
- `work.html#dar-zellij`, `#nova-beauty`, `#auto-prime`
- Les articles utilisent des chemins relatifs `../` depuis `insights/`.

---

## 5. Design system et comportements

- **Grille et rythme** : conteneur fluide, gouttières et espacements définis par `clamp()` dans `tokens.css`.
- **Boutons** : `.btn`, `.btn--ghost`, `.btn--dark`, `.btn--light`, `.btn--outline-light`. Hauteur minimale de 3,15 rem pour les cibles tactiles.
- **Animations** : révélations progressives via `[data-reveal]`, transitions discrètes, barre de progression de lecture. Toutes les animations sont neutralisées par `prefers-reduced-motion: reduce`.
- **Menu mobile** : dialogue plein écran, verrouillage du scroll, piège de focus, fermeture par `Échap`, restauration du focus sur le bouton d'ouverture.
- **Maquettes de projets** : constructions HTML/CSS, sans captures d'écran factices. Elles sont identifiées comme « Projet concept ».
- **RTL** : les variables logiques (`margin-inline`, `padding-inline`, `inset-inline`) sont déjà utilisées. Le passage à l'arabe nécessitera `dir="rtl"`, `lang="ar"` et une révision des alignements décoratifs.
- **Langues** : le sélecteur affiche Français actif, English et العربية marqués « bientôt ». Aucune traduction factice n'est exposée.

---

## 6. Contenu et mentions légales

- Les trois projets **DAR ZELLIJ**, **NOVA BEAUTY** et **AUTO PRIME** sont des **concepts de démonstration**. Aucun client réel, résultat commercial, partenariat ou témoignage ne leur est associé. Cette mention est visible sur l'accueil et sur chaque étude de cas.
- Aucun chiffre de performance, avis client ou logo partenaire n'est inventé.
- Aucune donnée d'entreprise, adresse ou téléphone n'est publiée. Les champs correspondants sont des espaces réservés à compléter.
- Les tarifs (Starter 700 MAD, Business 1 500 MAD, Sur mesure 2 500 MAD) sont des points de départ à valider commercialement avant publication.
- La politique de confidentialité décrit le fonctionnement réel du formulaire : validation locale et repli email/WhatsApp tant qu'aucun endpoint n'est configuré.
- Aucun schéma `LocalBusiness` n'est injecté : il ne doit être ajouté qu'avec des données légales et géographiques réelles.

### Liste des espaces réservés à compléter

| Élément | Emplacement |
| --- | --- |
| Adresse email réelle | `js/config.js` → `contact.email` |
| Numéro WhatsApp | `js/config.js` → `contact.whatsapp` |
| Endpoint du formulaire | `js/config.js` → `contact.formEndpoint` |
| Réseaux sociaux | `js/config.js` → `social.*` |
| Raison sociale | `js/config.js` → `brand.legalName` |
| Domaine définitif | `canonical`, Open Graph, `sitemap.xml`, `robots.txt`, `js/config.js` |
| Traductions EN / AR | pages dédiées + `dir`/`lang` + `site.locales` |
| Tarifs et conditions | sections offres de `index.html` et `services.html` |

---

## 7. SEO, accessibilité et performance

- HTML sémantique, un seul `h1` par page, hiérarchie de titres cohérente, liens d'évitement.
- Métadonnées complètes : titre, description, `canonical`, Open Graph, Twitter Card, thème clair, manifeste.
- `sitemap.xml`, `robots.txt`, page `404.html` personnalisée, `privacy.html` en `noindex`.
- Images et visuels : logo SVG, favicon SVG, icône Apple 180 × 180, image Open Graph 1200 × 630. Aucune image bitmap lourde dans les pages.
- Contrastes vérifiés, états de focus visibles, formulaires avec labels, messages d'erreur reliés par `aria-describedby`, `aria-invalid`, zones live.
- Structure prête pour les lecteurs d'écran et la navigation clavier.
- Lighthouse (Chromium, pages testées) : **Accessibilité 1.0**, **Bonnes pratiques 1.0**, **SEO 1.0**.
- Aucun débordement horizontal vérifié à 390 px, 768 px et 1280 px ; menu mobile, piège de focus et fermeture par `Échap` testés.

---

## 8. Compatibilité

Navigateurs modernes : Chrome, Edge, Firefox et Safari récents. Le site utilise `clamp()`, les variables CSS, `:focus-visible`, `inert`, `aspect-ratio` et les unités de conteneur (`cqw`). Les navigateurs très anciens afficheront une version dégradée mais lisible.

---

## 9. Crédits

- Typographies : Google Fonts — Space Grotesk, DM Sans, Instrument Serif (licences SIL Open Font License).
- Identité, maquettes et code : VELNORA STUDIO (projet de démonstration).
