const body = document.body;
const powerBtn = document.querySelector('.power');
const brightnessBtn = document.querySelector('.brightness');
const slider = document.querySelector('.slider');
const fill = document.querySelector('.slider-fill');

powerBtn.addEventListener('click', () => {
  const on = body.dataset.on === 'true';
  body.dataset.on = (!on).toString();
  powerBtn.setAttribute('aria-pressed', (!on).toString());
  // TODO: fetch('/api/lamp', { method: 'POST', body: JSON.stringify({ on: !on }) })
});

brightnessBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const open = slider.dataset.open === 'true';
  slider.dataset.open = (!open).toString();
  slider.setAttribute('aria-hidden', open.toString());
});

document.addEventListener('click', (e) => {
  if (slider.dataset.open !== 'true') return;
  if (slider.contains(e.target) || brightnessBtn.contains(e.target)) return;
  slider.dataset.open = 'false';
  slider.setAttribute('aria-hidden', 'true');
});

let dragId = null;

function setLevelFromY(clientY) {
  const rect = slider.getBoundingClientRect();
  const inset = 6;
  const top = rect.top + inset;
  const bottom = rect.bottom - inset;
  const inner = bottom - top;
  const y = Math.max(top, Math.min(bottom, clientY));
  const level = (bottom - y) / inner;
  fill.style.setProperty('--level', level);
  // TODO: fetch('/api/lamp', { method: 'POST', body: JSON.stringify({ brightness: level }) })
}

slider.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  dragId = e.pointerId;
  slider.setPointerCapture(dragId);
  setLevelFromY(e.clientY);
});

slider.addEventListener('pointermove', (e) => {
  if (e.pointerId !== dragId) return;
  setLevelFromY(e.clientY);
});

slider.addEventListener('pointerup', (e) => {
  if (e.pointerId !== dragId) return;
  slider.releasePointerCapture(dragId);
  dragId = null;
});
