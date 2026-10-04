/* Gestión de consentimiento (cookies y contenido externo) */
(function () {
  var KEY = 'consent-v1';
  var MAX_AGE = 1000 * 60 * 60 * 24 * 365; // se vuelve a preguntar a los 12 meses

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && typeof v.maps === 'boolean' && v.t && Date.now() - v.t < MAX_AGE) return v;
    } catch (e) {}
    return null;
  }
  function save(maps) {
    try { localStorage.setItem(KEY, JSON.stringify({ maps: !!maps, t: Date.now() })); } catch (e) {}
  }

  /* ---------- Mapas: solo se cargan con consentimiento ---------- */
  function renderMaps() {
    var c = read();
    var allowed = c && c.maps;
    var boxes = document.querySelectorAll('[data-map]');
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      box.innerHTML = '';
      if (allowed) {
        var f = document.createElement('iframe');
        f.src = box.getAttribute('data-src');
        f.title = box.getAttribute('data-title') || 'Mapa';
        f.loading = 'lazy';
        f.referrerPolicy = 'no-referrer-when-downgrade';
        f.setAttribute('allowfullscreen', '');
        box.appendChild(f);
      } else {
        var p = document.createElement('div');
        p.className = 'map-placeholder';
        p.innerHTML =
          '<p>El mapa de Google necesita tu consentimiento para cargarse.</p>' +
          '<button type="button" class="cc-btn cc-primary" data-load-map>Cargar mapa</button> ' +
          '<a class="cc-link" href="' + (box.getAttribute('data-link') || '#') + '" target="_blank" rel="noopener">Abrir en Google Maps</a>';
        box.appendChild(p);
      }
    }
  }

  /* ---------- Banner ---------- */
  var banner;
  function closeBanner() { if (banner) { banner.remove(); banner = null; } }

  function openBanner(showPrefs) {
    if (banner) return;
    var c = read();
    banner = document.createElement('div');
    banner.className = 'cc-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-label', 'Gestionar consentimiento');
    banner.innerHTML =
      '<h2 class="cc-title">Gestionar consentimiento</h2>' +
      '<p class="cc-text">Para ofrecer las mejores experiencias, utilizamos tecnolog&iacute;as como las cookies para almacenar y/o acceder a la informaci&oacute;n del dispositivo. El consentimiento de estas tecnolog&iacute;as nos permitir&aacute; mostrar contenido externo, como el mapa de Google. No consentir o retirar el consentimiento puede afectar negativamente a ciertas caracter&iacute;sticas y funciones.</p>' +
      '<div class="cc-prefs" hidden>' +
        '<label class="cc-row"><input type="checkbox" checked disabled> <span><b>Necesarias</b><br><small>Guardan tu elecci&oacute;n sobre cookies. Siempre activas.</small></span></label>' +
        '<label class="cc-row"><input type="checkbox" id="cc-maps"' + (c && c.maps ? ' checked' : '') + '> <span><b>Contenido externo (Google Maps)</b><br><small>Muestra el mapa de la zona de atenci&oacute;n. Google puede instalar cookies.</small></span></label>' +
        '<button type="button" class="cc-btn cc-primary" data-cc="save">Guardar preferencias</button>' +
      '</div>' +
      '<div class="cc-actions">' +
        '<button type="button" class="cc-btn cc-primary" data-cc="accept">Aceptar</button>' +
        '<button type="button" class="cc-btn cc-ghost" data-cc="deny">Denegar</button>' +
        '<button type="button" class="cc-btn cc-text-btn" data-cc="prefs">Ver preferencias</button>' +
      '</div>' +
      '<p class="cc-links"><a href="politica-cookies.html">Pol&iacute;tica de cookies</a> &middot; <a href="aviso-legal.html#privacidad">Pol&iacute;tica de privacidad</a> &middot; <a href="aviso-legal.html">Aviso legal</a></p>';
    document.body.appendChild(banner);
    if (showPrefs) togglePrefs(true);
    banner.querySelector('.cc-btn').focus();
  }

  function togglePrefs(force) {
    if (!banner) return;
    var box = banner.querySelector('.cc-prefs');
    var show = typeof force === 'boolean' ? force : box.hasAttribute('hidden');
    if (show) box.removeAttribute('hidden'); else box.setAttribute('hidden', '');
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-cc],[data-load-map],[data-cookie-prefs]') : null;
    if (!t) return;
    if (t.hasAttribute('data-cookie-prefs')) { e.preventDefault(); openBanner(true); return; }
    if (t.hasAttribute('data-load-map')) { save(true); renderMaps(); return; }
    var a = t.getAttribute('data-cc');
    if (a === 'accept') { save(true); closeBanner(); renderMaps(); }
    else if (a === 'deny') { save(false); closeBanner(); renderMaps(); }
    else if (a === 'prefs') { togglePrefs(); }
    else if (a === 'save') {
      var m = banner.querySelector('#cc-maps');
      save(m && m.checked); closeBanner(); renderMaps();
    }
  });

  function init() {
    renderMaps();
    if (!read()) openBanner(false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
