export type Locale = "es" | "en";

type Dict = Record<string, string>;

const es: Dict = {
  // Nav
  "nav.home": "Inicio",
  "nav.catalog": "Catálogo",
  "nav.about": "Nosotros",
  "nav.contact": "Contacto",
  "nav.quote": "Solicitar cotización",
  "nav.menu": "Abrir menú",
  "nav.language": "Idioma",

  // Categories
  "category.all": "Todos los productos",
  "category.enlatados": "Enlatados",
  "category.conservas": "Conservas",
  "category.congelados": "Congelados",

  // Product common
  "product.available": "Disponible",
  "product.unavailable": "Sin stock",

  // Hero
  "hero.badge": "Agroindustria Peruana de Exportación",
  "hero.title": "Agrosalas Peru",
  "hero.titleAccent": "S.R.L",
  "hero.description":
    "Dedicada a la exportación de conservas de legumbres, elaboradas bajo altos estándares de calidad e inocuidad, con presencia en España, Estados Unidos y Panamá.",
  "hero.ctaCatalog": "Ver catálogo completo",
  "hero.ctaQuote": "Solicitar cotización",
  "hero.scroll": "Scrollear hacia abajo",

  // Products preview
  "products.badge": "Nuestros productos",
  "products.title": "Lo mejor del campo",
  "products.description":
    "Seleccionamos los ingredientes más frescos para garantizar enlatados y conservas con calidad de exportación.",
  "products.viewCatalog": "Ver catálogo completo",

  // Benefits
  "benefits.badge": "¿Por qué elegirnos?",
  "benefits.title": "Comprometidos con la excelencia",
  "benefits.description":
    "Cada proceso en Agrosalas Peru está diseñado para ofrecerte el mejor producto, con el mejor servicio.",
  "benefit.quality.title": "Calidad garantizada",
  "benefit.quality.desc":
    "Cada lote pasa por rigurosos controles de calidad antes de salir al mercado.",
  "benefit.sustainability.title": "Sostenibilidad",
  "benefit.sustainability.desc":
    "Trabajamos con agricultura sostenible, cuidando los recursos naturales para las próximas generaciones.",
  "benefit.global.title": "Alcance global",
  "benefit.global.desc":
    "Exportamos a España, Estados Unidos y Panamá, con logística especializada para productos perecederos.",
  "benefit.experience.title": "4 años de experiencia",
  "benefit.experience.desc":
    "Mejorando nuestros procesos y construyendo relaciones duraderas con clientes y proveedores.",
  "benefit.logistics.title": "Coordinación logística",
  "benefit.logistics.desc":
    "Equipo dedicado a coordinar envíos, asegurando entregas puntuales y en óptimas condiciones.",
  "benefit.support.title": "Soporte personalizado",
  "benefit.support.desc":
    "Equipo comercial dedicado para asesorarte en la selección de productos, volúmenes y condiciones de compra.",

  // CTA section
  "cta.title": "¿Listo para hacer tu pedido?",
  "cta.description":
    "Contáctanos hoy y recibe una cotización personalizada para tu negocio. Atendemos distribuidores, supermercados y restaurantes.",
  "cta.button": "Enviar consulta",

  // Footer
  "footer.tagline":
    "Agroindustria peruana comprometida llevando lo mejor del campo a su mesa, con calidad de exportación.",
  "footer.navigation": "Navegación",
  "footer.products": "Productos",
  "footer.contact": "Contacto",
  "footer.copyright": "AgrosalasPeru S.R.L. Todos los derechos reservados.",
  "footer.madeIn": "Hecho con ❤️ en Perú 🇵🇪",

  // WhatsApp
  "wa.help": "¿Necesitas ayuda?",
  "wa.aria": "Contactar por WhatsApp",

  // Catalog page
  "catalog.headerBadge": "Catálogo 2026",
  "catalog.headerTitle": "Nuestros productos",
  "catalog.headerDesc":
    "Enlatados y conservas con calidad de exportación, directamente del campo peruano.",
  "catalog.searchPlaceholder": "Buscar producto...",
  "catalog.foundSingular": "producto encontrado",
  "catalog.foundPlural": "productos encontrados",
  "catalog.emptyTitle": "Sin resultados",
  "catalog.emptyDesc":
    "No encontramos productos con esos criterios. Intenta con otra búsqueda.",

  // Product detail
  "detail.back": "Volver al catálogo",
  "detail.presentation": "Presentación",
  "detail.availability": "Disponibilidad",
  "detail.description": "Descripción del producto",
  "detail.quoteCta": "Solicitar cotización",
  "detail.whatsappCta": "WhatsApp",
  "detail.related": "Productos relacionados",
  "detail.notFound": "Producto no encontrado",

  // About page
  "about.headerBadge": "Nuestra historia",
  "about.headerTitle": "Cultivando confianza",
  "about.headerDesc":
    "Somos una empresa agroindustrial familiar que nació en 2021 con el propósito de llevar conservas de legumbres saludables y de calidad desde el Perú al mundo.",
  "about.missionTitle": "Nuestra misión",
  "about.missionDesc":
    "Ser una empresa líder en la agroexportación de conservas de legumbres sanas y saludables, impulsando la innovación continua en nuestros productos y procesos, garantizando calidad e inocuidad, y proyectándonos al desarrollo de productos deshidratados y congelados.",
  "about.visionTitle": "Nuestra visión",
  "about.visionDesc":
    "Desarrollar y comercializar, junto a nuestros clientes y proveedores, alimentos de alta calidad para la agroexportación y el mercado local, logrando un crecimiento sostenido de la empresa, generando valor para nuestros accionistas, bienestar para nuestros colaboradores y contribuyendo al desarrollo y la imagen del Perú, con una proyección de diversificación hacia productos deshidratados y congelados.",
  "about.valuesBadge": "Valores corporativos",
  "about.valuesTitle": "Lo que nos define",
  "value.quality.title": "Calidad",
  "value.quality.desc":
    "Cada producto que sale de nuestras plantas lleva el sello de calidad que nos ha caracterizado por años. No aceptamos nada menos que lo mejor.",
  "value.people.title": "Personas primero",
  "value.people.desc":
    "Valoramos a nuestros colaboradores, proveedores y clientes como los pilares de nuestro negocio. Las relaciones duraderas son nuestra mayor fortaleza.",
  "value.innovation.title": "Innovación constante",
  "value.innovation.desc":
    "Invertimos continuamente en tecnología y capacitación para ofrecer procesos más eficientes y productos que superen las expectativas del mercado.",
  "value.transparency.title": "Transparencia",
  "value.transparency.desc":
    "Operamos con honestidad en cada interacción: con nuestros clientes, proveedores y con el entorno donde trabajamos.",

  // Contact page
  "contact.headerBadge": "Hablemos",
  "contact.headerTitle": "¿En qué podemos ayudarte?",
  "contact.headerDesc":
    "Completa el formulario y te responderemos en menos de 24 horas hábiles.",
  "contact.infoTitle": "Información de contacto",
  "contact.phoneLabel": "Teléfono / WhatsApp",
  "contact.emailLabel": "Correo electrónico",
  "contact.addressLabel": "Dirección",
  "contact.hoursLabel": "Horario de atención",
  "contact.hoursValue": "Lun–Vie: 8:00 am – 6:00 pm",
  "contact.waTitle": "Chatea por WhatsApp",
  "contact.waSubtitle": "Respuesta inmediata",
  "contact.formTitle": "Envíanos un mensaje",

  // Contact form
  "form.name": "Nombre completo",
  "form.namePh": "Juan Pérez",
  "form.email": "Correo electrónico",
  "form.emailPh": "juan@empresa.com",
  "form.phone": "Teléfono / WhatsApp",
  "form.phonePh": "+51 999 000 111",
  "form.subject": "Asunto",
  "form.subjectPh": "Selecciona un asunto",
  "form.message": "Mensaje",
  "form.messagePh":
    "Cuéntanos qué productos te interesan, volúmenes, destino, etc.",
  "form.submit": "Enviar mensaje",
  "form.submitLoading": "Enviando mensaje...",
  "form.successTitle": "¡Mensaje enviado!",
  "form.successDescBefore": "Gracias por contactarnos. Te responderemos a",
  "form.successDescAfter": "en menos de 24 horas hábiles.",
  "form.successEmailFallback": "tu correo",
  "form.successButton": "Enviar otro mensaje",
  "form.errorDefault": "Ocurrió un error. Intenta de nuevo.",
  "form.privacy":
    "Al enviar aceptas que procesemos tu información para responderte. No compartimos tus datos con terceros.",
  "subject.quote": "Solicitud de cotización",
  "subject.info": "Información de productos",
  "subject.wholesale": "Pedido mayorista",
  "subject.export": "Exportación / Distribución",
  "subject.other": "Otro",

  // 404
  "nf.title": "404",
  "nf.desc": "Ups, esta página no existe o fue removida.",
  "nf.back": "Volver al inicio",

  // Language switcher
  "lang.es": "ES",
  "lang.en": "EN",
};

const en: Dict = {
  // Nav
  "nav.home": "Home",
  "nav.catalog": "Catalog",
  "nav.about": "About us",
  "nav.contact": "Contact",
  "nav.quote": "Request a quote",
  "nav.menu": "Open menu",
  "nav.language": "Language",

  // Categories
  "category.all": "All products",
  "category.enlatados": "Canned",
  "category.conservas": "Preserves",
  "category.congelados": "Frozen",

  // Product common
  "product.available": "Available",
  "product.unavailable": "Out of stock",

  // Hero
  "hero.badge": "Peruvian Agroindustry for Export",
  "hero.title": "Agrosalas Peru",
  "hero.titleAccent": "S.R.L",
  "hero.description":
    "Dedicated to exporting canned legumes, produced under the highest standards of quality and safety, with presence in Spain, the United States and Panama.",
  "hero.ctaCatalog": "View full catalog",
  "hero.ctaQuote": "Request a quote",
  "hero.scroll": "Scroll down",

  // Products preview
  "products.badge": "Our products",
  "products.title": "The best from the field",
  "products.description":
    "We select the freshest ingredients to guarantee canned foods and preserves with export-grade quality.",
  "products.viewCatalog": "View full catalog",

  // Benefits
  "benefits.badge": "Why choose us?",
  "benefits.title": "Committed to excellence",
  "benefits.description":
    "Every process at Agrosalas Peru is designed to deliver you the best product, with the best service.",
  "benefit.quality.title": "Guaranteed quality",
  "benefit.quality.desc":
    "Every batch goes through rigorous quality controls before reaching the market.",
  "benefit.sustainability.title": "Sustainability",
  "benefit.sustainability.desc":
    "We work with sustainable agriculture, caring for natural resources for future generations.",
  "benefit.global.title": "Global reach",
  "benefit.global.desc":
    "We export to Spain, the United States and Panama, with specialized logistics for perishable products.",
  "benefit.experience.title": "4 years of experience",
  "benefit.experience.desc":
    "Continuously improving our processes and building lasting relationships with clients and suppliers.",
  "benefit.logistics.title": "Logistics coordination",
  "benefit.logistics.desc":
    "A dedicated team that coordinates shipments, ensuring on-time deliveries in optimal condition.",
  "benefit.support.title": "Personalized support",
  "benefit.support.desc":
    "A dedicated commercial team to advise you on product selection, volumes and purchase conditions.",

  // CTA section
  "cta.title": "Ready to place your order?",
  "cta.description":
    "Contact us today and get a personalized quote for your business. We serve distributors, supermarkets and restaurants.",
  "cta.button": "Send inquiry",

  // Footer
  "footer.tagline":
    "A Peruvian agroindustry committed to bringing the best of the field to your table, with export-grade quality.",
  "footer.navigation": "Navigation",
  "footer.products": "Products",
  "footer.contact": "Contact",
  "footer.copyright": "AgrosalasPeru S.R.L. All rights reserved.",
  "footer.madeIn": "Made with ❤️ in Peru 🇵🇪",

  // WhatsApp
  "wa.help": "Need help?",
  "wa.aria": "Contact us on WhatsApp",

  // Catalog page
  "catalog.headerBadge": "2026 Catalog",
  "catalog.headerTitle": "Our products",
  "catalog.headerDesc":
    "Canned foods and preserves with export-grade quality, directly from the Peruvian countryside.",
  "catalog.searchPlaceholder": "Search product...",
  "catalog.foundSingular": "product found",
  "catalog.foundPlural": "products found",
  "catalog.emptyTitle": "No results",
  "catalog.emptyDesc":
    "We couldn't find products matching your criteria. Try another search.",

  // Product detail
  "detail.back": "Back to catalog",
  "detail.presentation": "Presentation",
  "detail.availability": "Availability",
  "detail.description": "Product description",
  "detail.quoteCta": "Request a quote",
  "detail.whatsappCta": "WhatsApp",
  "detail.related": "Related products",
  "detail.notFound": "Product not found",

  // About page
  "about.headerBadge": "Our story",
  "about.headerTitle": "Cultivating trust",
  "about.headerDesc":
    "We are a family-run agroindustrial company founded in 2021 with the purpose of bringing healthy, high-quality canned legumes from Peru to the world.",
  "about.missionTitle": "Our mission",
  "about.missionDesc":
    "To be a leading company in the agro-export of healthy, wholesome canned legumes, driving continuous innovation in our products and processes, ensuring quality and safety, and expanding toward the development of dehydrated and frozen products.",
  "about.visionTitle": "Our vision",
  "about.visionDesc":
    "To develop and market, together with our clients and suppliers, high-quality food for agro-export and the local market, achieving sustained growth for the company, generating value for our shareholders, well-being for our team, and contributing to the development and image of Peru, with a projection toward diversification into dehydrated and frozen products.",
  "about.valuesBadge": "Corporate values",
  "about.valuesTitle": "What defines us",
  "value.quality.title": "Quality",
  "value.quality.desc":
    "Every product that leaves our plants carries the quality seal that has defined us for years. We accept nothing less than the best.",
  "value.people.title": "People first",
  "value.people.desc":
    "We value our team members, suppliers and clients as the pillars of our business. Lasting relationships are our greatest strength.",
  "value.innovation.title": "Constant innovation",
  "value.innovation.desc":
    "We continuously invest in technology and training to deliver more efficient processes and products that exceed market expectations.",
  "value.transparency.title": "Transparency",
  "value.transparency.desc":
    "We operate with honesty in every interaction: with our clients, our suppliers and the environment where we work.",

  // Contact page
  "contact.headerBadge": "Let's talk",
  "contact.headerTitle": "How can we help you?",
  "contact.headerDesc":
    "Fill out the form and we'll get back to you within 24 business hours.",
  "contact.infoTitle": "Contact information",
  "contact.phoneLabel": "Phone / WhatsApp",
  "contact.emailLabel": "Email address",
  "contact.addressLabel": "Address",
  "contact.hoursLabel": "Business hours",
  "contact.hoursValue": "Mon–Fri: 8:00 am – 6:00 pm",
  "contact.waTitle": "Chat on WhatsApp",
  "contact.waSubtitle": "Immediate response",
  "contact.formTitle": "Send us a message",

  // Contact form
  "form.name": "Full name",
  "form.namePh": "John Doe",
  "form.email": "Email address",
  "form.emailPh": "john@company.com",
  "form.phone": "Phone / WhatsApp",
  "form.phonePh": "+1 999 000 111",
  "form.subject": "Subject",
  "form.subjectPh": "Select a subject",
  "form.message": "Message",
  "form.messagePh":
    "Tell us which products you're interested in, volumes, destination, etc.",
  "form.submit": "Send message",
  "form.submitLoading": "Sending message...",
  "form.successTitle": "Message sent!",
  "form.successDescBefore": "Thanks for contacting us. We'll reply to",
  "form.successDescAfter": "within 24 business hours.",
  "form.successEmailFallback": "your email",
  "form.successButton": "Send another message",
  "form.errorDefault": "Something went wrong. Please try again.",
  "form.privacy":
    "By submitting, you agree that we process your information to respond to you. We don't share your data with third parties.",
  "subject.quote": "Quote request",
  "subject.info": "Product information",
  "subject.wholesale": "Wholesale order",
  "subject.export": "Export / Distribution",
  "subject.other": "Other",

  // 404
  "nf.title": "404",
  "nf.desc": "Oops, this page doesn't exist or has been removed.",
  "nf.back": "Back to home",

  // Language switcher
  "lang.es": "ES",
  "lang.en": "EN",
};

export const translations: Record<Locale, Dict> = { es, en };

export type TranslationKey = keyof typeof es;
