(function () {
  'use strict';

  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panel = document.querySelector('.tool-screen');
  if (!tabs.length || !panel) return;

  panel.id = panel.id || 'feature-panel';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');

  tabs.forEach(function (tab, index) {
    tab.id = tab.id || 'feature-tab-' + (index + 1);
    tab.setAttribute('aria-controls', panel.id);
    tab.setAttribute('tabindex', tab.getAttribute('aria-selected') === 'true' ? '0' : '-1');
  });

  function focusTab(index) {
    var next = tabs[(index + tabs.length) % tabs.length];
    next.click();
    tabs.forEach(function (tab) {
      tab.setAttribute('tabindex', tab === next ? '0' : '-1');
    });
    panel.setAttribute('aria-labelledby', next.id);
    next.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (item) {
        item.setAttribute('tabindex', item === tab ? '0' : '-1');
      });
      panel.setAttribute('aria-labelledby', tab.id);
    });
    tab.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        focusTab(index + 1);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        focusTab(index - 1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        focusTab(0);
      } else if (event.key === 'End') {
        event.preventDefault();
        focusTab(tabs.length - 1);
      }
    });
  });

  var activeTab = tabs.find(function (tab) {
    return tab.getAttribute('aria-selected') === 'true';
  });
  if (activeTab) panel.setAttribute('aria-labelledby', activeTab.id);
})();
