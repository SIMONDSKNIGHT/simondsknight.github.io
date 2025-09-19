// /assets/js/projects.js
(() => {
  'use strict';

  // Run after DOM is ready (safe with <script defer> too)
  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  ready(() => {
    const modal        = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const closeBtn     = document.querySelector('.modal__close');
    const scrim        = document.querySelector('.modal__scrim');

    if (!modal || !modalContent) {
      console.warn('projects.js: Missing #modal or #modal-content in the DOM.');
      return;
    }

    let lastFocused = null;

    const lockScroll = (lock) => {
      document.body.style.overflow = lock ? 'hidden' : '';
    };

    const focusTrap = (enable) => {
      if (!enable) return;
      // Focus first focusable element, fallback to close button
      const focusable = modal.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0] || closeBtn || modal;
      first.focus();
    };

    const getTplIdFromHash = () => {
      // supports #p=slug
      const hash = location.hash.startsWith('#') ? location.hash.slice(1) : location.hash;
      const params = new URLSearchParams(hash);
      const p = params.get('p');
      return p ? `tpl-${decodeURIComponent(p)}` : null;
    };

    const setHashForTpl = (tplId) => {
      const pid = tplId.replace(/^tpl-/, '');
      history.replaceState(null, '', `#p=${encodeURIComponent(pid)}`);
    };

    const clearHash = () => {
      history.replaceState(null, '', location.pathname + location.search);
    };

    const openModalFromTemplateId = (tplId) => {
      const tpl = document.getElementById(tplId);
      if (!tpl || !('content' in tpl)) {
        console.warn('projects.js: Template not found/unsupported:', tplId);
        return;
      }

      // Save focus to restore on close
      lastFocused = document.activeElement;

      // Inject content
      modalContent.innerHTML = '';
      modalContent.appendChild(tpl.content.cloneNode(true));

      // Show modal
      modal.hidden = false;
      lockScroll(true);
      focusTrap(true);
    };

    const closeModal = () => {
      modal.hidden = true;
      modalContent.innerHTML = '';
      lockScroll(false);
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    };

    // Click on cards opens modal (event delegation)
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.card[data-target]');
      if (!card) return;

      // only intercept primary click without modifiers
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      const tplId = card.dataset.target;
      if (!tplId) return;

      openModalFromTemplateId(tplId);
      setHashForTpl(tplId);
    });

    // Close interactions
    closeBtn?.addEventListener('click', () => { closeModal(); clearHash(); });
    scrim?.addEventListener('click', (e) => {
      // Close only when clicking the scrim background itself
      if (e.target === scrim) { closeModal(); clearHash(); }
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) { closeModal(); clearHash(); }
    });

    // Back/forward navigation mirrors modal state
    window.addEventListener('popstate', () => {
      const tplId = getTplIdFromHash();
      if (tplId) {
        openModalFromTemplateId(tplId);
      } else {
        closeModal();
      }
    });

    // Open from initial hash (deep link)
    const initialTplId = getTplIdFromHash();
    if (initialTplId) openModalFromTemplateId(initialTplId);
  });
})();
