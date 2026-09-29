/**
 * RITMO SALSERO - CARGADOR DINÁMICO DE CONFIGURACIÓN DEL SITIO
 * Lee la configuración guardada desde el Panel de Administración (localStorage)
 * y actualiza en tiempo real los textos, enlaces, WhatsApp, precios, redes sociales y avisos de index.html.
 */

const DEFAULT_SITE_CONFIG = {
  // 1. Identidad & Logotipo
  brandName: "RITMO SALSERO",
  brandTagline: "Escuela de Salsa & Cumbia • San Martín de las Pirámides",
  venueName: "Casa de Cultura Neteotiloyan",
  venueQuote: "Son los mejores",
  copyrightYear: "2026",
  activeLogoKey: "opcion4", // Por defecto: Opción 4: Sol (Oro)

  // 2. Banner de Avisos & Clase Muestra
  bannerEnabled: true,
  freeSampleClassEnabled: true,
  bannerTextWithSample: "🎉 ¡Inscripciones abiertas este mes! Primera clase muestra GRATIS al registrarte por WhatsApp.",
  bannerTextWithoutSample: "🎉 ¡Inscripciones abiertas este mes! Consulta horarios e inscríbete por WhatsApp.",
  bannerText: "🎉 ¡Inscripciones abiertas este mes! Primera clase muestra GRATIS al registrarte por WhatsApp.",
  bannerBtnText: "¡Apartar Lugar!",
  bannerBtnUrl: "#horarios",

  // 3. Hero Principal
  heroBadge: "🔥 Clases Abiertas para Principiantes y Todos los Niveles",
  heroTitleLine1: "Aprende a Bailar",
  heroTitleLine2: "Salsa & Cumbia",
  heroSubtitle: "En Ritmo Salsero te enseñamos a bailar con técnica real, soltura y pasión bajo el cielo de las Pirámides. ¡No necesitas pareja ni experiencia previa!",
  heroCtaText: "WhatsApp Oficial",
  heroSecondaryCtaText: "Ver Horarios Semanales",
  heroStatStudents: "350+",
  heroStatStudentsLabel: "Alumnos formados",
  heroStatYears: "8+",
  heroStatYearsLabel: "Años de experiencia",
  heroStatStyles: "3",
  heroStatStylesLabel: "Ritmos principales",

  // 4. Horarios Badge
  scheduleBadge: "", // Dejar vacío para no mostrar leyenda o personalizarla desde el admin

  // 5. Precios & Planes
  pricingSectionEnabled: true,
  pricingSubtitle: "Elige el plan que mejor se adapte a tu ritmo de vida y metas de baile.",
  plan1: {
    name: "Clase Individual",
    price: "$80",
    period: "/ clase",
    desc: "Ideal para probar o asistir ocasionalmente",
    features: ["Acceso a 1 sesión de 60 min", "Elige Salsa o Cumbia", "No requieres inscripción"]
  },
  plan2: {
    name: "Plan Mensual (1 Ritmo)",
    price: "$450",
    period: "/ mes",
    badge: "★ Más Popular",
    desc: "2 clases por semana (8 clases al mes)",
    features: ["8 clases al mes (2 semanales)", "Corrección de postura personalizada", "Descuento especial si vienes en pareja", "Acceso a prácticas sociales"]
  },
  plan3: {
    name: "Full Pass Total",
    price: "$750",
    period: "/ mes",
    badge: "Experiencia Completa",
    desc: "Salsa + Cumbia (Hasta 4 clases por semana)",
    features: ["Hasta 16 clases al mes", "Salsa y Cumbia sin límites", "Mayor avance y destreza en pista"]
  },

  // 6. Contacto, WhatsApp & Redes Sociales
  whatsappType: "direct", // "direct" | "group"
  whatsappGroupUrl: "",
  whatsappNumber: "525512345678",
  whatsappDisplay: "55 1234 5678",
  whatsappMessage: "¡Hola! Me gustaría pedir informes sobre las clases de baile en Ritmo Salsero (horarios y clase muestra).",
  phoneDisplay: "55 1234 5678",
  addressFull: "Casa de Cultura Neteotiloyan, Av. 16 de Septiembre s/n, Centro, San Martín de las Pirámides, Edo. Méx.",
  mapsUrl: "https://maps.google.com/?q=Casa+de+Cultura+Neteotiloyan+San+Martin+de+las+Piramides",
  instagramUrl: "https://instagram.com",
  facebookUrl: "https://facebook.com",
  tiktokUrl: "https://tiktok.com",
  youtubeUrl: "",

  // 7. Botón Llamar a la Escuela (Instalaciones Oficiales)
  callBtnText: "📞 Llamar a la Escuela",
  callBtnPhone: "",
  callBtnEnabled: false,

  // 8. Sección de Videos Sociales (Facebook, Instagram, TikTok, YouTube)
  videoSectionEnabled: true,
  videoSectionBadge: "🎬 Pasión en la Pista",
  videoSectionTitle: "Nuestras Clases en Acción",
  videoSectionSubtitle: "Descubre el ambiente, la energía y el progreso de nuestros alumnos en Casa de Cultura. ¡Siente el ritmo de nuestra comunidad!",
  video1Type: "instagram",
  video1Enabled: true,
  video1Title: "Salsa Cubana - Vueltas y Coordinación",
  video1Desc: "Práctica de técnica y vueltas en nuestras clases de Casa de Cultura.",
  video1Url: "https://www.instagram.com/reel/DZ9eJ2LTJ2a/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  video2Type: "instagram",
  video2Enabled: true,
  video2Title: "Cumbia y Ritmo en Pista",
  video2Desc: "Aprende el paso básico, cadencia y vueltas con alegría en pareja.",
  video2Url: "https://www.instagram.com/reel/DaevwnWTAdk/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
  video3Type: "facebook",
  video3Enabled: true,
  video3Title: "Ambiente y Pasión Salsera",
  video3Desc: "Nuestra comunidad bailando y disfrutando cada semana en Casa de Cultura.",
  video3Url: "https://www.facebook.com/reel/3895288920775495/",
  video4Type: "instagram",
  video4Enabled: false,
  video4Title: "Coreografía y Pasos Libres",
  video4Desc: "Secuencias avanzadas para lucir en cualquier evento o fiesta.",
  video4Url: ""
};

const SITE_CONFIG_STORAGE_KEY = "ritmo_salsero_site_config";

const LOGO_VARIANTS_MAP = {
  'opcion4': { img: './assets/logo_opcion_4_transparente.png', label: 'Opción 4: Sol (Oro Imperial)' },
  'opcion4A': { img: './assets/logo_opcion_4A_transparente.png', label: 'Opción 4A: Esmeralda Tropical' },
  'opcion4B': { img: './assets/logo_opcion_4B_transparente.png', label: 'Opción 4B: Turquesa Prehispánico' },
  'opcion4C': { img: './assets/logo_opcion_4C_transparente.png', label: 'Opción 4C: Neón Magenta' },
  'opcion4D': { img: './assets/logo_opcion_4D_transparente.png', label: 'Opción 4D: Cempasúchil & Oro' },
  'opcion4E': { img: './assets/logo_opcion_4E_transparente.png', label: 'Opción 4E: Azul Cobalto & Plata' },
  'opcion4F': { img: './assets/logo_opcion_4F_transparente.png', label: 'Opción 4F: Atardecer Sunset' },
  'opcion4G': { img: './assets/logo_opcion_4G_transparente.png', label: 'Opción 4G: Borgoña & Oro Rosa' },
  'rep_ano_nuevo': { img: './assets/logo_representativo_ano_nuevo_transparente.png', label: 'Año Nuevo: Reloj 12:00 & Champaña' },
  'rep_dia_de_muertos': { img: './assets/logo_representativo_dia_de_muertos_transparente.png', label: 'Día de Muertos: Catrina & Cempasúchil' },
  'rep_15_septiembre': { img: './assets/logo_representativo_15_septiembre_transparente.png', label: '15 de Septiembre: Charro & Campana' },
  'rep_navidad': { img: './assets/logo_representativo_navidad_transparente.png', label: 'Navidad: Nochebuenas & Gorro Santa' },
  'rep_21_marzo': { img: './assets/logo_representativo_21_marzo_transparente.png', label: '21 de Marzo: Pirámide Teotihuacán' },
  'rep_halloween': { img: './assets/logo_representativo_halloween_transparente.png', label: 'Halloween: Calabaza & Fiesta' },
  'opcion1': { img: './assets/logo_opcion_1_transparente.png', label: 'Opción 1: Pirámide del Sol' },
  'opcion2': { img: './assets/logo_opcion_2_transparente.png', label: 'Opción 2: Clave Sol & Pasión' },
  'opcion3': { img: './assets/logo_opcion_3_transparente.png', label: 'Opción 3: Escudo Tradicional' }
};

/**
 * Obtiene la configuración actual del sitio
 */
function getSiteConfig() {
  try {
    const raw = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed._updatedAt) {
        parsed._updatedAt = Date.now();
        try { localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(parsed)); } catch(e) {}
      }
      // Auto-migración si contenía el texto antiguo o títulos no deseados
      if (!parsed.heroTitleLine1 || parsed.heroTitleLine1.includes("Siente el fuego")) {
        parsed.heroTitleLine1 = "Aprende a Bailar";
        parsed.heroTitleLine2 = "Salsa & Cumbia";
      }
      if (typeof parsed.bannerEnabled !== "undefined") {
        parsed.bannerEnabled = (parsed.bannerEnabled === true || parsed.bannerEnabled === "true" || (parsed.bannerEnabled !== false && parsed.bannerEnabled !== "false" && parsed.bannerEnabled !== 0));
      }
      if (typeof parsed.freeSampleClassEnabled !== "boolean") {
        parsed.freeSampleClassEnabled = parsed.bannerText ? (parsed.bannerText.includes("GRATIS") || parsed.bannerText.includes("muestra")) : true;
      }
      if (!parsed.bannerTextWithSample) {
        parsed.bannerTextWithSample = "🎉 ¡Inscripciones abiertas este mes! Primera clase muestra GRATIS al registrarte por WhatsApp.";
      }
      if (!parsed.bannerTextWithoutSample) {
        parsed.bannerTextWithoutSample = "🎉 ¡Inscripciones abiertas este mes! Consulta horarios e inscríbete por WhatsApp.";
      }
      const res = Object.assign({}, DEFAULT_SITE_CONFIG, parsed);
      window.SITE_CONFIG = res;
      return res;
    }
  } catch (e) {
    console.warn("No se pudo leer ritmo_salsero_site_config de localStorage:", e);
  }
  const res = Object.assign({}, DEFAULT_SITE_CONFIG);
  window.SITE_CONFIG = res;
  return res;
}

/**
 * Guarda la configuración en localStorage y la aplica en tiempo real
 */
function saveSiteConfig(newConfig) {
  try {
    newConfig._updatedAt = Date.now();
    localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(newConfig));
    window.SITE_CONFIG = newConfig;
    applySiteConfigToDOM(newConfig);

    // Sincronización automática con la Nube (Firebase Firestore)
    if (typeof window !== "undefined" && window.RitmoFirebase && window.RitmoFirebase.isConfigured()) {
      window.RitmoFirebase.saveSiteConfigToCloud(newConfig);
    }

    return true;
  } catch (e) {
    console.error("Error al guardar site config:", e);
    return false;
  }
}

/**
 * Aplica la configuración en tiempo real a los elementos del DOM de index.html
 */
function applySiteConfigToDOM(config = null) {
  const cfg = config || getSiteConfig();
  window.SITE_CONFIG = cfg;

  // 1. Banner de Anuncios & Promoción de Clase Muestra
  const banner = document.getElementById("promo-banner");
  const bannerText = document.getElementById("promo-banner-text");
  const bannerBtn = document.getElementById("promo-banner-btn");

  const isBannerEnabled = (cfg.bannerEnabled === true || cfg.bannerEnabled === "true" || (cfg.bannerEnabled !== false && cfg.bannerEnabled !== "false" && cfg.bannerEnabled !== 0));
  const hasFreeSample = (cfg.freeSampleClassEnabled === true || cfg.freeSampleClassEnabled === "true" || (cfg.freeSampleClassEnabled !== false && cfg.freeSampleClassEnabled !== "false" && cfg.freeSampleClassEnabled !== 0));

  if (banner) {
    if (isBannerEnabled) {
      banner.classList.remove("hidden");
      banner.style.removeProperty("display");
      banner.style.display = "";

      let activeBannerText = "";
      if (hasFreeSample) {
        activeBannerText = cfg.bannerTextWithSample || cfg.bannerText || "🎉 ¡Inscripciones abiertas este mes! Primera clase muestra GRATIS al registrarte por WhatsApp.";
      } else {
        activeBannerText = cfg.bannerTextWithoutSample || "🎉 ¡Inscripciones abiertas este mes! Consulta horarios e inscríbete por WhatsApp.";
      }

      if (bannerText) bannerText.innerHTML = activeBannerText;
      if (bannerBtn) {
        bannerBtn.textContent = cfg.bannerBtnText || (hasFreeSample ? "¡Apartar Clase Muestra!" : "¡Pedir Informes!");
        bannerBtn.href = cfg.bannerBtnUrl || "#horarios";
      }
    } else {
      banner.classList.add("hidden");
      banner.style.setProperty("display", "none", "important");
    }
  }

  // Actualizar botones y textos relacionados con Clase Muestra en la web
  const navSampleBtnText = document.getElementById("nav-sample-class-btn-text");
  if (navSampleBtnText) {
    navSampleBtnText.textContent = hasFreeSample ? "Clase Muestra" : "Pedir Informes";
  }

  const mobileSampleBtnText = document.getElementById("mobile-sample-class-btn-text");
  if (mobileSampleBtnText) {
    mobileSampleBtnText.textContent = hasFreeSample ? "¡Apartar Clase Muestra!" : "¡Solicitar Informes!";
  }

  const bookingModalTitle = document.getElementById("booking-modal-title");
  if (bookingModalTitle) {
    bookingModalTitle.textContent = hasFreeSample ? "¡Aparta tu Clase Muestra!" : "¡Solicita Informes e Inscríbete!";
  }

  const bookingModalSubtitle = document.getElementById("booking-modal-subtitle");
  if (bookingModalSubtitle) {
    bookingModalSubtitle.textContent = hasFreeSample ? "Primera clase muestra sin costo al registrarte por WhatsApp." : "Sin costo de inscripción previa. Consulta horarios y disponibilidad.";
  }

  const p1SampleBadge = document.getElementById("pricing-p1-sample-badge");
  if (p1SampleBadge) {
    p1SampleBadge.textContent = hasFreeSample ? "¡Clase muestra sin compromiso!" : "¡Prueba una clase sin compromiso!";
  }

  // 2. Hero Principal
  const heroBadge = document.getElementById("hero-badge-text");
  if (heroBadge) heroBadge.textContent = cfg.heroBadge;

  const heroTitle = document.getElementById("hero-title-text");
  if (heroTitle) {
    const l1 = (cfg.heroTitleLine1 && !cfg.heroTitleLine1.includes("Siente el fuego")) ? cfg.heroTitleLine1 : "Aprende a Bailar";
    const l2 = (cfg.heroTitleLine2 && !cfg.heroTitleLine2.includes("las Pirámides")) ? cfg.heroTitleLine2 : "Salsa & Cumbia";
    heroTitle.innerHTML = `${l1} <span class="gold-gradient-text">${l2}</span>`;
  }

  const heroSubtitle = document.getElementById("hero-subtitle-text");
  if (heroSubtitle) heroSubtitle.textContent = cfg.heroSubtitle;

  const heroCtaBtn = document.getElementById("hero-cta-btn");
  if (heroCtaBtn) {
    const spanText = heroCtaBtn.querySelector("span:not(.icon)");
    if (spanText) spanText.textContent = cfg.heroCtaText;
  }

  const heroSecBtn = document.getElementById("hero-secondary-cta-btn");
  if (heroSecBtn) {
    const spanText = heroSecBtn.querySelector("span:not(.icon)");
    if (spanText) spanText.textContent = cfg.heroSecondaryCtaText;
    else heroSecBtn.textContent = cfg.heroSecondaryCtaText;
  }

  // Estadísticas Hero
  const statStudents = document.getElementById("hero-stat-students");
  if (statStudents) statStudents.textContent = cfg.heroStatStudents;
  const statStudentsLabel = document.getElementById("hero-stat-students-label");
  if (statStudentsLabel) statStudentsLabel.textContent = cfg.heroStatStudentsLabel;

  const statYears = document.getElementById("hero-stat-years");
  if (statYears) statYears.textContent = cfg.heroStatYears;
  const statYearsLabel = document.getElementById("hero-stat-years-label");
  if (statYearsLabel) statYearsLabel.textContent = cfg.heroStatYearsLabel;

  const statStyles = document.getElementById("hero-stat-styles");
  if (statStyles) statStyles.textContent = cfg.heroStatStyles;
  const statStylesLabel = document.getElementById("hero-stat-styles-label");
  if (statStylesLabel) statStylesLabel.textContent = cfg.heroStatStylesLabel;

  // 3. Insignia / Badge de Horarios
  const schedBadgeContainer = document.getElementById("schedule-badge-container");
  const schedBadgeText = document.getElementById("schedule-badge-text");
  if (schedBadgeContainer) {
    if (cfg.scheduleBadge && cfg.scheduleBadge.trim()) {
      schedBadgeContainer.classList.remove("hidden");
      if (schedBadgeText) schedBadgeText.textContent = cfg.scheduleBadge;
    } else {
      schedBadgeContainer.classList.add("hidden");
    }
  }

  // 4. WhatsApp Links dinámicos (Chat Directo o Grupo de Informes)
  const isGroup = (cfg.whatsappType === "group" && cfg.whatsappGroupUrl && cfg.whatsappGroupUrl.trim().length > 0);
  let waUrl;
  if (isGroup) {
    let groupUrl = cfg.whatsappGroupUrl.trim();
    if (!/^https?:\/\//i.test(groupUrl)) {
      groupUrl = "https://" + groupUrl;
    }
    waUrl = groupUrl;
  } else {
    const cleanPhone = (cfg.whatsappNumber || "525512345678").replace(/[^0-9]/g, "");
    const encodedMsg = encodeURIComponent(cfg.whatsappMessage || "¡Hola! Me gustaría pedir informes de clases.");
    waUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
  }

  // Actualizar todos los enlaces con clase dynamic-wa-link
  document.querySelectorAll(".dynamic-wa-link").forEach(link => {
    link.href = waUrl;
    if (isGroup) {
      link.setAttribute("title", "Unirme al Grupo de Informes de WhatsApp");
    }
  });

  const floatingWaBtn = document.getElementById("floating-wa-btn");
  if (floatingWaBtn) {
    floatingWaBtn.href = waUrl;
    if (isGroup) {
      floatingWaBtn.setAttribute("aria-label", "Unirme al Grupo de WhatsApp");
      floatingWaBtn.setAttribute("title", "Unirme al Grupo de Informes en WhatsApp");
    }
  }

  const floatingWaTooltip = document.getElementById("floating-wa-tooltip");
  if (floatingWaTooltip) {
    floatingWaTooltip.textContent = isGroup ? "¡Únete al Grupo de WhatsApp!" : "¡Escríbenos por WhatsApp!";
  }

  const heroCtaText = document.getElementById("hero-cta-text");
  if (heroCtaText) {
    heroCtaText.textContent = isGroup ? "Grupo de Informes WhatsApp" : "WhatsApp Oficial";
  }

  const waDisplayEl = document.getElementById("contact-whatsapp-display");
  if (waDisplayEl) waDisplayEl.textContent = cfg.whatsappDisplay;

  // 5. Redes Sociales Dinámicas (Mostrar si están configuradas, ocultar si están vacías)
  const syncSocialLink = (selector, url) => {
    const isDefined = (typeof url === "string" && url.trim().length > 0 && url.trim() !== "https://" && url.trim() !== "http://");
    document.querySelectorAll(selector).forEach(el => {
      if (isDefined) {
        el.href = url.trim();
        el.classList.remove("hidden");
        el.style.display = "";
      } else {
        el.classList.add("hidden");
        el.style.display = "none";
      }
    });
    return isDefined;
  };

  const hasFb = syncSocialLink(".dynamic-social-facebook", cfg.facebookUrl);
  const hasIg = syncSocialLink(".dynamic-social-instagram", cfg.instagramUrl);
  const hasTt = syncSocialLink(".dynamic-social-tiktok", cfg.tiktokUrl);
  const hasYt = syncSocialLink(".dynamic-social-youtube", cfg.youtubeUrl);

  const heroSocialBar = document.getElementById("hero-social-bar");
  if (heroSocialBar) {
    heroSocialBar.style.display = (hasFb || hasIg || hasTt || hasYt) ? "flex" : "none";
  }

  // 6. Contacto, Sede y Dirección
  const addressEl = document.getElementById("contact-address-full");
  const addressRow = document.getElementById("venue-address-row");
  const addressText = (cfg.addressFull || "").trim();
  const hasAddress = Boolean(addressText.length > 0);
  if (addressEl) {
    addressEl.textContent = addressText;
  }
  if (addressRow) {
    if (hasAddress) {
      addressRow.classList.remove("hidden");
      addressRow.style.display = "";
    } else {
      addressRow.classList.add("hidden");
      addressRow.style.display = "none";
    }
  }

  const mapsBtn = document.getElementById("contact-maps-link");
  const mapsUrl = (cfg.mapsUrl || "").trim();
  const hasMaps = Boolean(mapsUrl.length > 0 && mapsUrl !== "https://" && mapsUrl !== "http://");
  if (mapsBtn) {
    if (hasMaps) {
      mapsBtn.href = mapsUrl;
      mapsBtn.classList.remove("hidden");
      mapsBtn.style.display = "";
    } else {
      mapsBtn.classList.add("hidden");
      mapsBtn.style.display = "none";
    }
  }

  const venueHeaderTitle = document.getElementById("venue-header-title");
  if (venueHeaderTitle && cfg.venueName) {
    venueHeaderTitle.textContent = cfg.venueName;
  }

  const venueNameTitle = document.getElementById("venue-name-title");
  if (venueNameTitle && cfg.venueName) {
    venueNameTitle.textContent = cfg.venueName;
  }

  const venueQuoteText = document.getElementById("venue-quote-text");
  if (venueQuoteText && cfg.venueQuote) {
    venueQuoteText.textContent = `"${cfg.venueQuote}"`;
  }

  const schedVenueName = document.getElementById("schedule-venue-name");
  if (schedVenueName && cfg.venueName) {
    schedVenueName.textContent = `Sede de Impartición: ${cfg.venueName}`;
  }

  const schedVenueDesc = document.getElementById("schedule-venue-desc");
  if (schedVenueDesc && cfg.addressFull) {
    schedVenueDesc.textContent = `${cfg.addressFull} • Salón con duela y espejos profesionales`;
  }

  // 7. Logotipo Activo (Por defecto: Opción 4: Sol Oro)
  const activeLogo = LOGO_VARIANTS_MAP[cfg.activeLogoKey || "opcion4"] || LOGO_VARIANTS_MAP["opcion4"];
  const navLogo = document.getElementById("nav-logo");
  const heroLogo = document.getElementById("hero-logo");
  const footerLogo = document.getElementById("footer-logo");
  const heroLabel = document.getElementById("hero-logo-label");

  if (navLogo && activeLogo) navLogo.src = activeLogo.img;
  if (heroLogo && activeLogo) heroLogo.src = activeLogo.img;
  if (footerLogo && activeLogo) footerLogo.src = activeLogo.img;
  if (heroLabel && activeLogo) heroLabel.textContent = activeLogo.label;

  // 8. Precios & Planes (Habilitar / Deshabilitar sección completa y actualizar contenido)
  const pricingSection = document.getElementById("promociones") || document.getElementById("planes");
  const isPricingEnabled = (cfg.pricingSectionEnabled !== false);

  if (pricingSection) {
    if (isPricingEnabled) {
      pricingSection.classList.remove("hidden");
      pricingSection.style.display = "";
    } else {
      pricingSection.classList.add("hidden");
      pricingSection.style.display = "none";
    }
  }

  // Ocultar / mostrar enlaces del menú de navegación a planes
  document.querySelectorAll(".nav-link-planes").forEach(link => {
    if (isPricingEnabled) {
      link.classList.remove("hidden");
      link.style.display = "";
    } else {
      link.classList.add("hidden");
      link.style.display = "none";
    }
  });

  const pricingSubEl = document.getElementById("pricing-section-subtitle");
  if (pricingSubEl && cfg.pricingSubtitle) {
    pricingSubEl.textContent = cfg.pricingSubtitle;
  }

  // Plan 1
  if (cfg.plan1) {
    const p1Name = document.getElementById("pricing-p1-name");
    if (p1Name && cfg.plan1.name) p1Name.textContent = cfg.plan1.name;
    const p1Price = document.getElementById("pricing-p1-price");
    if (p1Price && cfg.plan1.price) p1Price.textContent = cfg.plan1.price;
    const p1Period = document.getElementById("pricing-p1-period");
    if (p1Period && cfg.plan1.period) p1Period.textContent = cfg.plan1.period;
    const p1Desc = document.getElementById("pricing-p1-desc");
    if (p1Desc && cfg.plan1.desc) p1Desc.textContent = cfg.plan1.desc;
    const p1Btn = document.getElementById("pricing-p1-btn");
    if (p1Btn && cfg.plan1.name) {
      p1Btn.setAttribute("onclick", `openBookingModal('${cfg.plan1.name.replace(/'/g, "\\'")}')`);
    }
  }

  // Plan 2
  if (cfg.plan2) {
    const p2Badge = document.getElementById("pricing-p2-badge");
    if (p2Badge && cfg.plan2.badge) p2Badge.textContent = cfg.plan2.badge;
    const p2Name = document.getElementById("pricing-p2-name");
    if (p2Name && cfg.plan2.name) p2Name.textContent = cfg.plan2.name;
    const p2Price = document.getElementById("pricing-p2-price");
    if (p2Price && cfg.plan2.price) p2Price.textContent = cfg.plan2.price;
    const p2Period = document.getElementById("pricing-p2-period");
    if (p2Period && cfg.plan2.period) p2Period.textContent = cfg.plan2.period;
    const p2Desc = document.getElementById("pricing-p2-desc");
    if (p2Desc && cfg.plan2.desc) p2Desc.textContent = cfg.plan2.desc;
    const p2Btn = document.getElementById("pricing-p2-btn");
    if (p2Btn && cfg.plan2.name) {
      p2Btn.setAttribute("onclick", `openBookingModal('${cfg.plan2.name.replace(/'/g, "\\'")}')`);
    }
  }

  // Plan 3
  if (cfg.plan3) {
    const p3Badge = document.getElementById("pricing-p3-badge");
    if (p3Badge && cfg.plan3.badge) p3Badge.textContent = cfg.plan3.badge;
    const p3Name = document.getElementById("pricing-p3-name");
    if (p3Name && cfg.plan3.name) p3Name.textContent = cfg.plan3.name;
    const p3Price = document.getElementById("pricing-p3-price");
    if (p3Price && cfg.plan3.price) p3Price.textContent = cfg.plan3.price;
    const p3Period = document.getElementById("pricing-p3-period");
    if (p3Period && cfg.plan3.period) p3Period.textContent = cfg.plan3.period;
    const p3Desc = document.getElementById("pricing-p3-desc");
    if (p3Desc && cfg.plan3.desc) p3Desc.textContent = cfg.plan3.desc;
    const p3Btn = document.getElementById("pricing-p3-btn");
    if (p3Btn && cfg.plan3.name) {
      p3Btn.setAttribute("onclick", `openBookingModal('${cfg.plan3.name.replace(/'/g, "\\'")}')`);
    }
  }

  // 9. Teléfono de la Sede y Botón Llamar a la Escuela (Instalaciones Oficiales)
  const venueCallBtn = document.getElementById("venue-call-btn");
  const venueCallBtnText = document.getElementById("venue-call-btn-text");
  const venuePhoneRow = document.getElementById("venue-phone-row");
  const venuePhoneDisplay = document.getElementById("venue-phone-display");

  const rawPhone = (typeof cfg.callBtnPhone === "string" ? cfg.callBtnPhone : "").trim();
  const isPhoneConfigured = Boolean(rawPhone.length > 0 && cfg.callBtnEnabled !== false);

  if (isPhoneConfigured) {
    const cleanPhone = rawPhone.replace(/[^0-9+]/g, "");
    if (venueCallBtn) {
      venueCallBtn.href = `tel:${cleanPhone}`;
      venueCallBtn.classList.remove("hidden");
      venueCallBtn.style.display = "";
      if (venueCallBtnText) {
        venueCallBtnText.textContent = cfg.callBtnText || "📞 Llamar a la Escuela";
      }
    }
    if (venuePhoneRow) {
      venuePhoneRow.classList.remove("hidden");
      venuePhoneRow.style.display = "";
    }
    if (venuePhoneDisplay) {
      venuePhoneDisplay.href = `tel:${cleanPhone}`;
      venuePhoneDisplay.textContent = rawPhone;
    }
  } else {
    // Si no está definido el campo o está desactivado: NO ESTÁ ACTIVO (oculto en web y móvil)
    if (venueCallBtn) {
      venueCallBtn.classList.add("hidden");
      venueCallBtn.style.display = "none";
    }
    if (venuePhoneRow) {
      venuePhoneRow.classList.add("hidden");
      venuePhoneRow.style.display = "none";
    }
  }

  // 10. Pie de página
  const footerYear = document.getElementById("footer-copyright-year");
  if (footerYear) footerYear.textContent = cfg.copyrightYear;

  const footerVenue = document.getElementById("footer-venue-quote");
  if (footerVenue) {
    footerVenue.textContent = `Sede: ${cfg.venueName} • "${cfg.venueQuote}"`;
  }

  // 11. Galería de Videos de Redes Sociales
  renderSocialVideos(cfg);
}

/**
 * Parsea y detecta la plataforma de video (Instagram, Facebook, YouTube, TikTok o MP4)
 * Soporta URLs directas o código completo <iframe> pegado por el usuario
 */
function parseVideoEmbedInfo(input, forcedType = "auto") {
  if (!input || !input.trim() || input.includes("example")) return null;
  let raw = input.trim();

  // 0. Si el usuario pegó un iframe completo, extraer el atributo src
  const iframeSrcMatch = raw.match(/<iframe[^>]*src=["']([^"']+)["'][^>]*>/i);
  let effectiveUrl = iframeSrcMatch ? iframeSrcMatch[1] : raw;

  // Determinar la plataforma: forzada o auto-detectada
  let platform = (forcedType && forcedType !== "auto") ? forcedType : "auto";
  if (platform === "auto") {
    if (/instagram\.com/i.test(effectiveUrl)) platform = "instagram";
    else if (/facebook\.com|fb\.watch/i.test(effectiveUrl)) platform = "facebook";
    else if (/youtube\.com|youtu\.be/i.test(effectiveUrl)) platform = "youtube";
    else if (/tiktok\.com/i.test(effectiveUrl)) platform = "tiktok";
    else if (/\.(mp4|webm|mov)(\?.*)?$/i.test(effectiveUrl)) platform = "direct";
    else platform = "web";
  }

  // 1. INSTAGRAM (Reels y Posts)
  if (platform === "instagram") {
    const igMatch = effectiveUrl.match(/instagram\.com\/(?:reel|p|tv)\/([a-zA-Z0-9_-]+)/i);
    const code = igMatch ? igMatch[1] : "";
    const cleanWatch = code ? `https://www.instagram.com/reel/${code}/` : effectiveUrl;
    const embedSrc = code ? `https://www.instagram.com/reel/${code}/embed/` : (iframeSrcMatch ? effectiveUrl : `${cleanWatch.replace(/\/$/, '')}/embed/`);

    return {
      platform: "instagram",
      platformName: "Instagram Reel",
      icon: "📸",
      badgeClass: "bg-pink-500/20 text-pink-300 border-pink-500/30",
      btnClass: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-95",
      btnText: "Ver Reel en Instagram ↗",
      watchUrl: cleanWatch,
      iframeSrc: embedSrc
    };
  }

  // 2. FACEBOOK (Videos y Reels)
  if (platform === "facebook") {
    let cleanWatch = effectiveUrl;
    // Si viene de un plugin de facebook con href=...
    const hrefMatch = effectiveUrl.match(/[?&]href=([^&]+)/i);
    if (hrefMatch) {
      try {
        cleanWatch = decodeURIComponent(hrefMatch[1]);
      } catch (e) {
        cleanWatch = hrefMatch[1];
      }
    }

    let embedSrc = effectiveUrl;
    if (!effectiveUrl.includes("plugins/video.php")) {
      embedSrc = `https://www.facebook.com/plugins/video.php?height=476&href=${encodeURIComponent(cleanWatch)}&show_text=false&width=267&t=0`;
    }

    return {
      platform: "facebook",
      platformName: "Facebook Video",
      icon: "📘",
      badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      btnClass: "bg-[#1877F2] hover:bg-[#166fe5] text-white",
      btnText: "Ver en Facebook ↗",
      watchUrl: cleanWatch,
      iframeSrc: embedSrc
    };
  }

  // 3. YOUTUBE (Videos y Shorts)
  if (platform === "youtube") {
    const ytMatch = effectiveUrl.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
    const videoId = ytMatch ? ytMatch[1] : "";
    return {
      platform: "youtube",
      platformName: "YouTube",
      icon: "▶️",
      badgeClass: "bg-red-500/20 text-red-300 border-red-500/30",
      btnClass: "bg-red-600 hover:bg-red-500 text-white",
      btnText: "Ver en YouTube ↗",
      watchUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : effectiveUrl,
      iframeSrc: videoId ? `https://www.youtube.com/embed/${videoId}` : effectiveUrl
    };
  }

  // 4. TIKTOK
  if (platform === "tiktok") {
    const ttMatch = effectiveUrl.match(/tiktok\.com\/.*\/video\/([0-9]+)/i);
    const ttId = ttMatch ? ttMatch[1] : "";
    return {
      platform: "tiktok",
      platformName: "TikTok",
      icon: "🎵",
      badgeClass: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      btnClass: "bg-slate-900 border border-cyan-400 text-cyan-300 hover:bg-slate-800",
      btnText: "Ver en TikTok ↗",
      watchUrl: effectiveUrl,
      iframeSrc: ttId ? `https://www.tiktok.com/embed/v2/${ttId}` : effectiveUrl
    };
  }

  // 5. ARCHIVO DIRECTO MP4 / WebM
  if (platform === "direct" || /\.(mp4|webm|mov)(\?.*)?$/i.test(effectiveUrl)) {
    return {
      platform: "direct",
      platformName: "Video en Vivo",
      icon: "🎥",
      badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/30",
      btnClass: "btn-gold text-xs",
      btnText: "Ver Video Completo ↗",
      watchUrl: effectiveUrl,
      isVideoFile: true,
      videoSrc: effectiveUrl
    };
  }

  // Fallback
  return {
    platform: "web",
    platformName: "Video Social",
    icon: "🎬",
    badgeClass: "bg-slate-800 text-slate-300 border-slate-700",
    btnClass: "btn-gold text-xs",
    btnText: "Ver Video ↗",
    watchUrl: effectiveUrl,
    iframeSrc: effectiveUrl
  };
}

/**
 * Renderiza la sección de videos de redes sociales y actualiza su visibilidad
 */
function renderSocialVideos(cfg) {
  const videoSection = document.getElementById("videos");
  const isVideoEnabled = (cfg.videoSectionEnabled !== false);

  if (videoSection) {
    if (isVideoEnabled) {
      videoSection.classList.remove("hidden");
      videoSection.style.display = "";
    } else {
      videoSection.classList.add("hidden");
      videoSection.style.display = "none";
    }
  }

  // Ocultar o mostrar links en el menú de navegación
  document.querySelectorAll(".nav-link-videos").forEach(el => {
    if (isVideoEnabled) {
      el.classList.remove("hidden");
      el.style.display = "";
    } else {
      el.classList.add("hidden");
      el.style.display = "none";
    }
  });

  if (!isVideoEnabled) return;

  // Actualizar textos del encabezado
  const badgeEl = document.getElementById("videos-badge-text");
  if (badgeEl && cfg.videoSectionBadge) badgeEl.textContent = cfg.videoSectionBadge;

  const titleEl = document.getElementById("videos-title-text");
  if (titleEl && cfg.videoSectionTitle) titleEl.textContent = cfg.videoSectionTitle;

  const subtitleEl = document.getElementById("videos-subtitle-text");
  if (subtitleEl && cfg.videoSectionSubtitle) subtitleEl.textContent = cfg.videoSectionSubtitle;

  const container = document.getElementById("videos-grid-container");
  if (!container) return;

  const rawVideos = [
    { enabled: cfg.video1Enabled !== false, type: cfg.video1Type || "instagram", title: cfg.video1Title || "Salsa Cubana", desc: cfg.video1Desc || "", url: cfg.video1Url || "" },
    { enabled: cfg.video2Enabled !== false, type: cfg.video2Type || "instagram", title: cfg.video2Title || "Cumbia y Ritmo", desc: cfg.video2Desc || "", url: cfg.video2Url || "" },
    { enabled: cfg.video3Enabled !== false, type: cfg.video3Type || "facebook", title: cfg.video3Title || "Ambiente Social", desc: cfg.video3Desc || "", url: cfg.video3Url || "" },
    { enabled: Boolean(cfg.video4Enabled), type: cfg.video4Type || "instagram", title: cfg.video4Title || "Coreografía", desc: cfg.video4Desc || "", url: cfg.video4Url || "" },
  ].filter(v => v.enabled);

  if (rawVideos.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-8 text-center glass-panel rounded-3xl border border-slate-800 text-slate-400 text-sm">
        <span class="text-3xl block mb-2">🎬</span>
        <p class="font-bold text-white mb-1">Próximamente videos de nuestras clases</p>
        <p class="text-xs text-slate-400">Activa los videos desde el Panel de Administración para ver las clases en acción.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = rawVideos.map((item, idx) => {
    const info = parseVideoEmbedInfo(item.url, item.type);
    if (!info) {
      // Tarjeta de previsualización / muestra estilizada si aún no hay enlace
      return `
        <div class="glass-panel p-6 rounded-3xl border border-amber-500/20 flex flex-col justify-between hover:border-amber-400/40 transition-all group">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
                <span>🎬</span> Ritmo Salsero
              </span>
              <span class="text-xs text-slate-400">En Vivo</span>
            </div>
            <div class="relative w-full rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/40 border border-slate-800 p-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-[300px]">
              <div class="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 text-2xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-400/10">
                ▶
              </div>
              <h3 class="font-serif-title font-bold text-lg text-white mb-2">${item.title}</h3>
              <p class="text-xs text-slate-300 max-w-xs leading-relaxed">${item.desc || "Video de nuestras clases en Casa de Cultura Neteotiloyan."}</p>
            </div>
          </div>
          <a href="${cfg.instagramUrl || cfg.facebookUrl || '#'}" target="_blank" rel="noopener noreferrer" class="mt-4 w-full py-2.5 rounded-xl btn-outline-gold text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
            <span>Ver Reels en Redes</span> ↗
          </a>
        </div>
      `;
    }

    // Tarjeta con reproductor embebido activo
    return `
      <div class="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-xl">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[11px] font-bold px-2.5 py-1 rounded-full border ${info.badgeClass} flex items-center gap-1.5 shadow-sm">
              <span>${info.icon}</span> ${info.platformName}
            </span>
            <span class="text-[10px] uppercase font-bold tracking-wider text-amber-400/80">Clase en Vivo</span>
          </div>
          <h3 class="font-serif-title font-bold text-base text-white mb-1">${item.title}</h3>
          ${item.desc ? `<p class="text-xs text-slate-400 mb-3 line-clamp-2">${item.desc}</p>` : ''}
          <div class="relative w-full rounded-2xl overflow-hidden bg-slate-950/90 border border-slate-800 flex items-center justify-center mx-auto shadow-inner" style="min-height: 480px; max-height: 520px; height: 500px;">
            ${info.isVideoFile ? `
              <video src="${info.videoSrc}" controls playsinline preload="metadata" class="w-full h-full object-cover"></video>
            ` : `
              <iframe src="${info.iframeSrc}" class="w-full h-full border-0" frameborder="0" scrolling="no" allowtransparency="true" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" loading="lazy"></iframe>
            `}
          </div>
        </div>
        ${info.watchUrl ? `
          <a href="${info.watchUrl}" target="_blank" rel="noopener noreferrer" class="mt-4 w-full py-2.5 rounded-xl ${info.btnClass} text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]">
            <span>${info.btnText}</span>
          </a>
        ` : ''}
      </div>
    `;
  }).join("");
}

// Sincronización remota para celulares y visitantes en internet (Netlify)
async function syncRemoteSiteConfig() {
  if (typeof window !== "undefined" && window.location.pathname.endsWith("admin.html")) {
    return;
  }
  try {
    if (typeof fetch === "function") {
      const resp = await fetch("./assets/site_config.json?v=" + Date.now());
      if (resp.ok) {
        const remote = await resp.json();
        const localRaw = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
        let shouldApply = false;
        if (!localRaw) {
          // Si no hay configuración previa en este dispositivo (móviles o visitantes remotos)
          shouldApply = true;
        } else {
          try {
            const local = JSON.parse(localRaw);
            // Solo sobreescribir la configuración local si el archivo remoto en el servidor tiene una fecha estrictamente posterior a la edición local
            if (remote && remote._updatedAt && local && local._updatedAt && Number(remote._updatedAt) > Number(local._updatedAt)) {
              shouldApply = true;
            }
          } catch(e) {
            shouldApply = true;
          }
        }
        if (shouldApply) {
          const merged = Object.assign({}, DEFAULT_SITE_CONFIG, remote);
          window.SITE_CONFIG = merged;
          applySiteConfigToDOM(merged);
        }
      }
    }
  } catch (e) {
    // En file:// o sin red, opera con la configuración local
  }
}

// Sincronización en tiempo real entre pestañas (admin.html e index.html)
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === SITE_CONFIG_STORAGE_KEY && e.newValue) {
      try {
        const updated = JSON.parse(e.newValue);
        window.SITE_CONFIG = updated;
        applySiteConfigToDOM(updated);
      } catch (err) {}
    }
  });
}

// Sincronización en tiempo real desde Firebase Firestore (Nube)
function initCloudSiteConfigSync() {
  if (typeof window === "undefined" || !window.RitmoFirebase) return;
  if (!window.RitmoFirebase.isConfigured()) return;

  window.RitmoFirebase.listenSiteConfig(function (cloudData) {
    if (cloudData && typeof cloudData === "object") {
      var localRaw = localStorage.getItem(SITE_CONFIG_STORAGE_KEY);
      var shouldApply = true;
      if (localRaw) {
        try {
          var local = JSON.parse(localRaw);
          if (local._updatedAt && cloudData._updatedAt && Number(local._updatedAt) > Number(cloudData._updatedAt)) {
            shouldApply = false;
          }
        } catch(e) {}
      }
      if (shouldApply) {
        var merged = Object.assign({}, DEFAULT_SITE_CONFIG, cloudData);
        try {
          localStorage.setItem(SITE_CONFIG_STORAGE_KEY, JSON.stringify(merged));
        } catch (e) {}
        window.SITE_CONFIG = merged;
        applySiteConfigToDOM(merged);
      }
    }
  });
}

// Inicializar en DOMContentLoaded
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    applySiteConfigToDOM();
    syncRemoteSiteConfig();
    initCloudSiteConfigSync();
  });
}
