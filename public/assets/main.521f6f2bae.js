(function () {
  'use strict';
  var cfgEl = document.getElementById('cfg');
  var cfg = cfgEl ? JSON.parse(cfgEl.textContent) : {};
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // Menú móvil
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) toggle.click();
    });
  }
  document.querySelectorAll('.has-sub > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      if (!li.contains(e.target) && window.innerWidth > 1040) {
        li.classList.remove('open');
        li.querySelector('button').setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Analítica (solo con ID configurado y consentimiento)
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }
  function loadGA() {
    if (!cfg.gaId || window.gtag) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.gaId;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', cfg.gaId, { anonymize_ip: true });
  }
  if (cfg.gaId) {
    var consent = store.get('ward-consent');
    if (consent === 'yes') loadGA();
    else if (!consent) {
      var banner = document.getElementById('cookie-notice');
      if (banner) {
        banner.classList.add('show');
        banner.addEventListener('click', function (e) {
          var v = e.target.getAttribute('data-consent');
          if (!v) return;
          store.set('ward-consent', v);
          banner.classList.remove('show');
          if (v === 'yes') loadGA();
        });
      }
    }
  }

  // Conversiones: clics en WhatsApp, teléfono y correo
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href.indexOf('wa.me') > -1) track('contact_whatsapp', { location: a.dataset.loc || 'link' });
    else if (href.indexOf('tel:') === 0) track('contact_phone', { location: a.dataset.loc || 'link' });
    else if (href.indexOf('mailto:') === 0) track('contact_email', { location: a.dataset.loc || 'link' });
  });

  // Sugerencia de idioma según el navegador (sin redirigir: es mejor para SEO)
  var suggest = document.getElementById('lang-notice');
  if (suggest && cfg.alternates && !store.get('ward-lang-dismissed')) {
    var prefs = (navigator.languages || [navigator.language || '']).map(function (l) { return (l || '').slice(0, 2).toLowerCase(); });
    var current = cfg.lang;
    var best = null;
    for (var i = 0; i < prefs.length; i++) {
      if (prefs[i] === current) break;
      if (cfg.alternates[prefs[i]]) { best = prefs[i]; break; }
    }
    if (best && cfg.langSuggest[best]) {
      var t = cfg.langSuggest[best];
      suggest.querySelector('p').textContent = t.text;
      var go = suggest.querySelector('[data-go]');
      go.textContent = t.go;
      go.setAttribute('href', cfg.alternates[best]);
      go.setAttribute('hreflang', best);
      suggest.querySelector('[data-dismiss]').textContent = t.dismiss;
      suggest.setAttribute('lang', best);
      suggest.classList.add('show');
      suggest.querySelector('[data-dismiss]').addEventListener('click', function () {
        store.set('ward-lang-dismissed', '1');
        suggest.classList.remove('show');
      });
    }
  }

  // Formulario de contacto
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.website && form.website.value) return; // honeypot
      if (!form.reportValidity()) return;
      var d = new FormData(form);
      var areaSel = form.area;
      var areaText = areaSel && areaSel.selectedIndex > 0 ? areaSel.options[areaSel.selectedIndex].text : '';
      var details = [
        cfg.labels.name + ': ' + d.get('name'),
        cfg.labels.email + ': ' + d.get('email'),
        d.get('phone') ? cfg.labels.phone + ': ' + d.get('phone') : '',
        d.get('country') ? cfg.labels.country + ': ' + d.get('country') : '',
        areaText ? cfg.labels.area + ': ' + areaText : '',
      ].filter(Boolean).join('\n');
      var text = [cfg.waMessage, details, d.get('message')].join('\n\n');
      track('generate_lead', { method: cfg.formEndpoint ? 'form' : 'whatsapp_form', area: d.get('area') || '' });

      if (cfg.formEndpoint) {
        var btn = form.querySelector('button[type=submit]');
        var label = btn.textContent;
        btn.disabled = true;
        btn.textContent = cfg.labels.sending;
        d.append('_subject', 'Consulta web — ' + d.get('name'));
        d.append('lang', cfg.lang);
        fetch(cfg.formEndpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
          .then(function (r) {
            if (!r.ok) throw new Error(r.status);
            form.reset();
            status.className = 'form-status ok';
            status.textContent = cfg.labels.ok;
          })
          .catch(function () {
            status.className = 'form-status err';
            status.textContent = cfg.labels.error;
          })
          .then(function () { btn.disabled = false; btn.textContent = label; });
      } else {
        window.open('https://wa.me/' + cfg.wa + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
      }
    });
  }
})();
