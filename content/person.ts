import type { Contact, Person } from "./types";

/**
 * PERSONAL DATA & CONTACT
 * Edit here: name, positioning, location, availability, photos, email, LinkedIn and other links.
 * Everything below is used by the website, the CV PDF and the portfolio PDF.
 */

export const person: Person = {
  brandName: "Marcos Renilla",
  fullName: "Marcos Renilla", // [ADD NAME] — replace with the full name you want on the CV if different.
  positioning: {
    es: "Comunicación, creatividad y proyectos digitales",
    en: "Communication, Creativity & Digital Projects",
  },
  location: { es: "[ADD LOCATION]", en: "[ADD LOCATION]" },
  availability: { es: "[ADD AVAILABILITY]", en: "[ADD AVAILABILITY]" },
  // [ADD PROFILE PHOTO] — e.g. { src: "/images/profile/portrait.jpg", alt: {...}, width: 1600, height: 2000 }
  portrait: null,
  aboutPhoto: null,
};

export const contact: Contact = {
  email: "[ADD CONTACT DETAILS]",
  phone: null, // optional, e.g. "+34 600 000 000"
  linkedin: {
    label: "LinkedIn",
    url: "", // [ADD CONTACT DETAILS] e.g. "https://www.linkedin.com/in/your-handle"
    display: "[ADD CONTACT DETAILS]",
  },
  // Other professional profiles. Example:
  // { label: "Instagram", url: "https://instagram.com/handle", display: "@handle" }
  links: [],
};
