# 🚀 Manual de Publicación y Hosting en Internet — Ritmo Salsero

¡Felicidades! Tu sitio web de **Ritmo Salsero** está 100% listo para ser publicado en internet. Cuenta con diseño de alto impacto, adaptabilidad total para teléfonos celulares (responsive), panel de administración protegido con contraseña (`admin.html`) y un generador dinámico de imágenes para horarios en ultra alta resolución (2400×1550 px).

En esta guía encontrarás las mejores opciones para poner tu página en línea: desde **opciones 100% gratuitas** (sin pagar un solo centavo) hasta cómo conectar un **dominio propio** (por ejemplo, `ritmosalsero.com` o `ritmosalsero.mx`) a un costo muy bajo.

---

## 📋 Resumen de Opciones de Hospedaje Web (Hosting)

Al ser una página web moderna, ligera y optimizada (HTML5 + CSS + JavaScript puro), **NO necesitas pagar hosting caro ni bases de datos mensuales**. Puedes usar plataformas Jamstack de clase mundial:

| Plataforma | Costo Mensual | Nivel de Dificultad | Ventajas Clave |
| :--- | :--- | :--- | :--- |
| **🥇 Netlify (Recomendada)** | **$0 USD (100% Gratis)** | ⭐ Muy Fácil (Arrastrar y soltar) | No requiere código ni terminal. Subes la carpeta y en 15 segundos tu web está en vivo con HTTPS/SSL gratis. |
| **🥈 Cloudflare Pages** | **$0 USD (100% Gratis)** | ⭐⭐ Fácil | Ancho de banda ilimitado, velocidad extrema y protección contra caídas y ataques. |
| **🥉 Vercel** | **$0 USD (100% Gratis)** | ⭐⭐ Fácil | Ideal si manejas GitHub. Servidores CDN globales ultra veloces. |
| **GitHub Pages** | **$0 USD (100% Gratis)** | ⭐⭐ Fácil | Excelente si usas control de versiones Git/GitHub. |

---

## 🥇 Opción Recomendada: Netlify (Método "Arrastrar y Soltar" en 2 Minutos)

Netlify te ofrece un plan gratuito permanente que incluye:
- Certificado de seguridad **SSL (HTTPS)** gratuito (el candadito verde en el navegador).
- **100 GB al mes** de ancho de banda gratuito (suficiente para miles de visitas diarias).
- Red global de distribución (CDN), lo que hace que cargue de inmediato en San Martín de las Pirámides, CDMX o cualquier parte del mundo.

### Paso a paso para publicar:

1. **Crear tu cuenta gratuita:**
   - Entra a [https://www.netlify.com](https://www.netlify.com) y haz clic en **"Sign up"**.
   - Puedes registrarte con tu correo de Google, GitHub o correo personal.

2. **Subir tu proyecto:**
   - Una vez dentro del panel de control de Netlify, ve a la sección **"Sites"** (Sitios).
   - Verás un recuadro punteado que dice:
     > *"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"*.
   - Toma la carpeta completa de tu computadora llamada **`ritmo-salsero`** (la que contiene `index.html`, `admin.html`, la carpeta `assets`, etc.) y **arrástrala y suéltala** dentro de ese recuadro.

3. **¡Listo! Tu web está en línea:**
   - En aproximadamente 10 a 20 segundos, Netlify procesará los archivos y te entregará un enlace público inmediato, por ejemplo:
     `https://amazing-dance-12345.netlify.app`

4. **Personalizar el nombre del enlace gratuito:**
   - Dentro del panel de tu sitio en Netlify, ve a **Site configuration** > **Change site name**.
   - Puedes cambiarlo por algo como:
     `https://ritmosalsero.netlify.app` o `https://ritmo-salsero-piramides.netlify.app`.
   - Guarda los cambios y de inmediato estará disponible para compartirlo en tus redes sociales y WhatsApp.

---

## 🌐 ¿Cómo tener un Dominio Propio? (ej. `ritmosalsero.com` o `.com.mx`)

Si deseas que tu enlace sea completamente profesional y fácil de recordar, puedes comprar tu propio nombre de dominio.

### 1. ¿Cuánto cuesta un dominio?
- Un dominio `.com` cuesta aproximadamente **$9 a $11 USD al año** (unos **$170 a $220 pesos mexicanos al año**).
- No pagas mensualidad; solo se renueva una vez al año.

### 2. ¿Dónde comprarlo al mejor precio?
Evita intermediarios con precios engañosos que luego cobran el triple en la renovación. Recomendamos:
- **Cloudflare Registrar** ([cloudflare.com](https://www.cloudflare.com)): Vende dominios a precio de costo mayorista real, sin margen de ganancia ni cargos sorpresa, e incluye privacidad de datos (WHOIS Privacy) gratis de por vida.
- **Porkbun** ([porkbun.com]) o **Namecheap** ([namecheap.com]): Excelentes precios, interfaz amigable y soporte 24/7.
- Si prefieres un dominio con terminación nacional **`.mx`** o **`.com.mx`**, puedes usar **Akky.mx** o **Namecheap**.

### 3. Cómo conectarlo a Netlify:
1. En Netlify, entra a tu sitio y ve a **Domain management** > **Add a domain**.
2. Escribe tu dominio comprado (por ejemplo: `ritmosalsero.com`).
3. Netlify te dará 2 opciones:
   - **Opción DNS (Recomendada):** Te dará 2 registros (un registro `A` y un `CNAME`). Entras al panel donde compraste tu dominio y los pegas en la sección "DNS Records".
   - **Opción Nameservers de Netlify:** Copias los 4 servidores DNS que te da Netlify y los pegas en el registrador de tu dominio.
4. En cuestión de unos minutos (máximo unas horas por propagación DNS), Netlify activará automáticamente el candado de seguridad HTTPS (Let's Encrypt SSL) sin costo adicional.

---

## 🔄 ¿Cómo actualizar tu página en el futuro?

Cuando hagas cambios en tus archivos locales (fotos, nuevos estilos o código):
1. Entra a tu cuenta en [Netlify](https://app.netlify.com).
2. Haz clic en tu sitio **Ritmo Salsero**.
3. Ve a la pestaña **"Deploys"**.
4. Verás nuevamente el recuadro para arrastrar y soltar: arrastra tu carpeta `ritmo-salsero` actualizada y se actualizará instantáneamente en internet sin interrumpir el servicio.

---

## ⚙️ Uso del Panel de Administración (`admin.html`)

Tu sitio cuenta con un panel administrativo visual para que no tengas que editar código para los cambios del día a día:

1. **Acceso al Panel:**
   - Puedes entrar desde cualquier navegador abriendo:
     `https://tu-sitio.com/admin.html` (o desde el enlace discreto *"⚙️ Acceso a Administración"* en el pie de página de `index.html`).
2. **Contraseña Maestra Inicial:**
   - La contraseña predeterminada es: **`admin123`**
   - *Importante:* Puedes cambiarla en cualquier momento dentro de la pestaña **"🔐 Seguridad & Respaldos"**.
3. **¿Qué puedes gestionar desde el panel?**
   - **🌟 Encabezado & Hero:** Textos de bienvenida, slogan, llamadas a la acción (botones) y estadísticas.
   - **📢 Aviso Promocional:** Activa o desactiva la barra dorada superior con anuncios de nuevos cursos o promociones.
   - **📅 Horarios & Niveles:** Modifica los horarios, días, estilos de baile, instructores y activa/desactiva la leyenda *"Ver detalles"*.
   - **💳 Precios & Planes:** Cambia tarifas de clase suelta, mensualidad o plan parejas.
   - **📞 Contacto & Redes:** Cambia el número de WhatsApp, mensaje predeterminado, dirección física, enlace a Google Maps y redes sociales.
4. **Respaldos de Información (Exportar / Importar JSON):**
   - El panel guarda los cambios en el navegador local (`localStorage`).
   - Para transferir la configuración a otro dispositivo o guardar una copia segura de tu información, ve a **"Seguridad & Respaldos"** y haz clic en **"Descargar Copia de Seguridad (.json)"**.
   - En cualquier otra computadora o celular, puedes hacer clic en **"Restaurar desde Archivo (.json)"** y cargarás toda tu configuración en un segundo.

---

## 🖼️ Generación Dinámica de Horarios para Redes Sociales

- Ahora el botón **"Descarga Web"** (en la sección de horarios de `index.html` o desde el botón en `admin.html`) genera de manera automática una imagen en **Ultra Alta Resolución (2400 × 1550 px)** en formato PNG.
- Cada vez que modifiques un horario, instructor o nivel desde el editor, la imagen se adaptará automáticamente con tus nuevos datos, colores dorados de la academia, badges de nivel y logotipo.
- Ya no se requiere la versión antigua con fondo blanco; esta nueva imagen web oscura está lista para imprimirse como poster publicitario o publicarse en historias de Instagram, Facebook y estados de WhatsApp.

---

## 📱 Verificación en Dispositivos Móviles (Smartphones y Tablets)

Todo el sitio web y el panel de administración fueron testeados con diseño responsivo:
- **Menú hamburguesa táctil** para navegación en móviles.
- **Vista de horarios adaptada:** En celulares muestra pestañas deslizables por día de la semana con tarjetas individuales optimizadas para dedos.
- **Modales autoajustables:** Los cuadros de diálogo y editores cuentan con scroll vertical interno (`max-h-[90vh]`) para que nunca queden cortados en pantallas pequeñas.
- **Botón flotante de WhatsApp:** Con acceso directo con un solo toque desde cualquier teléfono.

---

¿Tienes alguna duda o deseas configurar algún servicio adicional (como Google Analytics, Meta Pixel o correo corporativo)? ¡Con gusto te apoyo paso a paso!
