
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = modal?.querySelector('.modal__close');
const scrim = modal?.querySelector('.modal__scrim');

function openModalFromTemplateId(id)
{
  const tpl = document.getElementById(id);
  if (!tpl || !modal || !modalContent) return false;

  modalContent.innerHTML = '';
  modalContent.appendChild(tpl.content.cloneNode(true));

  modal.hidden = false;                 // ensure not hidden
  modal.classList.add('is-open');       // show (display:grid)
  document.body.style.overflow = 'hidden';
  modal.setAttribute('aria-hidden', 'false');
  return true;
}

function closeModal()
{
  if (!modal || !modalContent) return;

  modal.classList.remove('is-open');    // hide (display:none)
  modal.hidden = true;
  modalContent.innerHTML = '';
  document.body.style.overflow = '';
  modal.setAttribute('aria-hidden', 'true');
  history.replaceState(null, '', location.pathname + location.search);
}

// click handler (progressive enhancement)
document.addEventListener('click', (e) =>
{
  const a = e.target.closest('a.card[data-target]');
  if (!a) return;

  if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

  const id = a.dataset.target;
  if (!id) return;

  const ok = openModalFromTemplateId(id);
  if (ok)
  {
    e.preventDefault();
    history.replaceState(null, '', `#p=${id.replace(/^tpl-/, '')}`);
  }
});

closeBtn?.addEventListener('click', closeModal);
scrim?.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

// deep-link support
window.addEventListener('DOMContentLoaded', () =>
{
  const m = location.hash.match(/^#p=([\w\-]+)/);
  if (m) openModalFromTemplateId(`tpl-${m[1]}`);
});
