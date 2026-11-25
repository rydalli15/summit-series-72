const filters = document.querySelector('.filters');
const buttons = [...filters.querySelectorAll('button')];
const records = [...document.querySelectorAll('article[data-theme]')];
const links = [...document.querySelectorAll('.moment')];
const count = document.querySelector('.count');

function applyFilter(theme) {
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === theme)));
  [...records, ...links].forEach(item => {
    item.hidden = theme !== 'All records' && item.dataset.theme !== theme;
  });
  const visible = records.filter(record => !record.hidden).length;
  count.textContent = visible + (visible === 1 ? ' record' : ' records');
}

function syncLocation() {
  const selected = records.find(record => '#' + record.id === location.hash);
  if (selected?.hidden) applyFilter('All records');
  links.forEach(link => {
    if (link.hash === location.hash) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

buttons.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
window.addEventListener('hashchange', syncLocation);
filters.hidden = false;
syncLocation();
