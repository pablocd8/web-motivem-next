export default function sitemap() {
  const baseUrl = "https://motivem.es";

  const routes = [
    "",
    "/quienes-somos",
    "/servicios",
    "/talleres",
    "/contacto",
    "/solicitar-cita",
    "/guia-familias",
    "/accesibilidad",
    "/aviso-legal",
    "/politica-privacidad",
    "/politica-cookies",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  return routes;
}
