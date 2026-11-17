import type { Contact, Person } from "./types";

/**
 * PERSONAL DATA & CONTACT
 * Edit here: name, positioning, location, availability, photos, email, LinkedIn and other links.
 * Everything below is used by the website, the CV PDF and the portfolio PDF.
 */

export const person: Person = {
  brandName: "Marcos Renilla",
  fullName: "Marcos Renilla Muñoz", // Used on the CV and in document metadata; the web uses brandName.
  positioning: {
    es: "Comunicación, creatividad y proyectos digitales",
    en: "Communication, Creativity & Digital Projects",
  },
  location: { es: "Madrid, España", en: "Madrid, Spain" },
  availability: { es: "Incorporación inmediata", en: "Available to start immediately" },
  portrait: {
    // Cut-out from a frame of Marcos's own video (background removed, no other edits to his appearance).
    src: "/images/profile/portrait-cutout.png",
    alt: { es: "Marcos Renilla", en: "Marcos Renilla" },
    width: 1062,
    height: 1800,
    cutout: true,
  },
  aboutPhoto: {
    src: "/images/profile/about.jpg",
    alt: { es: "Marcos Renilla en una azotea", en: "Marcos Renilla on a rooftop" },
    width: 1600,
    height: 2133,
  },
};

export const contact: Contact = {
  email: "renillamarcos5@gmail.com",
  phone: "+34 644 20 23 24", // set to null to hide it from the web and the CV
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/marcos-renilla-mu%C3%B1oz-855598231",
    display: "linkedin.com/in/marcos-renilla-muñoz-855598231",
  },
  // Other professional profiles.
  links: [{ label: "Instagram", url: "https://www.instagram.com/marcosrenilla/", display: "@marcosrenilla" }],
};
