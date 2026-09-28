/**
 * RITMO SALSERO - SINCRONIZACIÓN EN TIEMPO REAL CON FIREBASE FIRESTORE
 * 
 * Permite que los cambios guardados desde el Panel de Administración (PC o celular)
 * se sincronicen en milisegundos en todos los teléfonos y computadoras del mundo,
 * sin necesidad de hacer "git push" ni reconstruir el sitio web.
 * 
 * Si no está configurado o el usuario está fuera de línea, el sitio web
 * opera automáticamente con la copia local (localStorage y site_config.json).
 */

(function (window) {
  // Configuración predeterminada de Firebase (obtenida de la consola de Firebase)
  // Puedes pegar tus credenciales aquí o directamente desde la pestaña "Nube (Firebase)" en admin.html
  var DEFAULT_FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

  var STORAGE_KEY_FIREBASE = "ritmo_firebase_config";
  var _db = null;
  var _initAttempted = false;

  function getStoredFirebaseConfig() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY_FIREBASE);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.projectId && parsed.apiKey && parsed.projectId.trim() !== "") {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("[Ritmo Firebase] No se pudo leer configuración local:", e);
    }
    return DEFAULT_FIREBASE_CONFIG;
  }

  function isConfigValid(cfg) {
    if (!cfg) return false;
    var pid = (cfg.projectId || "").trim();
    var key = (cfg.apiKey || "").trim();
    if (!pid || !key) return false;
    if (pid.indexOf("TU_PROJECT_ID") !== -1 || key.indexOf("TU_API_KEY") !== -1) return false;
    return true;
  }

  function initFirestore() {
    if (_db) return _db;
    if (typeof firebase === "undefined" || !firebase.firestore) {
      // Firebase SDK aún no está cargado
      return null;
    }

    var cfg = getStoredFirebaseConfig();
    if (!isConfigValid(cfg)) {
      return null;
    }

    try {
      var app;
      if (!firebase.apps || firebase.apps.length === 0) {
        app = firebase.initializeApp(cfg);
      } else {
        app = firebase.app();
      }
      _db = firebase.firestore(app);
      window.firebaseDb = _db;
      return _db;
    } catch (err) {
      console.error("[Ritmo Firebase] Error al inicializar Firestore:", err);
      return null;
    }
  }

  // Objeto global accesible en todo el sitio
  window.RitmoFirebase = {
    getConfig: function () {
      return getStoredFirebaseConfig();
    },

    isConfigured: function () {
      return isConfigValid(getStoredFirebaseConfig());
    },

    getDb: function () {
      return initFirestore();
    },

    saveCustomConfig: function (newConfig) {
      try {
        if (!newConfig || !newConfig.projectId || !newConfig.apiKey) {
          throw new Error("Debe proporcionar al menos projectId y apiKey.");
        }
        localStorage.setItem(STORAGE_KEY_FIREBASE, JSON.stringify(newConfig));
        _db = null; // Reiniciar instancia
        return initFirestore();
      } catch (e) {
        console.error("[Ritmo Firebase] Error guardando configuración:", e);
        throw e;
      }
    },

    clearCustomConfig: function () {
      try {
        localStorage.removeItem(STORAGE_KEY_FIREBASE);
        _db = null;
      } catch (e) {}
    },

    // Guardar configuración general del sitio en Firestore
    saveSiteConfigToCloud: async function (siteConfigData) {
      var db = initFirestore();
      if (!db) return false;
      try {
        var toSave = Object.assign({}, siteConfigData);
        toSave._updatedAt = Date.now();
        await db.collection("ritmo_salsero").doc("site_config").set(toSave, { merge: true });
        console.log("[Ritmo Firebase] site_config sincronizado con éxito en la nube.");
        return true;
      } catch (e) {
        console.error("[Ritmo Firebase] Fallo al sincronizar site_config:", e);
        return false;
      }
    },

    // Guardar horarios semanales en Firestore
    saveScheduleToCloud: async function (scheduleData) {
      var db = initFirestore();
      if (!db) return false;
      try {
        var toSave = Object.assign({}, scheduleData);
        toSave._updatedAt = Date.now();
        await db.collection("ritmo_salsero").doc("schedule").set(toSave, { merge: true });
        console.log("[Ritmo Firebase] schedule sincronizado con éxito en la nube.");
        return true;
      } catch (e) {
        console.error("[Ritmo Firebase] Fallo al sincronizar schedule:", e);
        return false;
      }
    },

    // Escuchar cambios en tiempo real de site_config (para index.html y admin.html)
    listenSiteConfig: function (callback) {
      var db = initFirestore();
      if (!db) return null;
      try {
        return db.collection("ritmo_salsero").doc("site_config").onSnapshot(function (docSnap) {
          if (docSnap && docSnap.exists) {
            var data = docSnap.data();
            if (data && typeof callback === "function") {
              callback(data);
            }
          }
        }, function (err) {
          console.warn("[Ritmo Firebase] Aviso en listener de site_config:", err.message);
        });
      } catch (e) {
        console.warn("[Ritmo Firebase] No se pudo crear listener de site_config:", e);
        return null;
      }
    },

    // Escuchar cambios en tiempo real de horarios
    listenSchedule: function (callback) {
      var db = initFirestore();
      if (!db) return null;
      try {
        return db.collection("ritmo_salsero").doc("schedule").onSnapshot(function (docSnap) {
          if (docSnap && docSnap.exists) {
            var data = docSnap.data();
            if (data && typeof callback === "function") {
              callback(data);
            }
          }
        }, function (err) {
          console.warn("[Ritmo Firebase] Aviso en listener de schedule:", err.message);
        });
      } catch (e) {
        console.warn("[Ritmo Firebase] No se pudo crear listener de schedule:", e);
        return null;
      }
    },

    // Cargar una vez desde Firestore (útil al iniciar admin.html en un dispositivo nuevo)
    fetchSiteConfigOnce: async function () {
      var db = initFirestore();
      if (!db) return null;
      try {
        var docSnap = await db.collection("ritmo_salsero").doc("site_config").get();
        if (docSnap.exists) {
          return docSnap.data();
        }
      } catch (e) {
        console.warn("[Ritmo Firebase] Error al descargar site_config:", e);
      }
      return null;
    },

    fetchScheduleOnce: async function () {
      var db = initFirestore();
      if (!db) return null;
      try {
        var docSnap = await db.collection("ritmo_salsero").doc("schedule").get();
        if (docSnap.exists) {
          return docSnap.data();
        }
      } catch (e) {
        console.warn("[Ritmo Firebase] Error al descargar schedule:", e);
      }
      return null;
    }
  };

  // Intentar inicializar de inmediato si el SDK ya se encuentra en el navegador
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", function () {
        initFirestore();
      });
    } else {
      initFirestore();
    }
  }
})(window);
