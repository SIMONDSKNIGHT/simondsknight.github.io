const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.modal__close');
const scrim = document.querySelector('.modal__scrim');

function openModalFromTemplateId(id){
  const tpl = document.getElementById(id);
  if (!tpl) return;
  modalContent.innerHTML = "";
  modalContent.appendChild(tpl.content.cloneNode(true));
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.hidden = true;
  modalContent.innerHTML = "";
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
  const card = e.target.closest('.card[data-target]');
  if (!card) return;
  e.preventDefault();
  const id = card.dataset.target;
  openModalFromTemplateId(id);
  history.replaceState(null, "", `#p=${id.replace(/^tpl-/, '')}`);
});
closeBtn?.addEventListener('click', () => { closeModal(); clearHash(); });
scrim?.addEventListener('click', () => { closeModal(); clearHash(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeModal(); clearHash(); }});

function clearHash(){ history.replaceState(null, "", location.pathname + location.search); }
window.addEventListener('DOMContentLoaded', () => {
  const m = location.hash.match(/^#p=([\w\-]+)/);
  if (m) openModalFromTemplateId(`tpl-${m[1]}`);
});
