/**
 * Public entry point of the content layer.
 * The website (app/, components/) and the PDF generators (pdf/) import from here only.
 */
export * from "./types";
export { person, contact } from "./person";
export { profile } from "./profile";
export { experience } from "./experience";
export { education, courses, certifications, languages } from "./education";
export { skillCategories } from "./skills";
export { projects, projectKinds, projectCategories } from "./projects";
export { ui } from "./ui";
