const body = document.body;
const btn  = document.querySelector('.power');

btn.addEventListener('click', () => {
  const on = body.dataset.on === 'true';
  body.dataset.on = (!on).toString();
  btn.setAttribute('aria-pressed', (!on).toString());
  // TODO: fetch('/api/lamp', { method: 'POST', body: JSON.stringify({ on: !on }) })
});
