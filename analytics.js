(function () {
  'use strict';

  function sendEvent(name, parameters) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, parameters || {});
    }
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) {
      sendEvent('contact_click', { method: 'email', link_url: href });
    } else if (href.indexOf('line.me/') !== -1) {
      sendEvent('contact_click', { method: 'line', link_url: href });
    } else if (link.classList.contains('button') && href.indexOf('#') === 0) {
      sendEvent('cta_click', { cta_text: link.textContent.trim(), destination: href });
    }
  });
})();
