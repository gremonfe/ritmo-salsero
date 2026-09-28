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
  callBtnEnabled: false
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

  // 4. WhatsApp Links dinámicos
  const cleanPhone = (cfg.whatsappNumber || "525512345678").replace(/[^0-9]/g, "");
  const encodedMsg = encodeURIComponent(cfg.whatsappMessage || "¡Hola! Me gustaría pedir informes de clases.");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMsg}`;

  // Actualizar todos los enlaces con clase wa-link
  document.querySelectorAll(".dynamic-wa-link").forEach(link => {
    link.href = waUrl;
  });

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

// Inicializar en DOMContentLoaded
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    applySiteConfigToDOM();
    syncRemoteSiteConfig();
  });
}
