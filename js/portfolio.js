/* ==========================================================================
   VELNORA STUDIO — portfolio configuration
   Add a demo here, then drop its standalone site into public/demos/<id>/.
   The portfolio UI reads this file and renders itself on index.html and
   work.html. No other file needs to change.
   ========================================================================== */

window.VELNORA_PORTFOLIO = {
  filters: [
    { id: "all", label: "Tous les univers" },
    { id: "restaurant", label: "Restaurant" },
    { id: "beauty", label: "Beauté" },
    { id: "automotive", label: "Automobile" },
    { id: "travel", label: "Voyage" },
    { id: "ecommerce", label: "E-commerce" }
  ],

  projects: [
    {
      id: "dar-zellij",
      number: "01",
      title: "Dar Zellij",
      category: "Restaurant & hôtellerie",
      categoryId: "restaurant",
      tagline: "Le goût du Maroc, réinventé.",
      description:
        "Une maison marocaine contemporaine : carte éditoriale, galerie chaleureuse et réservation fluide, pensée mobile d'abord.",
      demoUrl: "public/demos/dar-zellij/index.html",
      thumbnail: "assets/portfolio/dar-zellij.svg",
      technologies: ["HTML", "CSS", "JavaScript", "Réservation", "WhatsApp"],
      featured: true,
      status: "Démo interactive",
      year: "2026",
      accent: "#c8a45c",
      details: {
        challenge:
          "Traduire la chaleur d'une maison marocaine en une expérience digitale élégante, sans jamais sacrifier la lisibilité ni la vitesse sur mobile.",
        approach:
          "Une direction artistique inspirée du zellige : vert profond, crème et laiton. La carte se parcourt par chapitres, la galerie laisse respirer les matières, et la réservation reste accessible depuis chaque section.",
        highlights: [
          "Carte interactive par catégories (entrées, plats, desserts, boissons)",
          "Galerie éditoriale responsive et réservation avec validation locale",
          "Appel WhatsApp prérempli pour confirmer une demande"
        ],
        deliverables: ["Direction artistique", "Site vitrine", "Parcours de réservation", "Galerie"]
      }
    },

    {
      id: "nova-beauty",
      number: "02",
      title: "Nova Beauty",
      category: "Beauté & bien-être",
      categoryId: "beauty",
      tagline: "Votre beauté, révélée.",
      description:
        "Un écrin beauté minimaliste où chaque soin, tarif et créneau trouve naturellement sa place.",
      demoUrl: "public/demos/nova-beauty/index.html",
      thumbnail: "assets/portfolio/nova-beauty.svg",
      technologies: ["HTML", "CSS", "JavaScript", "Prise de rendez-vous", "Mobile-first"],
      featured: false,
      status: "Démo interactive",
      year: "2026",
      accent: "#c08f86",
      details: {
        challenge:
          "Créer une présence désirable et rassurante dans un secteur saturé d'images similaires, sans tomber dans les codes génériques du luxe beauté.",
        approach:
          "Une palette blush, crème et prune, une typographie serif contemporaine et beaucoup d'espace. Le parcours de rendez-vous est réduit à l'essentiel : soin, créneau, coordonnées.",
        highlights: [
          "Catalogue de soins avec tarifs et durées indicatives",
          "Sélecteur de créneaux et récapitulatif avant validation",
          "Présentation de l'équipe et galerie d'ambiance responsive"
        ],
        deliverables: ["Identité digitale", "Site vitrine", "Interface de réservation", "Contenu éditorial"]
      }
    },

    {
      id: "auto-prime",
      number: "03",
      title: "Auto Prime",
      category: "Automobile",
      categoryId: "automotive",
      tagline: "La route. Sans compromis.",
      description:
        "Une identité industrielle précise, des offres lisibles et une demande d'intervention sans friction.",
      demoUrl: "public/demos/auto-prime/index.html",
      thumbnail: "assets/portfolio/auto-prime.svg",
      technologies: ["HTML", "CSS", "JavaScript", "Formulaire de devis", "UX"],
      featured: false,
      status: "Démo interactive",
      year: "2026",
      accent: "#2f7bff",
      details: {
        challenge:
          "Les services automobiles inspirent souvent la méfiance. Le site doit rendre les prestations compréhensibles, les étapes prévisibles et la demande de devis immédiate.",
        approach:
          "Un contraste charbon et bleu électrique, une typographie condensée et des blocs courts. Le formulaire se concentre sur le véhicule, le besoin et les coordonnées, sans promesse excessive.",
        highlights: [
          "Six prestations détaillées et trois formules d'entretien",
          "Demande d'intervention avec véhicule, service et créneau",
          "Section atelier, horaires et localisation de démonstration"
        ],
        deliverables: ["UX", "Site vitrine", "Formulaire de devis", "Système visuel"]
      }
    },

    {
      id: "atlas-travel",
      number: "04",
      title: "Atlas Travel",
      category: "Tourisme & voyage",
      categoryId: "travel",
      tagline: "Le Maroc, autrement.",
      description:
        "Une agence de voyage premium qui transforme le désir d'ailleurs en itinéraires clairs et désirables.",
      demoUrl: "public/demos/atlas-travel/index.html",
      thumbnail: "assets/portfolio/atlas-travel.svg",
      technologies: ["HTML", "CSS", "JavaScript", "Itinéraires", "Demande de voyage"],
      featured: false,
      status: "Démo interactive",
      year: "2026",
      accent: "#b45532",
      details: {
        challenge:
          "Donner envie de partir tout en rendant les circuits, durées et inclusions immédiatement compréhensibles, sur un marché où les voyageurs comparent beaucoup.",
        approach:
          "Un récit visuel inspiré des paysages atlas : sable, terre cuite et vert profond. Les destinations sont traitées comme des chapitres, les circuits comme des itinéraires lisibles, la demande comme une conversation.",
        highlights: [
          "Destinations éditoriales avec filtres d'ambiance",
          "Trois circuits détaillés avec étapes et inclusions",
          "Formulaire de demande de voyage avec dates et voyageurs"
        ],
        deliverables: ["Direction artistique", "Site vitrine", "Fiches circuits", "Demande de voyage"]
      }
    },

    {
      id: "artisan-shop",
      number: "05",
      title: "Artisan Shop",
      category: "E-commerce & artisanat",
      categoryId: "ecommerce",
      tagline: "L'art de la main.",
      description:
        "Une boutique éditoriale pour l'artisanat marocain, avec panier, filtres et parcours de commande local.",
      demoUrl: "public/demos/artisan-shop/index.html",
      thumbnail: "assets/portfolio/artisan-shop.svg",
      technologies: ["HTML", "CSS", "JavaScript", "Panier local", "Filtres"],
      featured: false,
      status: "Démo interactive",
      year: "2026",
      accent: "#a9542f",
      details: {
        challenge:
          "Valoriser des objets faits main sans les noyer dans un catalogue génériques : garder la matière, le geste et l'origine au premier plan.",
        approach:
          "Une grille éditoriale, des fiches produit sobres et un panier latéral immédiatement lisible. Le parcours de commande est une démonstration locale, sans paiement ni base de données.",
        highlights: [
          "Filtres par catégorie et fiches produit détaillées",
          "Panier en JavaScript avec quantités, suppression et sous-total",
          "Parcours de commande de démonstration clairement identifié"
        ],
        deliverables: ["E-commerce", "Direction artistique", "Fiches produit", "Parcours panier"]
      }
    }
  ]
};
