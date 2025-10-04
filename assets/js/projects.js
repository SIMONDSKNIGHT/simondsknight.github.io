// assets/js/projects.js

const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = modal?.querySelector('.modal__close');
const scrim = modal?.querySelector('.modal__scrim');

// open modal from a template id; return true on success
function openModalFromTemplateId(id)
{
  const tpl = document.getElementById(id);
  if (!tpl || !modal || !modalContent) return false;

  modalContent.innerHTML = '';
  modalContent.appendChild(tpl.content.cloneNode(true));

  // reveal then animate
  modal.hidden = false;
  // force a frame so transitions can run
  requestAnimationFrame(() => {
    modal.classList.add('is-open');
  });

  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');
  return true;
}

function closeModal()
{
  if (!modal || !modalContent) return;

  // start fade out
  modal.classList.remove('is-open');

  // after transition completes, actually hide + cleanup
  const done = () => {
    modal.removeEventListener('transitionend', done);
    modal.hidden = true;
    modalContent.innerHTML = '';
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
    history.replaceState(null, '', location.pathname + location.search);
  };

  // fallback timeout in case transitionend doesn’t fire
  modal.addEventListener('transitionend', done, { once: true });
  setTimeout(done, 240);
}

function clearHash()
{
  history.replaceState(null, '', location.pathname + location.search);
}

// click handler: try modal; if anything fails, let the link navigate normally
document.addEventListener('click', (e) => {
  const a = e.target.closest('a.card[data-target]');
  if (!a) return;

  // modified clicks/new tab/external? let browser do it
  if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const id = a.dataset.target;
  if (!id) return;

  // prevent navigation only if we successfully opened the modal
  const ok = openModalFromTemplateId(id);
  if (ok) {
    e.preventDefault();
    history.replaceState(null, '', `#p=${id.replace(/^tpl-/, '')}`);
  }
});

closeBtn?.addEventListener('click', closeModal);
scrim?.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// deep-link support: /projects/#p=slug
window.addEventListener('DOMContentLoaded', () => {
  const m = location.hash.match(/^#p=([\w\-]+)/);
  if (m) openModalFromTemplateId(`tpl-${m[1]}`);
});
