const banner = document.querySelector('.banner');
const toggle = banner.querySelector('.banner__toggle');
const links = [...banner.querySelectorAll('.banner__links a')];

const setOpen = (open) => {
  banner.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.textContent = open ? 'close' : 'menu';
};

// Banner drops in once the hero has scrolled nearly out of view
new IntersectionObserver(([entry]) => {
  banner.classList.toggle('is-visible', !entry.isIntersecting);
  if (entry.isIntersecting) setOpen(false);
}, { rootMargin: '-120px 0px 0px 0px' }).observe(document.querySelector('.hero'));

// Narrow screens: menu button opens the link panel
toggle.addEventListener('click', () => setOpen(!banner.classList.contains('is-open')));
links.forEach((link) => link.addEventListener('click', () => setOpen(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && banner.classList.contains('is-open')) {
    setOpen(false);
    toggle.focus();
  }
});

// Underline the link for the section in the middle of the screen
const spy = new IntersectionObserver((entries) => {
  entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
    links.forEach((link) => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach((link) => spy.observe(document.querySelector(link.hash)));

// Hold the hero video still for people who ask for less motion
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelector('.hero video').pause();
}

// The form has no backend yet, so say that instead of pretending to send
document.querySelector('#consultation-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.querySelector('.form-status').textContent = 'This form is not connected yet, so nothing was sent.';
});
