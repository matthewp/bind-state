export function createTemplate(str) {
  let el = document.createElement('template');
  el.innerHTML = str;
  return el;
};

export function mount(template) {
  let frag = document.importNode(template.content, true);
  host.innerHTML = '';
  host.appendChild(frag);
};

export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
};