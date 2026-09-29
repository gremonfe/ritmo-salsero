/**
 * RITMO SALSERO - GESTOR DINÁMICO Y PANEL DE EDICIÓN DE HORARIOS
 * Permite editar fácilmente textos, horarios, disciplinas, niveles y estilos,
 * con persistencia en localStorage y actualización en tiempo real en la web.
 */

const DEFAULT_SCHEDULE_CONFIG = {
  showDetailsLegend: true,
  slots: [
    { id: "slot-1", time: "7:00 PM a 8:00 PM", label: "7:00 PM", sublabel: "a 8:00 PM", duration: "60 minutos" },
    { id: "slot-2", time: "8:00 PM a 9:00 PM", label: "8:00 PM", sublabel: "a 9:00 PM", duration: "60 minutos" }
  ],
  days: {
    1: {
      name: "Lunes",
      key: "lunes",
      hasClasses: true,
      classes: [
        {
          slotIndex: 0,
          title: "Salsa Cubana",
          level: "Nivel Intermedio",
          badge: "Nivel Intermedio",
          focus: "Rueda de Casino y Vueltas",
          desc: "Figuras complejas, nudos cubanos y dinamismo en pareja.",
          points: [
            "Figuras complejas y nudos cubanos",
            "Conducción dinámica y fluidez",
            "Coordinación en rueda de casino"
          ],
          type: "salsa-cubana-intermedio",
          icon: "⚡",
          theme: "blue"
        },
        {
          slotIndex: 1,
          title: "Cumbia",
          level: "Todos los Niveles",
          badge: "Todos los Niveles",
          focus: "Cadencia y Vueltas",
          desc: "Cumbia tradicional, moderna y sonidera para bailar en cualquier fiesta.",
          points: [
            "Cumbia tradicional, moderna y texana",
            "Cadencia, vueltas continuas y cambios",
            "Práctica para bailar en eventos sociales"
          ],
          type: "cumbia-todos",
          icon: "🥁",
          theme: "amber"
        }
      ]
    },
    2: {
      name: "Martes",
      key: "martes",
      hasClasses: true,
      classes: [
        {
          slotIndex: 0,
          title: "Salsa Cubana",
          level: "Nivel Básico",
          badge: "¡Desde Cero!",
          focus: "Pasos Básicos y Guapea",
          desc: "Paso básico cubano (Guapea), dile que no y fundamentos de la rueda.",
          points: [
            "Paso básico cubano (Guapea)",
            "Dile que no, Enchufa y giros base",
            "Conexión con la música y tiempo"
          ],
          type: "salsa-cubana-basico",
          icon: "🌱",
          theme: "emerald"
        },
        {
          slotIndex: 1,
          title: "Salsa en Línea",
          level: "Nivel Principiante",
          badge: "Principiante",
          focus: "Cross Body Lead y Postura",
          desc: "Técnica On 1, giros básicos, postura y elegancia.",
          points: [
            "Cross Body Lead y giros básicos",
            "Postura, técnica de brazos y eje",
            "Conexión y fluidez de pista"
          ],
          type: "salsa-linea-principiante",
          icon: "🔥",
          theme: "rose"
        }
      ]
    },
    3: {
      name: "Miércoles",
      key: "miercoles",
      hasClasses: false,
      restTitle: "Sin Clases",
      restSubtitle: "Día de descanso semanal",
      restDesc: "No hay clases formales programadas los miércoles. Recarga energías para jueves y viernes.",
      classes: []
    },
    4: {
      name: "Jueves",
      key: "jueves",
      hasClasses: true,
      classes: [
        {
          slotIndex: 0,
          title: "Salsa Cubana",
          level: "Nivel Intermedio",
          badge: "Nivel Intermedio",
          focus: "Rueda de Casino y Vueltas",
          desc: "Figuras dinámicas, cambios de frente y musicalidad cubana.",
          points: [
            "Figuras dinámicas, cruces y técnica",
            "Coordinación de rueda de casino",
            "Musicalidad y timba cubana"
          ],
          type: "salsa-cubana-intermedio",
          icon: "⚡",
          theme: "blue"
        },
        {
          slotIndex: 1,
          title: "Salsa en Línea",
          level: "Nivel Principiante",
          badge: "Principiante",
          focus: "Figuras Básicas y Estilo",
          desc: "Transiciones en línea, giros dobles básicos y fluidez en pareja.",
          points: [
            "Figuras en línea y giros dobles básicos",
            "Técnica para bailar con seguridad",
            "Transiciones suaves en pareja"
          ],
          type: "salsa-linea-principiante",
          icon: "🔥",
          theme: "rose"
        }
      ]
    },
    5: {
      name: "Viernes",
      key: "viernes",
      hasClasses: true,
      classes: [
        {
          slotIndex: 0,
          title: "Salsa Cubana",
          level: "Nivel Básico",
          badge: "¡Desde Cero!",
          focus: "Técnica y Paso Básico",
          desc: "Consolidación de bases, ritmo cubano y coordinación.",
          points: [
            "Repaso intensivo de bases y ritmo",
            "Dile que no, enchufa y vueltas",
            "Cierre de semana aprendiendo y disfrutando"
          ],
          type: "salsa-cubana-basico",
          icon: "🌱",
          theme: "emerald"
        },
        {
          slotIndex: 1,
          title: "Cumbia",
          level: "Todos los Niveles",
          badge: "Todos los Niveles",
          focus: "Sabor de Fin de Semana",
          desc: "Social de baile, práctica guiada y el auténtico ambiente festivo.",
          points: [
            "Social de baile y práctica guiada",
            "Giros continuos y figuras de nudo",
            "¡El auténtico sabor de fin de semana!"
          ],
          type: "cumbia-todos",
          icon: "🥁",
          theme: "amber"
        }
      ]
    },
    6: {
      name: "Sábado",
      key: "sabado",
      hasClasses: false,
      restTitle: "Fin de Semana Social",
      restSubtitle: "Práctica y Baile Libre",
      restDesc: "Sábado dedicado a eventos sociales y descanso. Las clases presenciales se reanudan el Lunes a las 7:00 PM.",
      classes: []
    },
    0: {
      name: "Domingo",
      key: "domingo",
      hasClasses: false,
      restTitle: "Día de Descanso Familiar",
      restSubtitle: "Sin clases presenciales hoy",
      restDesc: "Hoy domingo descansamos. ¡Te esperamos mañana Lunes a las 7:00 PM con Salsa Cubana y a las 8:00 PM con Cumbia!",
      classes: []
    }
  }
};

const THEME_STYLES = {
  blue: {
    border: "border-blue-500/40",
    bg: "bg-gradient-to-br from-blue-950/60 to-slate-900/80",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    accentText: "text-blue-200",
    borderTop: "border-blue-500/20"
  },
  emerald: {
    border: "border-emerald-500/40",
    bg: "bg-gradient-to-br from-emerald-950/60 to-slate-900/80",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    accentText: "text-emerald-200",
    borderTop: "border-emerald-500/20"
  },
  amber: {
    border: "border-amber-500/40",
    bg: "bg-gradient-to-br from-amber-950/50 via-slate-900/80 to-slate-950",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    accentText: "text-amber-200",
    borderTop: "border-amber-500/20"
  },
  rose: {
    border: "border-rose-500/40",
    bg: "bg-gradient-to-br from-rose-950/60 to-slate-900/80",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    accentText: "text-rose-200",
    borderTop: "border-rose-500/20"
  },
  purple: {
    border: "border-purple-500/40",
    bg: "bg-gradient-to-br from-purple-950/60 to-slate-900/80",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    accentText: "text-purple-200",
    borderTop: "border-purple-500/20"
  },
  orange: {
    border: "border-orange-500/40",
    bg: "bg-gradient-to-br from-orange-950/60 to-slate-900/80",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    accentText: "text-orange-200",
    borderTop: "border-orange-500/20"
  },
  cyan: {
    border: "border-cyan-500/40",
    bg: "bg-gradient-to-br from-cyan-950/60 to-slate-900/80",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    accentText: "text-cyan-200",
    borderTop: "border-cyan-500/20"
  },
  slate: {
    border: "border-dashed border-slate-800",
    bg: "bg-slate-950/20",
    badgeBg: "bg-slate-800/40 text-slate-400 border-slate-700",
    accentText: "text-slate-400",
    borderTop: "border-slate-800"
  }
};

const SCHEDULE_COLOR_PALETTES = [
  { key: "blue", label: "Azul Zafiro", hex: "#3b82f6", desc: "Intermedio / Casino", badgeCls: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { key: "emerald", label: "Verde Esmeralda", hex: "#10b981", desc: "¡Desde Cero! / Básico", badgeCls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { key: "amber", label: "Ámbar Dorado", hex: "#f59e0b", desc: "Cumbia / Todos los Niveles", badgeCls: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { key: "rose", label: "Rosa Fuego", hex: "#f43f5e", desc: "Salsa en Línea / Dinámico", badgeCls: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  { key: "purple", label: "Púrpura Imperial", hex: "#a855f7", desc: "Avanzado / Especial", badgeCls: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { key: "orange", label: "Naranja Tropical", hex: "#f97316", desc: "Sabor Latino / Festival", badgeCls: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { key: "cyan", label: "Cian Eléctrico", hex: "#06b6d4", desc: "Moderno / Estilo", badgeCls: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" }
];

const SCHEDULE_POPULAR_ICONS = [
  "⚡", "🌱", "🥁", "🔥", "🇨🇺", "💃", "🕺", "⭐", "🎺", "🎶", "🎵", "🏆", "👑", "✨", "🌴", "🪘", "🎉", "👟"
];

const RAPIDOS_STORAGE_KEY = "ritmo_schedule_rapidos_presets";

const DEFAULT_RAPIDOS_PRESETS = [
  { id: "preset-cero", name: "🌱 ¡Desde Cero!", badge: "¡Desde Cero!", level: "Nivel Básico", focus: "Paso Básico y Guapea", theme: "emerald", icon: "🌱" },
  { id: "preset-basico", name: "🔰 Nivel Básico", badge: "Nivel Básico", level: "Nivel Básico", focus: "Fundamentos y Enchufe", theme: "emerald", icon: "🌱" },
  { id: "preset-principiante", name: "🔥 Principiante", badge: "Principiante", level: "Nivel Principiante", focus: "Cross Body Lead y Giros", theme: "rose", icon: "🔥" },
  { id: "preset-intermedio", name: "⚡ Nivel Intermedio", badge: "Nivel Intermedio", level: "Nivel Intermedio", focus: "Rueda de Casino y Vueltas", theme: "blue", icon: "⚡" },
  { id: "preset-avanzado", name: "⭐ Nivel Avanzado", badge: "Nivel Avanzado", level: "Nivel Avanzado", focus: "Velocidad, Shines y Estilo", theme: "purple", icon: "⭐" },
  { id: "preset-cumbia", name: "🥁 Cumbia y Sabor", badge: "Todos los Niveles", level: "Todos los Niveles", focus: "Cadencia y Vueltas Continuas", theme: "amber", icon: "🥁" },
  { id: "preset-casino", name: "🇨🇺 Rueda de Casino", badge: "Casino & Timba", level: "Nivel Intermedio", focus: "Nudos Cubanos y Sincronía", theme: "cyan", icon: "🇨🇺" },
  { id: "preset-pareja", name: "👫 Trabajo en Pareja", badge: "Social & Pareja", level: "Todos los Niveles", focus: "Conducción y Fluidez en Pista", theme: "orange", icon: "💃" }
];

function loadRapidosPresets() {
  try {
    const raw = localStorage.getItem(RAPIDOS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Error leyendo preajustes rápidos:", e);
  }
  return [...DEFAULT_RAPIDOS_PRESETS];
}

function saveRapidosPresets(presets) {
  try {
    localStorage.setItem(RAPIDOS_STORAGE_KEY, JSON.stringify(presets));
  } catch (e) {
    console.warn("Error guardando preajustes rápidos:", e);
  }
  refreshAllRapidosUI();
}

function resetRapidosPresetsToDefault() {
  if (confirm("¿Deseas restablecer los botones Rápidos a los valores sugeridos por defecto?")) {
    saveRapidosPresets([...DEFAULT_RAPIDOS_PRESETS]);
    showToastNotification("✨ Botones Rápidos restablecidos a valores originales.");
  }
}

function refreshAllRapidosUI() {
  const slots = currentSchedule?.slots || [{ id: "slot-0" }, { id: "slot-1" }];
  slots.forEach((_, idx) => {
    const bar = document.getElementById(`slot-${idx}-rapidos-chips-bar`);
    if (bar) bar.innerHTML = renderRapidosButtonsHtml(idx);
    const mgr = document.getElementById(`slot-${idx}-rapidos-manager`);
    if (mgr) mgr.innerHTML = renderRapidosManagerHtml(idx);
  });
}

const STORAGE_KEY = "ritmo_salsero_schedule_v2";

// Current Active State
let currentSchedule = loadScheduleData();
let activeEditorDay = 1;

/**
 * Carga la configuración desde localStorage o usa los valores por defecto
 */
function loadScheduleData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.showDetailsLegend === undefined) {
        parsed.showDetailsLegend = true;
      }
      return parsed;
    }
  } catch (e) {
    console.warn("No se pudo leer localStorage:", e);
  }
  const def = JSON.parse(JSON.stringify(DEFAULT_SCHEDULE_CONFIG));
  if (def.showDetailsLegend === undefined) def.showDetailsLegend = true;
  return def;
}

/**
 * Guarda en localStorage y re-renderiza la interfaz
 */
function saveScheduleData(data) {
  currentSchedule = data;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Error guardando en localStorage:", e);
  }
  renderAllScheduleComponents();

  // Sincronización automática con la Nube (Firebase Firestore)
  if (typeof window !== "undefined" && window.RitmoFirebase && window.RitmoFirebase.isConfigured()) {
    window.RitmoFirebase.saveScheduleToCloud(data);
  }

  showToastNotification("¡Horarios y textos actualizados con éxito! ✨");
}

/**
 * Restablece los horarios a la configuración inicial por defecto
 */
function resetScheduleToDefault() {
  if (confirm("¿Estás seguro de restablecer los horarios al diseño oficial por defecto?")) {
    saveScheduleData(JSON.parse(JSON.stringify(DEFAULT_SCHEDULE_CONFIG)));
    populateEditorFields(activeEditorDay);
  }
}

/**
 * Renderiza la tabla completa semanal (Parrilla)
 */
function renderScheduleTable() {
  const tbody = document.getElementById("schedule-table-body");
  if (!tbody) return;

  const slots = currentSchedule.slots || DEFAULT_SCHEDULE_CONFIG.slots;
  const days = currentSchedule.days || DEFAULT_SCHEDULE_CONFIG.days;

  let html = "";

  slots.forEach((slot, slotIndex) => {
    html += `
      <tr class="hover:bg-slate-900/40 transition-colors">
        <!-- Columna Hora (Fijada a la izquierda en scroll horizontal móvil) -->
        <td class="p-4 sm:p-5 align-middle sticky left-0 z-10 bg-[#081024] border-r border-amber-500/20 shadow-md">
          <div class="font-serif-title font-bold text-amber-300 text-sm sm:text-base">${slot.label}</div>
          <div class="text-[11px] text-slate-400 uppercase tracking-widest">${slot.sublabel}</div>
          <div class="mt-2 inline-flex items-center gap-1 text-[10px] text-amber-400/90 font-medium">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> ${slot.duration}
          </div>
        </td>
    `;

    // 5 Días (Lunes a Viernes)
    for (let dayNum = 1; dayNum <= 5; dayNum++) {
      const dayData = days[dayNum];

      if (!dayData || !dayData.hasClasses) {
        // Día sin clases (ej. Miércoles)
        html += `
          <td class="p-3 align-middle text-center bg-slate-950/20 schedule-cell" data-class="descanso">
            <div class="p-4 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs relative group">
              <span class="block text-lg mb-1">${dayData?.restIcon || "🌙"}</span>
              <span class="font-medium text-slate-400">${dayData?.restTitle || "Sin Clases"}</span>
              <span class="block text-[10px] text-slate-600 mt-1">${dayData?.restSubtitle || "Día de descanso"}</span>
            </div>
          </td>
        `;
      } else {
        // Clase programada
        const classItem = dayData.classes ? dayData.classes.find(c => c.slotIndex === slotIndex) : null;

        if (!classItem) {
          html += `
            <td class="p-3 align-middle text-center bg-slate-950/20 schedule-cell">
              <div class="p-4 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                <span>Sin clase en este bloque</span>
              </div>
            </td>
          `;
        } else {
          const theme = THEME_STYLES[classItem.theme] || THEME_STYLES.blue;

          html += `
            <td class="p-3 align-middle schedule-cell" data-class="${classItem.type}" data-title="${classItem.title}" data-level="${classItem.level}" data-badge="${classItem.badge || ''}">
              <div onclick="openClassDetailModalDynamic(${dayNum}, ${slotIndex})" class="class-card group p-3.5 rounded-xl border ${theme.border} ${theme.bg} text-left relative transition-all hover:scale-[1.02] cursor-pointer">
                
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${theme.badgeBg}">
                    ${classItem.badge || classItem.level}
                  </span>
                  <span class="text-sm">${classItem.icon || "💃"}</span>
                </div>

                <h3 class="font-serif-title font-bold text-white text-sm sm:text-base leading-tight">${classItem.title}</h3>
                <p class="text-xs ${theme.accentText} font-medium mt-0.5 line-clamp-1">${classItem.focus || classItem.level}</p>

                <div class="mt-2.5 pt-2 border-t ${theme.borderTop} flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-300 min-h-[24px]">
                  <span class="font-medium whitespace-nowrap">${dayData.name}</span>
                  <span class="text-amber-400 font-semibold group-hover:text-white transition-colors whitespace-nowrap">Más detalles →</span>
                </div>
              </div>
            </td>
          `;
        }
      }
    }

    html += `</tr>`;
  });

  tbody.innerHTML = html;
}

/**
 * Renderiza la vista por días (Móvil)
 */
function renderMobileDayCards(dayKey) {
  const container = document.getElementById("day-cards-container");
  if (!container) return;

  const dayMap = { 'lunes': 1, 'martes': 2, 'miercoles': 3, 'jueves': 4, 'viernes': 5 };
  const dayIndex = dayMap[dayKey] || 1;
  const dayData = currentSchedule.days[dayIndex];

  if (!dayData || !dayData.hasClasses || !dayData.classes || dayData.classes.length === 0) {
    container.innerHTML = `
      <div class="col-span-full glass-panel p-8 text-center rounded-2xl border border-dashed border-slate-700">
        <span class="text-4xl block mb-2">${dayData?.restIcon || "🌙"}</span>
        <h4 class="font-serif-title font-bold text-white text-lg">${dayData?.restTitle || "Día de Descanso y Ensayo Libre"}</h4>
        <p class="text-slate-400 text-xs sm:text-sm mt-1 max-w-md mx-auto">
          ${dayData?.restDesc || "No hay clases formales programadas hoy. Te invitamos a acompañarnos en la siguiente sesión."}
        </p>
      </div>
    `;
    return;
  }

  const slots = currentSchedule.slots || DEFAULT_SCHEDULE_CONFIG.slots;

  container.innerHTML = dayData.classes.map(c => {
    const slot = slots[c.slotIndex] || { time: "7:00 PM a 8:00 PM" };
    const theme = THEME_STYLES[c.theme] || THEME_STYLES.blue;

    return `
      <div class="mobile-class-card glass-panel p-6 rounded-2xl border ${theme.border} ${theme.bg} flex flex-col justify-between hover:border-amber-400 transition-all relative group" data-class="${c.type}" data-title="${c.title}" data-level="${c.level}" data-badge="${c.badge || ''}">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${theme.badgeBg}">
              ${c.badge || c.level}
            </span>
            <span class="text-2xl">${c.icon || "💃"}</span>
          </div>
          <h4 class="font-serif-title font-bold text-xl text-white">${c.title}</h4>
          <p class="text-amber-300 font-semibold text-xs mt-1">⏰ ${slot.time}</p>
          <p class="text-slate-300 text-xs sm:text-sm mt-3">
            ${c.focus ? `<strong>Enfoque:</strong> ${c.focus}. ` : ""}${c.desc || ""}
          </p>
          <div class="mt-3 space-y-1">
            ${(c.points || []).map(p => `<div class="text-xs text-slate-300 flex items-center gap-1.5"><span class="text-amber-400">•</span> <span>${p}</span></div>`).join('')}
          </div>
        </div>
        <div class="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
          <button onclick="openClassDetailModalDynamic(${dayIndex}, ${c.slotIndex})" class="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1.5">
            <span>Más detalles →</span>
          </button>
          <span class="text-xs text-slate-400">${dayData.name}</span>
        </div>
      </div>
    `;
  }).join('');

  if (typeof applyCurrentScheduleFilter === 'function') {
    applyCurrentScheduleFilter();
  }
}

/**
 * Actualiza el banner "Hoy en Ritmo Salsero" de manera exacta según el día de la semana
 */
function updateLiveTodayScheduleBanner() {
  const today = new Date().getDay(); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
  const dayData = currentSchedule.days[today];
  const dayNameEl = document.getElementById("live-day-name");
  const classesTextEl = document.getElementById("live-day-classes");
  const dayTagEl = document.getElementById("live-day-tag");
  const actionBtnEl = document.getElementById("live-today-action-btn");

  const dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const currentDayName = dayNames[today] || (dayData ? dayData.name : "Hoy");

  if (dayTagEl) {
    dayTagEl.innerText = `HOY ${currentDayName.toUpperCase()}`;
  }

  // Comprobar si hoy hay clases nocturnas programadas
  const hasClassesTonight = Boolean(dayData && dayData.hasClasses && dayData.classes && dayData.classes.length > 0);

  // Calcular el siguiente día con clases programadas
  function getNextClassDay(fromDayIndex) {
    for (let offset = 1; offset <= 7; offset++) {
      const nextIdx = (fromDayIndex + offset) % 7;
      const d = currentSchedule.days[nextIdx];
      if (d && d.hasClasses && d.classes && d.classes.length > 0) {
        return { index: nextIdx, name: dayNames[nextIdx] || d.name, data: d };
      }
    }
    return { index: 1, name: "Lunes", data: currentSchedule.days[1] };
  }

  const nextClass = getNextClassDay(today);

  if (dayNameEl) {
    if (today === 0) {
      dayNameEl.innerText = "Hoy Domingo: Descanso Semanal";
    } else if (today === 6) {
      dayNameEl.innerText = "Hoy Sábado: Fin de Semana de Baile Social";
    } else if (today === 3) {
      dayNameEl.innerText = "Hoy Miércoles: Día de Descanso y Ensayo";
    } else if (hasClassesTonight) {
      dayNameEl.innerText = `${currentDayName} en Casa de Cultura`;
    } else {
      dayNameEl.innerText = `Hoy ${currentDayName}: Sin clases programadas`;
    }
  }

  if (classesTextEl) {
    if (today === 0) {
      classesTextEl.innerText = `Hoy domingo no hay clases presenciales en Casa de Cultura. ¡Te esperamos el ${nextClass.name} a las 7:00 PM con Salsa y a las 8:00 PM con Cumbia!`;
    } else if (today === 6) {
      classesTextEl.innerText = `Sábado de práctica y convivencia social. Las clases presenciales se reanudan el ${nextClass.name} a las 7:00 PM en Casa de Cultura.`;
    } else if (today === 3) {
      classesTextEl.innerText = `Hoy es día de descanso semanal. ¡Te esperamos el ${nextClass.name} con clases a partir de las 7:00 PM!`;
    } else if (!hasClassesTonight) {
      classesTextEl.innerText = `Hoy no hay clases activas. Te esperamos el próximo ${nextClass.name} con todo el ritmo.`;
    } else {
      const slots = currentSchedule.slots || DEFAULT_SCHEDULE_CONFIG.slots;
      const classStrings = dayData.classes.map(c => {
        const timeLabel = slots[c.slotIndex] ? slots[c.slotIndex].label : "";
        return `${timeLabel} ${c.title} (${c.level})`;
      });
      classesTextEl.innerText = `Hoy: ${classStrings.join(" • ")}`;
    }
  }

  // Actualizar Botón de Asistencia
  if (actionBtnEl) {
    if (hasClassesTonight) {
      actionBtnEl.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Asistir Hoy</span>
      `;
      actionBtnEl.setAttribute("onclick", `openBookingModal('Hoy (${currentDayName})')`);
      actionBtnEl.title = `Apartar lugar para las clases de hoy ${currentDayName}`;
    } else {
      actionBtnEl.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span>Asistir el ${nextClass.name}</span>
      `;
      actionBtnEl.setAttribute("onclick", `openBookingModal('${nextClass.name}')`);
      actionBtnEl.title = `Apartar lugar para la próxima clase el ${nextClass.name}`;
    }
  }
}

/**
 * Abre el modal de detalle dinámico para una clase específica
 */
function openClassDetailModalDynamic(dayIndex, slotIndex) {
  const dayData = currentSchedule.days[dayIndex];
  if (!dayData) return;
  const classItem = dayData.classes.find(c => c.slotIndex === slotIndex);
  if (!classItem) return;

  const slots = currentSchedule.slots || DEFAULT_SCHEDULE_CONFIG.slots;
  const slot = slots[slotIndex] || { time: "7:00 PM a 8:00 PM" };

  document.getElementById("modal-class-title").innerText = `${classItem.title} - ${classItem.level}`;
  document.getElementById("modal-class-badge").innerText = classItem.badge || classItem.level;
  document.getElementById("modal-class-icon").innerText = classItem.icon || "💃";
  document.getElementById("modal-class-desc").innerText = `${classItem.focus ? classItem.focus + '. ' : ''}${classItem.desc || ''}`;
  document.getElementById("modal-class-time").innerText = `${dayData.name} • ${slot.time}`;

  const pointsEl = document.getElementById("modal-class-points");
  if (pointsEl) {
    pointsEl.innerHTML = (classItem.points || [
      "Clase impartida en Casa de Cultura Neteotiloyan.",
      "Instructores certificados con metodología paso a paso.",
      "No necesitas acudir en pareja para inscribirte."
    ]).map(p => `<li>✓ ${p}</li>`).join('');
  }

  // Enlace directo de consulta y solicitud de informes por WhatsApp (o Grupo)
  const waBtn = document.getElementById("modal-class-wa-btn");
  if (waBtn) {
    const isGroup = Boolean(window.SITE_CONFIG && window.SITE_CONFIG.whatsappType === "group" && window.SITE_CONFIG.whatsappGroupUrl && window.SITE_CONFIG.whatsappGroupUrl.trim());
    if (isGroup) {
      let gUrl = window.SITE_CONFIG.whatsappGroupUrl.trim();
      if (!/^https?:\/\//i.test(gUrl)) gUrl = "https://" + gUrl;
      waBtn.href = gUrl;
      const span = waBtn.querySelector("span");
      if (span) span.textContent = "Unirme al Grupo de Informes en WhatsApp";
    } else {
      const rawPhone = (window.SITE_CONFIG && (window.SITE_CONFIG.whatsappNumber || (window.SITE_CONFIG.contact && window.SITE_CONFIG.contact.whatsapp)))
        ? (window.SITE_CONFIG.whatsappNumber || window.SITE_CONFIG.contact.whatsapp)
        : "525512345678";
      const cleanPhone = rawPhone.replace(/\D/g, "");
      const msg = `Hola Ritmo Salsero! 👋 Deseo solicitar más informes sobre la clase de ${classItem.title} (${classItem.level || 'Todos los niveles'}) para el día ${dayData.name} en el horario de ${slot.time} en Casa de Cultura. ¿Me podrían dar requisitos y costos?`;
      waBtn.href = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
      const span = waBtn.querySelector("span");
      if (span) span.textContent = "Solicitar Informes por WhatsApp";
    }
  }

  // Prepara el contexto para apartado o consultas
  window.selectedBookingContext = `${classItem.title} - ${classItem.level} (${dayData.name} ${slot.time})`;

  const modal = document.getElementById("class-modal");
  if (modal) {
    modal.style.display = "flex";
    modal.classList.remove("hidden");
  }
}

/**
 * ========================================================
 * PANEL / MODAL DE EDICIÓN DE HORARIOS
 * ========================================================
 */

function openScheduleEditorModal(targetDay = 1, targetSlot = null) {
  activeEditorDay = targetDay;
  populateEditorFields(targetDay, targetSlot);
  const modal = document.getElementById("schedule-editor-modal");
  if (modal) {
    modal.style.display = "flex";
    modal.classList.remove("hidden");
  }
}

function closeScheduleEditorModal() {
  const modal = document.getElementById("schedule-editor-modal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.add("hidden");
  }
}

function selectEditorDay(dayIndex) {
  activeEditorDay = dayIndex;
  document.querySelectorAll(".editor-day-tab").forEach(tab => {
    tab.className = "editor-day-tab px-4 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-400/40";
  });
  const activeTab = document.getElementById(`editor-day-tab-${dayIndex}`);
  if (activeTab) {
    activeTab.className = "editor-day-tab active px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold shadow";
  }
  populateEditorFields(dayIndex);
}

function populateEditorFields(dayIndex, focusSlot = null) {
  const container = document.getElementById("editor-day-fields-container");
  if (!container) return;

  const dayData = currentSchedule.days[dayIndex];
  const slots = currentSchedule.slots;

  let html = `
    <!-- Switch Día con clases o descanso y Switch Leyenda Ver Detalles -->
    <div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h4 class="font-bold text-white text-sm">Configuración de ${dayData.name}</h4>
          <p class="text-xs text-slate-400">Activa si se imparten clases o márcalo como día de descanso.</p>
        </div>
        <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
          <input type="checkbox" id="edit-day-has-classes" ${dayData.hasClasses ? "checked" : ""} onchange="toggleDayClassesEnabled(this.checked)" class="w-4 h-4 rounded text-amber-500 focus:ring-amber-400">
          <span>${dayData.hasClasses ? "✅ Día con Clases" : "🌙 Día de Descanso"}</span>
        </label>
      </div>

      <!-- Control global de leyenda 'Ver detalles' -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs pt-1">
        <div>
          <span class="font-semibold text-slate-300 block">Leyenda "Ver detalles →" en las tarjetas</span>
          <span class="text-[10px] text-slate-400">Muestra u oculta el texto explicativo en cada tarjeta del horario.</span>
        </div>
        <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-700 hover:border-amber-400/50 whitespace-nowrap self-start sm:self-auto">
          <input type="checkbox" id="modal-toggle-legend" ${currentSchedule.showDetailsLegend !== false ? "checked" : ""} onchange="toggleDetailsLegend(this.checked)" class="w-4 h-4 rounded text-amber-500 focus:ring-amber-400">
          <span>${currentSchedule.showDetailsLegend !== false ? "👁️ Leyenda Visible" : "🙈 Leyenda Oculta"}</span>
        </label>
      </div>
    </div>
  `;

  // Contenedor de formulario de clases
  html += `<div id="editor-slots-group" class="${dayData.hasClasses ? "" : "hidden"} space-y-6">`;

  slots.forEach((slot, slotIndex) => {
    const classItem = (dayData.classes && dayData.classes.find(c => c.slotIndex === slotIndex)) || {
      slotIndex: slotIndex,
      title: "Salsa",
      level: "Nivel Básico",
      badge: "Principiante",
      focus: "Paso básico y figuras",
      desc: "Descripción de la sesión",
      points: ["Paso básico", "Giros fundamentales", "Ritmo y tiempo"],
      theme: "blue",
      icon: "⚡"
    };

    const activePalette = SCHEDULE_COLOR_PALETTES.find(p => p.key === classItem.theme) || SCHEDULE_COLOR_PALETTES[0];

    html += `
      <div class="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4 ${focusSlot === slotIndex ? "ring-2 ring-amber-400" : ""}">
        <!-- Encabezado del Bloque con Preview en Vivo y Guardado Rápido -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div class="flex items-center gap-3">
            <span id="slot-${slotIndex}-preview-icon" class="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center text-xl shadow-inner flex-shrink-0">
              ${classItem.icon || "⚡"}
            </span>
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h5 class="font-bold text-sm text-white">Bloque ${slotIndex + 1} • <span id="slot-${slotIndex}-time-preview">${slot.time}</span></h5>
                <span id="slot-${slotIndex}-preview-badge" class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${activePalette.badgeCls}">
                  ${classItem.badge || classItem.level}
                </span>
              </div>
              <p class="text-[11px] text-slate-400">Duración: ${slot.duration}</p>
            </div>
          </div>

          <button type="button" onclick="saveCurrentSlotAsRapido(${slotIndex})" class="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-slate-700 hover:border-amber-400/50 text-[11px] font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto" title="Guarda los datos de este bloque como un botón Rápido reutilizable">
            <span>➕ Guardar como Rápido</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Horario editable -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Horario del Bloque</label>
            <input type="text" id="slot-${slotIndex}-time" value="${slot.time}" oninput="document.getElementById('slot-${slotIndex}-time-preview').textContent = this.value" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none">
          </div>

          <!-- Ritmo / Título -->
          <div>
            <label class="block text-xs font-semibold text-slate-300 mb-1">Ritmo / Título Principal</label>
            <input type="text" id="slot-${slotIndex}-title" value="${classItem.title}" placeholder="Ej. Salsa Cubana, Cumbia, Bachata" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none">
          </div>

          <!-- BOTONES RÁPIDOS PERSONALIZABLES -->
          <div class="sm:col-span-2 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/90 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <label class="block text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <span>⚡</span> Botones Rápidos (Preajustes de Nivel, Color e Icono)
                </label>
                <p class="text-[10px] text-slate-400">Aplica combinaciones al instante con un solo clic. Puedes modificarlos o crear los tuyos.</p>
              </div>
              <button type="button" onclick="toggleRapidosManager(${slotIndex})" id="slot-${slotIndex}-toggle-manager-btn" class="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 text-[10px] font-bold transition-all flex items-center gap-1">
                <span>⚙️ Modificar Rápidos</span>
              </button>
            </div>

            <!-- Botones Rápidos generados dinámicamente -->
            <div id="slot-${slotIndex}-rapidos-chips-bar" class="flex flex-wrap items-center gap-1.5 pt-1">
              ${renderRapidosButtonsHtml(slotIndex)}
            </div>

            <!-- Panel de Administración / Modificación de Rápidos -->
            <div id="slot-${slotIndex}-rapidos-manager" class="hidden mt-3 p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3">
              ${renderRapidosManagerHtml(slotIndex)}
            </div>
          </div>

          <!-- Nivel / Distintivo (Badge) -->
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">Distintivo en Tarjeta (Badge)</label>
            <input type="text" id="slot-${slotIndex}-badge" value="${classItem.badge || classItem.level}" oninput="document.getElementById('slot-${slotIndex}-preview-badge').textContent = this.value" placeholder="Ej. ¡Desde Cero!, Nivel Intermedio..." class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-amber-200 text-xs font-bold focus:border-amber-400 focus:outline-none">
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-300 mb-1">Nombre Completo del Nivel</label>
            <input type="text" id="slot-${slotIndex}-level" value="${classItem.level || classItem.badge}" placeholder="Ej. Nivel Básico, Nivel Intermedio..." class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none">
          </div>

          <!-- Subtítulo / Enfoque -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-slate-300 mb-1">Subtítulo / Enfoque de la Clase</label>
            <input type="text" id="slot-${slotIndex}-focus" value="${classItem.focus || ''}" placeholder="Ej. Rueda de Casino, Vueltas y Cadencia" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none">
          </div>

          <!-- SELECCIÓN VISUAL DE COLOR DE TARJETA -->
          <div class="sm:col-span-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 space-y-2.5">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span>🎨</span> Color de Tarjeta y Resplandor
              </label>
              <span id="slot-${slotIndex}-theme-name-display" class="text-[11px] font-bold text-amber-300">
                ${activePalette.label}
              </span>
            </div>

            <!-- Botones tipo Swatches de colores -->
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              ${SCHEDULE_COLOR_PALETTES.map(palette => {
                const isSelected = (classItem.theme || "blue") === palette.key;
                return `
                  <button type="button" 
                    onclick="selectSlotTheme(${slotIndex}, '${palette.key}')" 
                    id="slot-${slotIndex}-theme-btn-${palette.key}" 
                    class="slot-${slotIndex}-theme-swatch p-2 rounded-xl border text-left transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected ? 'border-amber-400 bg-slate-800/90 ring-2 ring-amber-400/50 shadow-md' : 'border-slate-800 bg-slate-900/60 hover:border-slate-600'
                    }"
                    title="${palette.label} (${palette.desc})">
                    <span class="w-6 h-6 rounded-full shadow-inner flex items-center justify-center text-xs font-bold text-white" style="background-color: ${palette.hex};">
                      <span class="swatch-check">${isSelected ? '✓' : ''}</span>
                    </span>
                    <span class="text-[10px] font-semibold text-slate-300 text-center leading-tight line-clamp-1">${palette.label}</span>
                  </button>
                `;
              }).join("")}
            </div>

            <!-- Campo oculto para compatibilidad con guardado -->
            <input type="hidden" id="slot-${slotIndex}-theme" value="${classItem.theme || 'blue'}">
          </div>

          <!-- SELECCIÓN VISUAL DE ICONO REPRESENTATIVO -->
          <div class="sm:col-span-2 bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80 space-y-2.5">
            <div class="flex items-center justify-between">
              <label class="block text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <span>🎭</span> Icono Representativo
              </label>
              <span class="text-[10px] text-slate-400">Haz clic en un emoji o escribe tu preferido</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 flex-shrink-0">
                <input type="text" id="slot-${slotIndex}-icon" value="${classItem.icon || '⚡'}" maxlength="4" 
                  oninput="handleCustomIconInput(${slotIndex}, this.value)"
                  class="w-12 h-10 text-xl text-center rounded-xl bg-slate-900 border border-slate-700 text-white font-bold focus:border-amber-400 focus:outline-none">
                <span class="text-[10px] text-slate-400">Actual</span>
              </div>

              <!-- Barra interactiva con emojis rápidos -->
              <div class="flex-1 flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
                ${SCHEDULE_POPULAR_ICONS.map(emoji => `
                  <button type="button" 
                    onclick="selectSlotIcon(${slotIndex}, '${emoji}')" 
                    class="slot-${slotIndex}-icon-chip w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border ${
                      (classItem.icon || '⚡') === emoji ? 'border-amber-400 ring-1 ring-amber-400 bg-amber-400/10' : 'border-slate-800 hover:border-slate-600'
                    } flex items-center justify-center text-sm transition-all hover:scale-110"
                    title="Elegir ${emoji}">
                    ${emoji}
                  </button>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- Temario / Viñetas -->
          <div class="sm:col-span-2">
            <label class="block text-xs font-semibold text-slate-300 mb-1">Temario / Puntos Clave (1 por línea)</label>
            <textarea id="slot-${slotIndex}-points" rows="3" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-amber-400 focus:outline-none font-sans" placeholder="Escribe un punto por cada línea">${(classItem.points || []).join("\n")}</textarea>
          </div>
        </div>
      </div>
    `;
  });

  html += `</div>`; // fin editor-slots-group

  // Si no tiene clases (día de descanso), mostrar campos para el mensaje de descanso
  html += `
    <div id="editor-rest-group" class="${dayData.hasClasses ? "hidden" : ""} bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
      <h5 class="font-bold text-sm text-slate-300">Mensaje de Día de Descanso</h5>
      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1">Título</label>
        <input type="text" id="rest-title" value="${dayData.restTitle || "Sin Clases"}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1">Subtítulo</label>
        <input type="text" id="rest-subtitle" value="${dayData.restSubtitle || "Día de descanso semanal"}" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs">
      </div>
      <div>
        <label class="block text-xs font-semibold text-slate-400 mb-1">Mensaje explicativo</label>
        <textarea id="rest-desc" rows="2" class="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs">${dayData.restDesc || "Día de descanso y ensayo libre."}</textarea>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function toggleDayClassesEnabled(hasClasses) {
  const slotsGroup = document.getElementById("editor-slots-group");
  const restGroup = document.getElementById("editor-rest-group");
  if (hasClasses) {
    slotsGroup?.classList.remove("hidden");
    restGroup?.classList.add("hidden");
  } else {
    slotsGroup?.classList.add("hidden");
    restGroup?.classList.remove("hidden");
  }
}

/**
 * Guarda los campos editados del formulario
 */
function saveScheduleEditor() {
  const dayIndex = activeEditorDay;
  const dayData = currentSchedule.days[dayIndex];
  const hasClasses = document.getElementById("edit-day-has-classes")?.checked ?? true;

  dayData.hasClasses = hasClasses;

  if (!hasClasses) {
    dayData.restTitle = document.getElementById("rest-title")?.value || "Sin Clases";
    dayData.restSubtitle = document.getElementById("rest-subtitle")?.value || "Día de descanso";
    dayData.restDesc = document.getElementById("rest-desc")?.value || "Día de descanso semanal.";
    dayData.classes = [];
  } else {
    dayData.classes = [];
    currentSchedule.slots.forEach((slot, slotIndex) => {
      // Actualizar horario general si fue editado
      const timeVal = document.getElementById(`slot-${slotIndex}-time`)?.value || slot.time;
      slot.time = timeVal;
      slot.label = timeVal.split("a")[0]?.trim() || slot.label;
      slot.sublabel = timeVal.split("a")[1] ? `a ${timeVal.split("a")[1].trim()}` : slot.sublabel;

      const title = document.getElementById(`slot-${slotIndex}-title`)?.value.trim() || "Salsa";
      const badge = document.getElementById(`slot-${slotIndex}-badge`)?.value.trim() || "Nivel Básico";
      const level = document.getElementById(`slot-${slotIndex}-level`)?.value.trim() || badge;
      const focus = document.getElementById(`slot-${slotIndex}-focus`)?.value.trim() || "";
      const theme = document.getElementById(`slot-${slotIndex}-theme`)?.value || "blue";
      const icon = document.getElementById(`slot-${slotIndex}-icon`)?.value || "⚡";
      const pointsRaw = document.getElementById(`slot-${slotIndex}-points`)?.value || "";
      const points = pointsRaw.split("\n").map(p => p.trim()).filter(Boolean);

      const typeSlug = `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${level.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

      dayData.classes.push({
        slotIndex: slotIndex,
        title: title,
        level: level,
        badge: badge,
        focus: focus,
        desc: `${title} con enfoque en ${focus || level}.`,
        points: points.length ? points : ["Técnica y paso básico", "Musicalidad", "Trabajo en pareja"],
        type: typeSlug,
        icon: icon,
        theme: theme
      });
    });
  }

  // Guardar estado del switch de leyenda
  const legendCheckbox = document.getElementById("modal-toggle-legend");
  if (legendCheckbox) {
    currentSchedule.showDetailsLegend = legendCheckbox.checked;
  }

  saveScheduleData(currentSchedule);
  closeScheduleEditorModal();
}

/**
 * Renderiza los botones Rápidos dinámicos para un bloque
 */
function renderRapidosButtonsHtml(slotIndex) {
  const presets = loadRapidosPresets();
  if (!presets || presets.length === 0) {
    return `<span class="text-[10px] text-slate-500 italic">No hay botones rápidos configurados.</span>`;
  }

  const themeBadges = {
    emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/35",
    blue: "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/35",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/35",
    rose: "bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/35",
    purple: "bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/35",
    orange: "bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/35",
    cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/35",
    slate: "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
  };

  return presets.map(p => {
    const cls = themeBadges[p.theme] || themeBadges.amber;
    return `
      <button type="button" 
        onclick="applySlotPreset(${slotIndex}, '${p.id}')" 
        class="px-2.5 py-1 rounded-lg border text-[10px] font-bold transition-all shadow-sm flex items-center gap-1 hover:scale-105 active:scale-95 ${cls}"
        title="Aplicar ${p.badge} (${p.level})">
        <span>${p.name || p.badge}</span>
      </button>
    `;
  }).join("");
}

/**
 * Renderiza el panel administrador y editor de Rápidos
 */
function renderRapidosManagerHtml(slotIndex) {
  const presets = loadRapidosPresets();
  return `
    <div class="space-y-3">
      <div class="flex items-center justify-between pb-2 border-b border-slate-800">
        <div>
          <h6 class="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <span>⚙️</span> Modificar y Administrar Botones Rápidos
          </h6>
          <p class="text-[10px] text-slate-400">Edita los textos, colores o elimina los que no utilices.</p>
        </div>
        <button type="button" onclick="resetRapidosPresetsToDefault()" class="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 transition-colors" title="Restablecer valores originales">
          🔄 Valores por Defecto
        </button>
      </div>

      <!-- Lista de Rápidos actuales -->
      <div class="space-y-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
        ${presets.map((p) => `
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2 flex-1">
              <span class="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-sm flex-shrink-0">${p.icon || '⚡'}</span>
              <div class="flex-1">
                <input type="text" value="${p.name || p.badge}" 
                  onchange="updateRapidoPresetField('${p.id}', 'name', this.value)" 
                  class="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-amber-200 text-xs font-bold focus:border-amber-400 focus:outline-none" title="Etiqueta del Botón">
              </div>
            </div>

            <div class="grid grid-cols-2 sm:flex sm:items-center gap-2">
              <input type="text" value="${p.badge || ''}" placeholder="Badge" 
                onchange="updateRapidoPresetField('${p.id}', 'badge', this.value)" 
                class="w-24 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px] focus:border-amber-400 focus:outline-none" title="Distintivo / Badge">

              <select onchange="updateRapidoPresetField('${p.id}', 'theme', this.value)" 
                class="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[11px] focus:border-amber-400 focus:outline-none" title="Color de Tarjeta">
                ${SCHEDULE_COLOR_PALETTES.map(col => `
                  <option value="${col.key}" ${p.theme === col.key ? 'selected' : ''}>${col.label}</option>
                `).join('')}
              </select>

              <button type="button" onclick="deleteRapidoPreset('${p.id}')" 
                class="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800 text-xs flex items-center justify-center transition-colors" title="Eliminar este Rápido">
                🗑️
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Agregar Nuevo Rápido Directamente -->
      <div class="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <span class="text-[11px] text-slate-400">💡 También puedes configurar un bloque y presionar <strong>"➕ Guardar como Rápido"</strong>.</span>
        <button type="button" onclick="promptAddNewRapidoPreset()" class="px-3 py-1.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-500/40 hover:bg-amber-400/30 text-xs font-bold transition-all flex items-center gap-1.5">
          <span>➕ Crear Nuevo Rápido</span>
        </button>
      </div>
    </div>
  `;
}

/**
 * Aplica un preajuste rápido al bloque especificado
 */
function applySlotPreset(slotIndex, presetId) {
  const presets = loadRapidosPresets();
  const preset = presets.find(p => p.id === presetId);
  if (!preset) return;

  const badgeInp = document.getElementById(`slot-${slotIndex}-badge`);
  const levelInp = document.getElementById(`slot-${slotIndex}-level`);
  const focusInp = document.getElementById(`slot-${slotIndex}-focus`);

  if (badgeInp) badgeInp.value = preset.badge || preset.name;
  if (levelInp) levelInp.value = preset.level || preset.badge || preset.name;
  if (focusInp && preset.focus) focusInp.value = preset.focus;

  if (preset.theme) selectSlotTheme(slotIndex, preset.theme);
  if (preset.icon) selectSlotIcon(slotIndex, preset.icon);

  // Actualizar badge en vivo en la cabecera
  const previewBadge = document.getElementById(`slot-${slotIndex}-preview-badge`);
  if (previewBadge) previewBadge.textContent = preset.badge || preset.name;

  showToastNotification(`✨ Rápido aplicado: ${preset.name || preset.badge}`);
}

/**
 * Selecciona interactivamente el color de tarjeta para un bloque
 */
function selectSlotTheme(slotIndex, themeKey) {
  const themeInput = document.getElementById(`slot-${slotIndex}-theme`);
  if (themeInput) themeInput.value = themeKey;

  // Actualizar estilos de los botones de paleta
  document.querySelectorAll(`.slot-${slotIndex}-theme-swatch`).forEach(btn => {
    btn.className = `slot-${slotIndex}-theme-swatch p-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:border-slate-600 text-left transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer`;
    const checkEl = btn.querySelector(".swatch-check");
    if (checkEl) checkEl.textContent = "";
  });

  const activeBtn = document.getElementById(`slot-${slotIndex}-theme-btn-${themeKey}`);
  if (activeBtn) {
    activeBtn.className = `slot-${slotIndex}-theme-swatch p-2 rounded-xl border border-amber-400 bg-slate-800/90 ring-2 ring-amber-400/50 shadow-md text-left transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer`;
    const checkEl = activeBtn.querySelector(".swatch-check");
    if (checkEl) checkEl.textContent = "✓";
  }

  // Nombre de color visible
  const palette = SCHEDULE_COLOR_PALETTES.find(p => p.key === themeKey) || SCHEDULE_COLOR_PALETTES[0];
  const displayEl = document.getElementById(`slot-${slotIndex}-theme-name-display`);
  if (displayEl) displayEl.textContent = palette.label;

  // Actualizar badge en cabecera del bloque
  const previewBadge = document.getElementById(`slot-${slotIndex}-preview-badge`);
  if (previewBadge) {
    previewBadge.className = `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${palette.badgeCls}`;
  }
}

/**
 * Selecciona un icono (emoji) para el bloque
 */
function selectSlotIcon(slotIndex, emoji) {
  const iconInput = document.getElementById(`slot-${slotIndex}-icon`);
  if (iconInput) iconInput.value = emoji;

  // Actualizar chips de emojis
  document.querySelectorAll(`.slot-${slotIndex}-icon-chip`).forEach(chip => {
    chip.className = `slot-${slotIndex}-icon-chip w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 flex items-center justify-center text-sm transition-all hover:scale-110`;
  });

  const activeChips = Array.from(document.querySelectorAll(`.slot-${slotIndex}-icon-chip`)).filter(c => c.textContent.trim() === emoji);
  activeChips.forEach(c => {
    c.className = `slot-${slotIndex}-icon-chip w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400 ring-1 ring-amber-400 flex items-center justify-center text-sm transition-all scale-105`;
  });

  // Cabecera del bloque
  const headerIcon = document.getElementById(`slot-${slotIndex}-preview-icon`);
  if (headerIcon) headerIcon.textContent = emoji;
}

function handleCustomIconInput(slotIndex, val) {
  const clean = val.trim();
  const headerIcon = document.getElementById(`slot-${slotIndex}-preview-icon`);
  if (headerIcon && clean) headerIcon.textContent = clean;
}

/**
 * Guarda los valores actuales del bloque como un nuevo botón Rápido
 */
function saveCurrentSlotAsRapido(slotIndex) {
  const badgeVal = document.getElementById(`slot-${slotIndex}-badge`)?.value.trim() || "Mi Nivel";
  const levelVal = document.getElementById(`slot-${slotIndex}-level`)?.value.trim() || badgeVal;
  const focusVal = document.getElementById(`slot-${slotIndex}-focus`)?.value.trim() || "";
  const themeVal = document.getElementById(`slot-${slotIndex}-theme`)?.value || "blue";
  const iconVal = document.getElementById(`slot-${slotIndex}-icon`)?.value.trim() || "⚡";

  const defaultName = `${iconVal} ${badgeVal}`;
  const customName = prompt("Ingresa el nombre o etiqueta para este nuevo botón Rápido:", defaultName);
  if (customName === null) return;

  const presets = loadRapidosPresets();
  const newPreset = {
    id: "custom-" + Date.now(),
    name: customName.trim() || defaultName,
    badge: badgeVal,
    level: levelVal,
    focus: focusVal,
    theme: themeVal,
    icon: iconVal
  };

  presets.push(newPreset);
  saveRapidosPresets(presets);
  showToastNotification(`✅ ¡Nuevo Rápido agregado: "${newPreset.name}"!`);
}

/**
 * Abre o cierra la bandeja de administración de Rápidos
 */
function toggleRapidosManager(slotIndex) {
  const mgr = document.getElementById(`slot-${slotIndex}-rapidos-manager`);
  const btn = document.getElementById(`slot-${slotIndex}-toggle-manager-btn`);
  if (!mgr) return;
  const isHidden = mgr.classList.contains("hidden");
  if (isHidden) {
    mgr.classList.remove("hidden");
    if (btn) btn.innerHTML = `<span>✕ Cerrar Editor</span>`;
  } else {
    mgr.classList.add("hidden");
    if (btn) btn.innerHTML = `<span>⚙️ Modificar Rápidos</span>`;
  }
}

function updateRapidoPresetField(presetId, field, value) {
  const presets = loadRapidosPresets();
  const preset = presets.find(p => p.id === presetId);
  if (preset) {
    preset[field] = value.trim();
    saveRapidosPresets(presets);
  }
}

function deleteRapidoPreset(presetId) {
  const presets = loadRapidosPresets();
  if (presets.length <= 1) {
    alert("Debes mantener al menos un botón Rápido activo.");
    return;
  }
  const filtered = presets.filter(p => p.id !== presetId);
  saveRapidosPresets(filtered);
  showToastNotification("🗑️ Rápido eliminado.");
}

function promptAddNewRapidoPreset() {
  const name = prompt("Nombre del botón (ej. ✨ Taller Especial):");
  if (!name || !name.trim()) return;

  const presets = loadRapidosPresets();
  presets.push({
    id: "custom-" + Date.now(),
    name: name.trim(),
    badge: name.trim(),
    level: name.trim(),
    focus: "Técnica y Práctica",
    theme: "amber",
    icon: "⭐"
  });
  saveRapidosPresets(presets);
  showToastNotification(`✨ Nuevo Rápido "${name}" creado.`);
}

/**
 * Asigna rápidamente un nivel y distintivo a un bloque en el editor (compatibilidad)
 */
function setSlotLevel(slotIndex, badgeVal, levelVal) {
  const badgeInput = document.getElementById(`slot-${slotIndex}-badge`);
  const levelInput = document.getElementById(`slot-${slotIndex}-level`);
  if (badgeInput) badgeInput.value = badgeVal;
  if (levelInput) levelInput.value = levelVal || badgeVal;
}

/**
 * Activa o desactiva la leyenda 'Ver detalles' en las tarjetas
 */
function toggleDetailsLegend(forceVal = null) {
  if (forceVal !== null) {
    currentSchedule.showDetailsLegend = Boolean(forceVal);
  } else {
    currentSchedule.showDetailsLegend = !(currentSchedule.showDetailsLegend !== false);
  }

  saveScheduleData(currentSchedule);
  updateDetailsLegendUI();
}

/**
 * Sincroniza el botón y los controles de la leyenda 'Ver detalles'
 */
function updateDetailsLegendUI() {
  const isEnabled = currentSchedule.showDetailsLegend !== false;

  const btn = document.getElementById("btn-toggle-legend");
  const icon = document.getElementById("btn-toggle-legend-icon");
  const text = document.getElementById("btn-toggle-legend-text");

  if (btn) {
    if (isEnabled) {
      btn.className = "text-xs text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-amber-500/40 font-semibold flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shadow whitespace-nowrap";
      if (icon) icon.innerText = "👁️";
      if (text) text.innerHTML = `"Ver detalles": <strong class="text-amber-400">Activado</strong>`;
    } else {
      btn.className = "text-xs text-slate-400 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 font-medium flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all shadow whitespace-nowrap opacity-80";
      if (icon) icon.innerText = "🙈";
      if (text) text.innerHTML = `"Ver detalles": <strong class="text-slate-400">Oculto</strong>`;
    }
  }

  const modalToggle = document.getElementById("modal-toggle-legend");
  if (modalToggle) {
    modalToggle.checked = isEnabled;
  }
}

/**
 * Exporta el JSON actual
 */
function exportScheduleJSON() {
  const jsonStr = JSON.stringify(currentSchedule, null, 2);
  navigator.clipboard.writeText(jsonStr).then(() => {
    showToastNotification("Configuración JSON copiada al portapapeles 📋");
  }).catch(() => {
    prompt("Copia tu configuración JSON:", jsonStr);
  });
}

/**
 * Muestra notificación flotante elegante
 */
function showToastNotification(msg) {
  let toast = document.getElementById("ritmo-schedule-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "ritmo-schedule-toast";
    toast.className = "fixed bottom-5 right-5 z-50 px-5 py-3 rounded-2xl bg-amber-400 text-slate-950 font-bold text-xs shadow-2xl transition-all transform duration-300 translate-y-20 opacity-0 flex items-center gap-2 border border-amber-300";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span><span>${msg}</span>`;
  toast.classList.remove("translate-y-20", "opacity-0");
  setTimeout(() => {
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3500);
}

/**
 * Renderiza todos los componentes de la interfaz
 */


/**
 * Dibuja un rectángulo con esquinas redondeadas en Canvas
 */
function drawCanvasRoundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }
  ctx.closePath();
}

/**
 * Dibuja un emblema vectorial dorado del Sol de Ritmo Salsero en Canvas
 * 100% nativo, sin dependencias externas ni problemas de CORS.
 */
function drawRitmoSunEmblem(ctx, x, y, size) {
  ctx.save();
  const cx = x + size / 2;
  const cy = y + size / 2;
  const r = size * 0.42;

  // 1. Rayos solares exteriores (16 rayos)
  ctx.save();
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI) / 8;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(-size * 0.045, -r);
    ctx.lineTo(0, -size * 0.49);
    ctx.lineTo(size * 0.045, -r);
    ctx.closePath();

    const rayGrad = ctx.createLinearGradient(0, -r, 0, -size * 0.49);
    rayGrad.addColorStop(0, "#E5B84B");
    rayGrad.addColorStop(1, "#FFEBA8");
    ctx.fillStyle = rayGrad;
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();

  // 2. Disco exterior oscuro con bisel dorado
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  const discGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
  discGrad.addColorStop(0, "#0E1A38");
  discGrad.addColorStop(0.85, "#070E22");
  discGrad.addColorStop(1, "#030611");
  ctx.fillStyle = discGrad;
  ctx.fill();

  ctx.lineWidth = 4;
  const ringGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  ringGrad.addColorStop(0, "#FFECA8");
  ringGrad.addColorStop(0.5, "#E5B84B");
  ringGrad.addColorStop(1, "#99711A");
  ctx.strokeStyle = ringGrad;
  ctx.stroke();

  // 3. Anillo interior decorativo
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.82, 0, Math.PI * 2);
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(229, 184, 75, 0.5)";
  ctx.stroke();

  // 4. Silueta y notas en el centro
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = Math.floor(size * 0.34) + "px sans-serif";
  ctx.fillText("💃", cx - size * 0.06, cy + size * 0.02);

  ctx.font = Math.floor(size * 0.16) + "px sans-serif";
  ctx.fillText("🎶", cx + size * 0.14, cy - size * 0.14);

  // 5. Leyenda dorada
  ctx.font = "bold " + Math.floor(size * 0.08) + "px sans-serif";
  ctx.fillStyle = "#FDE68A";
  ctx.fillText("RITMO SALSERO", cx, cy + r * 0.58);

  ctx.restore();
}

/**
 * Renderiza el lienzo completo del horario web oficial en Ultra Alta Resolución
 */
function renderScheduleCanvasContent(canvas, ctx, logoImg) {
  const W = canvas.width;
  const H = canvas.height;

  // 1. FONDO DEGRADADO NOCTURNO PROFUNDO
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, "#040714");
  bgGrad.addColorStop(0.25, "#081229");
  bgGrad.addColorStop(0.65, "#060E21");
  bgGrad.addColorStop(1, "#02040A");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Halo de luz dorada ambiental superior
  const ambient = ctx.createRadialGradient(W / 2, 220, 60, W / 2, 250, 1100);
  ambient.addColorStop(0, "rgba(229, 184, 75, 0.18)");
  ambient.addColorStop(0.5, "rgba(229, 184, 75, 0.04)");
  ambient.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = ambient;
  ctx.fillRect(0, 0, W, H);

  // Puntos estelares sutiles en el fondo
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  const starSeeds = [
    [150, 120, 2], [320, 240, 1.5], [600, 100, 2.5], [920, 190, 1.5],
    [1200, 80, 2], [1450, 220, 1.5], [1780, 130, 2.5], [2100, 200, 1.8],
    [2300, 90, 2], [100, 900, 1.5], [2250, 850, 2], [1150, 1480, 2]
  ];
  starSeeds.forEach(([sx, sy, sr]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  // 2. MARCO DORADO DE GALA CON BISEL
  ctx.save();
  ctx.lineWidth = 4;
  const borderGrad = ctx.createLinearGradient(0, 0, W, H);
  borderGrad.addColorStop(0, "#FFF3BA");
  borderGrad.addColorStop(0.35, "#E5B84B");
  borderGrad.addColorStop(0.7, "#99711A");
  borderGrad.addColorStop(1, "#FDF3C7");
  ctx.strokeStyle = borderGrad;
  drawCanvasRoundRect(ctx, 35, 35, W - 70, H - 70, 28);
  ctx.stroke();

  // Marco interior fino
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "rgba(229, 184, 75, 0.45)";
  drawCanvasRoundRect(ctx, 48, 48, W - 96, H - 96, 22);
  ctx.stroke();

  // Acentos en las esquinas
  const drawCornerAccent = (cx, cy) => {
    ctx.save();
    ctx.fillStyle = "#E5B84B";
    ctx.beginPath();
    ctx.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#FFF3BA";
    ctx.stroke();
    ctx.restore();
  };
  drawCornerAccent(58, 58);
  drawCornerAccent(W - 58, 58);
  drawCornerAccent(58, H - 58);
  drawCornerAccent(W - 58, H - 58);
  ctx.restore();

  // 3. ENCABEZADO
  // Logotipo o Emblema
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0) {
    try {
      ctx.save();
      ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
      ctx.shadowBlur = 18;
      ctx.drawImage(logoImg, 80, 52, 195, 195);
      ctx.restore();
    } catch (e) {
      drawRitmoSunEmblem(ctx, 80, 52, 195);
    }
  } else {
    drawRitmoSunEmblem(ctx, 80, 52, 195);
  }

  // Título Principal de la Academia
  ctx.save();
  const titleX = 300;
  
  // Nombre de la academia
  ctx.font = "bold 64px serif";
  const titleGrad = ctx.createLinearGradient(titleX, 70, titleX + 650, 140);
  titleGrad.addColorStop(0, "#FFF9E6");
  titleGrad.addColorStop(0.35, "#F3CA65");
  titleGrad.addColorStop(0.7, "#C79527");
  titleGrad.addColorStop(1, "#FFEBA8");
  ctx.fillStyle = titleGrad;
  ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
  ctx.shadowBlur = 16;
  ctx.fillText("RITMO SALSERO", titleX, 126);

  // Eslogan de la academia
  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = "#E5B84B";
  ctx.shadowBlur = 6;
  ctx.fillText("ACADEMIA DE BAILE • SALSA & CUMBIA", titleX + 4, 164);

  // Título del programa oficial
  ctx.font = "bold 30px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowBlur = 10;
  ctx.fillText("HORARIO OFICIAL DE CLASES PRESENCIALES", titleX + 4, 212);
  ctx.restore();

  // Badges informativos en la cabecera derecha
  const rightBadgeX = 1620;
  const rightBadgeW = 700;
  
  // Badge 1: Sede
  ctx.save();
  ctx.fillStyle = "rgba(12, 22, 48, 0.9)";
  ctx.strokeStyle = "rgba(229, 184, 75, 0.45)";
  ctx.lineWidth = 1.5;
  drawCanvasRoundRect(ctx, rightBadgeX, 72, rightBadgeW, 64, 14);
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 18px sans-serif";
  ctx.fillStyle = "#FDE68A";
  ctx.fillText("📍 SEDE: Casa de Cultura Neteotiloyan", rightBadgeX + 22, 100);
  ctx.font = "15px sans-serif";
  ctx.fillStyle = "#CBD5E1";
  ctx.fillText("Av. 16 de Septiembre s/n, San Martín de las Pirámides", rightBadgeX + 22, 123);

  // Badge 2: Filosofía
  drawCanvasRoundRect(ctx, rightBadgeX, 148, rightBadgeW, 64, 14);
  ctx.fill();
  ctx.stroke();

  ctx.font = "bold 18px sans-serif";
  ctx.fillStyle = "#FDE68A";
  ctx.fillText("✨ CLASES DESDE CERO • AMBIENTE FAMILIAR", rightBadgeX + 22, 177);
  ctx.font = "15px sans-serif";
  ctx.fillStyle = "#CBD5E1";
  ctx.fillText("Sin pareja obligatoria • Atención personalizada en cada nivel", rightBadgeX + 22, 199);
  ctx.restore();

  // 4. PARRILLA / TABLA DE HORARIOS
  const startY = 270;
  const colTimeW = 320;
  const gap = 16;
  const numDays = 5;
  const startX = 75;
  const totalTableW = W - 150;
  const colDayW = Math.floor((totalTableW - colTimeW - (numDays * gap)) / numDays);

  // 4.1 Encabezados de Columna
  ctx.save();
  ctx.fillStyle = "#0C1733";
  ctx.strokeStyle = "rgba(229, 184, 75, 0.55)";
  ctx.lineWidth = 2;
  drawCanvasRoundRect(ctx, startX, startY, colTimeW, 60, 14);
  ctx.fill();
  ctx.stroke();
  ctx.font = "bold 20px serif";
  ctx.fillStyle = "#F3CA65";
  ctx.textAlign = "center";
  ctx.fillText("⏰ HORARIO", startX + colTimeW / 2, startY + 38);

  // Cabecera de los 5 Días
  const dayNames = ["LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES"];
  for (let d = 0; d < 5; d++) {
    const dx = startX + colTimeW + gap + d * (colDayW + gap);
    const isRest = (d === 2);
    ctx.fillStyle = isRest ? "rgba(15, 23, 42, 0.85)" : "#0F2044";
    ctx.strokeStyle = isRest ? "rgba(100, 116, 139, 0.6)" : "rgba(229, 184, 75, 0.6)";
    ctx.lineWidth = 2;
    drawCanvasRoundRect(ctx, dx, startY, colDayW, 60, 14);
    ctx.fill();
    ctx.stroke();

    ctx.font = "bold 21px sans-serif";
    ctx.fillStyle = isRest ? "#94A3B8" : "#FFFFFF";
    ctx.fillText(isRest ? "MIÉRCOLES (DESCANSO)" : dayNames[d], dx + colDayW / 2, startY + 38);
  }
  ctx.restore();

  // 4.2 Filas de Horario (Slots)
  const slots = currentSchedule.slots || [
    { label: "7:00 PM", sublabel: "a 8:00 PM", duration: "60 minutos", time: "7:00 PM a 8:00 PM" },
    { label: "8:00 PM", sublabel: "a 9:00 PM", duration: "60 minutos", time: "8:00 PM a 9:00 PM" }
  ];

  const slotH = 460;
  const slotGap = 20;

  slots.forEach((slot, slotIndex) => {
    const rowY = startY + 60 + gap + slotIndex * (slotH + slotGap);

    // Columna de Tiempo
    ctx.save();
    ctx.fillStyle = "rgba(10, 19, 42, 0.9)";
    ctx.strokeStyle = "rgba(229, 184, 75, 0.4)";
    ctx.lineWidth = 1.5;
    drawCanvasRoundRect(ctx, startX, rowY, colTimeW, slotH, 18);
    ctx.fill();
    ctx.stroke();

    // Texto de la hora
    ctx.font = "bold 44px serif";
    ctx.fillStyle = "#FDE68A";
    ctx.textAlign = "center";
    ctx.fillText(slot.label, startX + colTimeW / 2, rowY + 175);

    ctx.font = "bold 22px sans-serif";
    ctx.fillStyle = "#94A3B8";
    ctx.fillText(slot.sublabel, startX + colTimeW / 2, rowY + 220);

    // Duración
    ctx.fillStyle = "rgba(229, 184, 75, 0.16)";
    drawCanvasRoundRect(ctx, startX + 45, rowY + 265, colTimeW - 90, 42, 10);
    ctx.fill();
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#F5D580";
    ctx.fillText("⏱️ " + slot.duration, startX + colTimeW / 2, rowY + 292);
    ctx.restore();

    // Columnas de Días
    for (let d = 1; d <= 5; d++) {
      const dayData = currentSchedule.days ? currentSchedule.days[d] : null;
      const dx = startX + colTimeW + gap + (d - 1) * (colDayW + gap);

      if (!dayData || !dayData.hasClasses) {
        // Miércoles / Día de descanso
        ctx.save();
        ctx.fillStyle = "rgba(12, 20, 42, 0.7)";
        ctx.strokeStyle = "rgba(71, 85, 105, 0.7)";
        ctx.lineWidth = 2;
        if (ctx.setLineDash) ctx.setLineDash([10, 10]);
        drawCanvasRoundRect(ctx, dx, rowY, colDayW, slotH, 18);
        ctx.fill();
        ctx.stroke();
        if (ctx.setLineDash) ctx.setLineDash([]);

        ctx.textAlign = "center";
        ctx.font = "54px sans-serif";
        ctx.fillText("🌙", dx + colDayW / 2, rowY + 160);

        ctx.font = "bold 26px serif";
        ctx.fillStyle = "#CBD5E1";
        ctx.fillText("DÍA DE DESCANSO", dx + colDayW / 2, rowY + 225);

        ctx.font = "bold 17px sans-serif";
        ctx.fillStyle = "#94A3B8";
        ctx.fillText("Sin clases presenciales hoy", dx + colDayW / 2, rowY + 265);

        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#64748B";
        ctx.fillText("¡Te esperamos con todo el ritmo!", dx + colDayW / 2, rowY + 300);
        ctx.restore();
      } else {
        // Clase programada
        const classItem = dayData.classes ? dayData.classes.find(c => c.slotIndex === slotIndex) : null;
        if (classItem) {
          renderClassCardOnCanvas(ctx, dx, rowY, colDayW, slotH, classItem, dayData.name, slot.time);
        } else {
          ctx.save();
          ctx.fillStyle = "rgba(10, 18, 38, 0.6)";
          ctx.strokeStyle = "rgba(71, 85, 105, 0.5)";
          ctx.lineWidth = 1.5;
          if (ctx.setLineDash) ctx.setLineDash([8, 8]);
          drawCanvasRoundRect(ctx, dx, rowY, colDayW, slotH, 18);
          ctx.fill();
          ctx.stroke();
          if (ctx.setLineDash) ctx.setLineDash([]);
          ctx.textAlign = "center";
          ctx.font = "italic 16px sans-serif";
          ctx.fillStyle = "#64748B";
          ctx.fillText("Sin clase programada", dx + colDayW / 2, rowY + slotH / 2);
          ctx.restore();
        }
      }
    }
  });

  // 5. PIE DE PÁGINA INFORMATIVO
  const footerY = 1350;
  ctx.save();
  ctx.fillStyle = "rgba(8, 15, 34, 0.95)";
  ctx.strokeStyle = "rgba(229, 184, 75, 0.6)";
  ctx.lineWidth = 2;
  drawCanvasRoundRect(ctx, startX, footerY, totalTableW, 70, 16);
  ctx.fill();
  ctx.stroke();

  const phone = (window.SITE_CONFIG && window.SITE_CONFIG.contact && window.SITE_CONFIG.contact.whatsapp)
    ? window.SITE_CONFIG.contact.whatsapp
    : "55 1234 5678";

  ctx.font = "bold 20px sans-serif";
  ctx.fillStyle = "#22C55E";
  ctx.textAlign = "left";
  ctx.fillText("📲 INFORMES & RESERVACIONES WHATSAPP:", startX + 30, footerY + 43);

  ctx.font = "bold 22px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(phone, startX + 490, footerY + 43);

  ctx.textAlign = "right";
  ctx.font = "bold 18px sans-serif";
  ctx.fillStyle = "#FDE68A";
  ctx.fillText("📍 Casa de Cultura Neteotiloyan • San Martín de las Pirámides • ritmosalsero.com", startX + totalTableW - 30, footerY + 43);
  ctx.restore();
}

/**
 * Dibuja una tarjeta individual de clase en el Canvas de alta resolución
 */
function renderClassCardOnCanvas(ctx, x, y, width, height, classItem, dayName, timeStr) {
  ctx.save();

  // Paleta de alta distinción por tema
  const theme = classItem.theme || "blue";
  let bgGradStart = "#0E224E";
  let bgGradEnd = "#071126";
  let borderColor = "rgba(56, 189, 248, 0.8)";
  let badgeBg = "rgba(56, 189, 248, 0.25)";
  let badgeText = "#BAE6FD";
  let accentColor = "#38BDF8";

  if (theme === "emerald") {
    bgGradStart = "#0B2E1C";
    bgGradEnd = "#04170D";
    borderColor = "rgba(16, 185, 129, 0.85)";
    badgeBg = "rgba(16, 185, 129, 0.25)";
    badgeText = "#A7F3D0";
    accentColor = "#34D399";
  } else if (theme === "amber") {
    bgGradStart = "#321E06";
    bgGradEnd = "#170D02";
    borderColor = "rgba(245, 158, 11, 0.85)";
    badgeBg = "rgba(245, 158, 11, 0.25)";
    badgeText = "#FDE68A";
    accentColor = "#FBBF24";
  } else if (theme === "rose") {
    bgGradStart = "#330C19";
    bgGradEnd = "#17040B";
    borderColor = "rgba(244, 63, 94, 0.85)";
    badgeBg = "rgba(244, 63, 94, 0.25)";
    badgeText = "#FECDD3";
    accentColor = "#FB7185";
  } else if (theme === "purple") {
    bgGradStart = "#260C42";
    bgGradEnd = "#110420";
    borderColor = "rgba(168, 85, 247, 0.85)";
    badgeBg = "rgba(168, 85, 247, 0.25)";
    badgeText = "#E9D5FF";
    accentColor = "#C084FC";
  } else if (theme === "orange") {
    bgGradStart = "#3a1a05";
    bgGradEnd = "#1a0b02";
    borderColor = "rgba(249, 115, 22, 0.85)";
    badgeBg = "rgba(249, 115, 22, 0.25)";
    badgeText = "#FED7AA";
    accentColor = "#FB923C";
  } else if (theme === "cyan") {
    bgGradStart = "#082f3a";
    bgGradEnd = "#03151b";
    borderColor = "rgba(6, 182, 212, 0.85)";
    badgeBg = "rgba(6, 182, 212, 0.25)";
    badgeText = "#CFFAFE";
    accentColor = "#22D3EE";
  }

  // Fondo de la tarjeta
  const cardGrad = ctx.createLinearGradient(x, y, x + width, y + height);
  cardGrad.addColorStop(0, bgGradStart);
  cardGrad.addColorStop(1, bgGradEnd);
  ctx.fillStyle = cardGrad;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 2.5;
  drawCanvasRoundRect(ctx, x, y, width, height, 18);
  ctx.fill();
  ctx.stroke();

  // Badge de Nivel (Píldora superior)
  const badgeStr = classItem.badge || classItem.level || "Nivel Base";
  ctx.font = "bold 15px sans-serif";
  const badgeWidth = Math.min(width - 90, ctx.measureText(badgeStr.toUpperCase()).width + 24);

  ctx.fillStyle = badgeBg;
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 1;
  drawCanvasRoundRect(ctx, x + 20, y + 22, badgeWidth, 32, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = badgeText;
  ctx.textAlign = "left";
  ctx.fillText(badgeStr.toUpperCase(), x + 32, y + 43);

  // Icono en esquina derecha
  ctx.font = "28px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(classItem.icon || "💃", x + width - 24, y + 46);

  // Título de la disciplina
  ctx.textAlign = "left";
  ctx.font = "bold 34px serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(classItem.title || "Salsa", x + 22, y + 105);

  // Subtítulo de enfoque
  ctx.font = "bold 17px sans-serif";
  ctx.fillStyle = accentColor;
  const focusText = classItem.focus ? "Enfoque: " + classItem.focus : (classItem.level || "");
  ctx.fillText(focusText, x + 22, y + 138);

  // Línea divisoria fina
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x + 22, y + 158);
  ctx.lineTo(x + width - 22, y + 158);
  ctx.stroke();

  // Puntos clave de la clase (hasta 3)
  const points = (classItem.points && classItem.points.length > 0)
    ? classItem.points
    : ["Técnica y paso básico", "Musicalidad y ritmo", "Baile social en pareja"];

  ctx.font = "15px sans-serif";
  ctx.fillStyle = "#E2E8F0";
  let pointY = y + 195;
  points.slice(0, 3).forEach((pt) => {
    let line = pt;
    if (ctx.measureText(line).width > width - 60) {
      while (line.length > 10 && ctx.measureText(line + "…").width > width - 60) {
        line = line.slice(0, -1);
      }
      line += "…";
    }
    ctx.fillStyle = accentColor;
    ctx.fillText("•", x + 24, pointY);
    ctx.fillStyle = "#CBD5E1";
    ctx.fillText(line, x + 40, pointY);
    pointY += 34;
  });

  // Pie de la tarjeta: Día y Horario
  const cardFooterY = y + height - 26;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.beginPath();
  ctx.moveTo(x + 22, cardFooterY - 24);
  ctx.lineTo(x + width - 22, cardFooterY - 24);
  ctx.stroke();

  ctx.font = "bold 15px sans-serif";
  ctx.fillStyle = "#94A3B8";
  ctx.fillText(dayName, x + 24, cardFooterY);

  if (timeStr) {
    ctx.textAlign = "right";
    ctx.fillStyle = "#FDE68A";
    ctx.fillText("⏰ " + timeStr, x + width - 24, cardFooterY);
  }

  ctx.restore();
}

/**
 * Comprueba si una imagen cargada puede utilizarse en Canvas sin contaminarlo (tainting)
 */
function canUseImageWithoutTainting(img) {
  if (!img || !img.complete || img.naturalWidth === 0) return false;
  if (window.location.protocol === "file:") return false; // file:// siempre contamina el canvas en navegadores
  try {
    const testCanvas = document.createElement("canvas");
    testCanvas.width = 1;
    testCanvas.height = 1;
    const testCtx = testCanvas.getContext("2d");
    testCtx.drawImage(img, 0, 0, 1, 1);
    testCanvas.toDataURL("image/png");
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Convierte un DataURL (Base64) en un objeto Blob de manera sincrónica
 */
function dataURLtoBlob(dataurl) {
  try {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1] || "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } catch (e) {
    return null;
  }
}

/**
 * Dispara la descarga inmediata de un archivo mediante Blob o DataURL en el mismo tick del usuario
 */
function triggerSafeDownload(canvas, filename) {
  const filenameClean = filename || "Horario_Oficial_Ritmo_Salsero.png";
  let blob = null;
  try {
    const dataUrl = canvas.toDataURL("image/png");
    blob = dataURLtoBlob(dataUrl);
    if (!blob) {
      triggerDownloadLink(dataUrl, filenameClean);
      return;
    }
  } catch (e) {
    console.warn("toDataURL falló en exportación:", e);
    return;
  }

  if (blob && window.URL && window.URL.createObjectURL) {
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = blobUrl;
    a.download = filenameClean;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      if (a.parentNode) a.parentNode.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    }, 2000);
  } else {
    triggerDownloadLink(canvas.toDataURL("image/png"), filenameClean);
  }
}

function triggerDownloadLink(url, filename) {
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentNode) a.parentNode.removeChild(a);
  }, 2000);
}

/**
 * Función principal que genera y descarga la imagen web del horario en formato PNG de ultra alta resolución
 */
function downloadDynamicScheduleImage() {
  showToastNotification("🎨 Generando horario oficial en ultra alta resolución (2400×1550 px)...");

  const canvas = document.createElement("canvas");
  canvas.width = 2400;
  canvas.height = 1550;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    alert("Tu navegador no soporta la generación gráfica en Canvas.");
    return;
  }

  // Detectar si tenemos un logo en DOM que se pueda usar sin contaminar el canvas
  let safeLogoImg = null;
  const domLogo = document.getElementById("nav-logo") || document.getElementById("hero-logo") || document.getElementById("footer-logo");
  if (domLogo && canUseImageWithoutTainting(domLogo)) {
    safeLogoImg = domLogo;
  }

  try {
    renderScheduleCanvasContent(canvas, ctx, safeLogoImg);
    triggerSafeDownload(canvas, "Horario_Oficial_Ritmo_Salsero.png");
    showToastNotification("¡Horario oficial generado y descargado con éxito! 📥");
  } catch (err) {
    console.warn("Reintentando con lienzo puro 100% vectorial:", err);
    // Si hubo cualquier fallo de seguridad por origen, se crea un lienzo 100% fresco
    const freshCanvas = document.createElement("canvas");
    freshCanvas.width = 2400;
    freshCanvas.height = 1550;
    const freshCtx = freshCanvas.getContext("2d");
    renderScheduleCanvasContent(freshCanvas, freshCtx, null);
    triggerSafeDownload(freshCanvas, "Horario_Oficial_Ritmo_Salsero.png");
    showToastNotification("¡Horario oficial generado y descargado con éxito! 📥");
  }
}

// -------------------------------------------------------------
// FILTRADO DINÁMICO DE RITMOS Y NIVELES (PARRILLA Y MÓVIL)
// -------------------------------------------------------------

window.activeScheduleFilter = "all";

function normalizeFilterText(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function setScheduleLevelFilter(filterKey) {
  window.activeScheduleFilter = filterKey || "all";
  applyScheduleLevelFilter(filterKey);
}

function filterSchedule(filterKey) {
  setScheduleLevelFilter(filterKey);
}

function applyScheduleLevelFilter(key) {
  const currentKey = key || window.activeScheduleFilter || "all";
  window.activeScheduleFilter = currentKey;

  // Actualizar apariencia activa de los botones de filtro
  document.querySelectorAll(".schedule-filter-btn, .filter-btn").forEach(btn => {
    const btnKey = btn.getAttribute("data-filter") || "";
    if (btnKey === currentKey || (currentKey === "all" && btnKey === "all")) {
      btn.className = "schedule-filter-btn active text-xs font-bold px-3.5 py-1.5 rounded-xl border border-amber-400 bg-amber-400 text-slate-950 whitespace-nowrap transition-all shadow-md scale-105 cursor-pointer";
    } else {
      let customTheme = "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-amber-400/40 hover:text-white";
      if (btnKey === "principiante") customTheme = "border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400";
      if (btnKey === "intermedio") customTheme = "border-blue-500/40 bg-blue-950/40 text-blue-300 hover:bg-blue-500/20 hover:border-blue-400";
      if (btnKey === "multinivel") customTheme = "border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-500/20 hover:border-amber-400";
      btn.className = `schedule-filter-btn text-xs font-semibold px-3 py-1.5 rounded-xl border ${customTheme} whitespace-nowrap transition-all cursor-pointer hover:scale-105 active:scale-95`;
    }
  });

  const normKey = normalizeFilterText(currentKey);
  const isAll = !currentKey || currentKey === "all" || normKey === "all" || normKey === "todos";

  function checkMatch(title, level, badge, type, fullText) {
    if (isAll) return true;
    const combined = normalizeFilterText(`${title} ${level} ${badge} ${type} ${fullText}`);

    if (normKey === "principiante" || normKey === "basico" || normKey.includes("principiante") || normKey.includes("cero") || normKey.includes("basico")) {
      return combined.includes("principiante") || combined.includes("basico") || combined.includes("cero") || combined.includes("inicial");
    }
    if (normKey === "intermedio" || normKey.includes("intermedio")) {
      return combined.includes("intermedio");
    }
    if (normKey === "avanzado" || normKey.includes("avanzado")) {
      return combined.includes("avanzado") || combined.includes("master");
    }
    if (normKey === "multinivel" || normKey.includes("multinivel") || normKey.includes("todos")) {
      return combined.includes("todos") || combined.includes("multinivel") || combined.includes("social") || combined.includes("cumbia");
    }
    return combined.includes(normKey);
  }

  // 1. Filtrar en la tabla semanal (Parrilla)
  document.querySelectorAll(".schedule-cell").forEach(cell => {
    if (cell.getAttribute("data-class") === "descanso") {
      if (isAll) {
        cell.style.opacity = "1";
        cell.style.filter = "none";
      } else {
        cell.style.opacity = "0.12";
        cell.style.filter = "grayscale(100%)";
      }
      return;
    }

    const title = cell.getAttribute("data-title") || "";
    const level = cell.getAttribute("data-level") || "";
    const badge = cell.getAttribute("data-badge") || "";
    const type = cell.getAttribute("data-class") || "";
    const fullText = cell.innerText || "";

    const isMatch = checkMatch(title, level, badge, type, fullText);
    const card = cell.querySelector(".class-card");

    if (isMatch) {
      cell.style.opacity = "1";
      cell.style.filter = "none";
      cell.style.pointerEvents = "auto";
      if (card) {
        if (!isAll) {
          card.style.transform = "scale(1.03)";
          card.style.boxShadow = "0 0 25px rgba(245, 158, 11, 0.45)";
          card.style.borderColor = "#F59E0B";
        } else {
          card.style.transform = "";
          card.style.boxShadow = "";
          card.style.borderColor = "";
        }
      }
    } else {
      cell.style.opacity = "0.12";
      cell.style.filter = "grayscale(100%) blur(0.5px)";
      cell.style.pointerEvents = "none";
      if (card) {
        card.style.transform = "scale(0.97)";
        card.style.boxShadow = "none";
        card.style.borderColor = "";
      }
    }
  });

  // 2. Filtrar en tarjetas de vista por día (Móvil)
  let visibleMobileCount = 0;
  document.querySelectorAll(".mobile-class-card").forEach(card => {
    const title = card.getAttribute("data-title") || "";
    const level = card.getAttribute("data-level") || "";
    const badge = card.getAttribute("data-badge") || "";
    const type = card.getAttribute("data-class") || "";
    const fullText = card.innerText || "";

    const isMatch = checkMatch(title, level, badge, type, fullText);

    if (isMatch) {
      visibleMobileCount++;
      card.style.display = "flex";
      card.style.opacity = "1";
      card.style.filter = "none";
      if (!isAll) {
        card.style.boxShadow = "0 0 25px rgba(245, 158, 11, 0.35)";
        card.style.borderColor = "#F59E0B";
      } else {
        card.style.boxShadow = "";
        card.style.borderColor = "";
      }
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
      card.style.boxShadow = "";
    }
  });

  // Notificación amigable si no hay clases del nivel en el día móvil activo
  const emptyFilterMsg = document.getElementById("day-cards-filter-empty");
  const container = document.getElementById("day-cards-container");
  if (!isAll && visibleMobileCount === 0 && container && !container.innerText.includes("Descanso")) {
    if (!emptyFilterMsg) {
      const msgEl = document.createElement("div");
      msgEl.id = "day-cards-filter-empty";
      msgEl.className = "col-span-full p-6 text-center rounded-2xl border border-amber-500/30 bg-slate-900/80 shadow-lg";
      msgEl.innerHTML = `
        <span class="text-3xl block mb-2">🔍</span>
        <h4 class="font-bold text-white text-base">No hay clases de este nivel el día seleccionado</h4>
        <p class="text-xs text-slate-400 mt-1">Prueba seleccionando otro día en las pestañas superiores para encontrar tu clase ideal.</p>
      `;
      container.appendChild(msgEl);
    }
  } else if (emptyFilterMsg) {
    emptyFilterMsg.remove();
  }
}

// Exportar globalmente en window para acceso desde cualquier evento del DOM
window.setScheduleLevelFilter = setScheduleLevelFilter;
window.filterSchedule = setScheduleLevelFilter;
window.applyScheduleLevelFilter = applyScheduleLevelFilter;
window.applyCurrentScheduleFilter = applyScheduleLevelFilter;
window.downloadDynamicScheduleImage = downloadDynamicScheduleImage;
window.applySlotPreset = applySlotPreset;
window.selectSlotTheme = selectSlotTheme;
window.selectSlotIcon = selectSlotIcon;
window.handleCustomIconInput = handleCustomIconInput;
window.saveCurrentSlotAsRapido = saveCurrentSlotAsRapido;
window.toggleRapidosManager = toggleRapidosManager;
window.updateRapidoPresetField = updateRapidoPresetField;
window.deleteRapidoPreset = deleteRapidoPreset;
window.promptAddNewRapidoPreset = promptAddNewRapidoPreset;
window.resetRapidosPresetsToDefault = resetRapidosPresetsToDefault;
window.setSlotLevel = setSlotLevel;

function renderAllScheduleComponents() {
  renderScheduleTable();
  updateLiveTodayScheduleBanner();
  updateDetailsLegendUI();

  // Días de la semana para selección automática inteligente
  const dayKeys = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const todayNum = new Date().getDay();
  // Si hoy es lunes a viernes, activar el día de hoy; si es fin de semana, sugerir lunes
  const targetDay = (todayNum >= 1 && todayNum <= 5) ? dayKeys[todayNum] : 'lunes';

  // Añadir distintivo visual "(Hoy)" en el selector de días
  document.querySelectorAll(".day-tab-btn").forEach(btn => {
    const dKey = btn.getAttribute("data-day");
    const rawName = btn.getAttribute("data-original-name") || btn.innerText.replace("★", "").replace("Hoy", "").trim();
    btn.setAttribute("data-original-name", rawName);
    if (dKey === dayKeys[todayNum]) {
      btn.innerHTML = `<span>★ ${rawName}</span> <span class="text-[9px] uppercase font-black px-1.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-400/40 ml-1">Hoy</span>`;
    } else {
      btn.innerHTML = `<span>${rawName}</span>`;
    }
  });

  // Activar la pestaña y renderizar tarjetas del día objetivo
  if (typeof window.selectDayCard === 'function') {
    window.selectDayCard(targetDay);
  } else {
    renderMobileDayCards(targetDay);
  }

  // En versión móvil (< 768px), activar por defecto la vista vertical por días
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (isMobile && typeof window.switchScheduleView === 'function') {
    window.switchScheduleView('cards');
  }

  applyScheduleLevelFilter();
}

// Sincronización en tiempo real de horarios desde Firebase Firestore (Nube)
function initCloudScheduleSync() {
  if (typeof window === "undefined" || !window.RitmoFirebase) return;
  if (!window.RitmoFirebase.isConfigured()) return;

  window.RitmoFirebase.listenSchedule(function (cloudData) {
    if (cloudData && typeof cloudData === "object") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cloudData));
      } catch (e) {}
      currentSchedule = cloudData;
      renderAllScheduleComponents();
      if (typeof populateEditorFields === "function" && typeof activeEditorDay !== "undefined") {
        populateEditorFields(activeEditorDay);
      }
    }
  });
}

// Inicialización automática
document.addEventListener("DOMContentLoaded", () => {
  renderAllScheduleComponents();
  initCloudScheduleSync();
});
