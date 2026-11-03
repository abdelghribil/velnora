/* ==========================================================================
   VELNORA STUDIO — central configuration
   Change the brand, contact details and form endpoint here.
   ========================================================================== */

window.VELNORA = {
  brand: {
    name: "VELNORA",
    suffix: "STUDIO",
    full: "VELNORA STUDIO",
    tagline: "Des expériences digitales qui font avancer les entreprises.",
    taglineEn: "Digital experiences that move businesses forward.",
    legalName: ""
  },

  contact: {
    // Placeholder address — replace with a mailbox that actually receives mail.
    email: "bonjour@velnora.studio",
    // International format without “+” or spaces. Leave empty to open WhatsApp
    // with a pre-filled message and let the visitor choose a recipient.
    whatsapp: "",
    whatsappMessage:
      "Bonjour VELNORA STUDIO, je souhaite parler d'un projet digital.",
    // Add a POST endpoint (Formspree, Cloudflare Worker, etc.) to enable direct
    // form delivery. When empty, the form prepares an email/WhatsApp message.
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
    locales: [
      { code: "fr", label: "Français", dir: "ltr", available: true },
      { code: "en", label: "English", dir: "ltr", available: false },
      { code: "ar", label: "العربية", dir: "rtl", available: false }
    ]
  }
};
