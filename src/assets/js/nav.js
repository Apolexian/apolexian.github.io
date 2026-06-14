// Scroll reveal — progressive enhancement only.
// Content is visible by default (see .js .reveal in CSS); JS just animates it in.
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll('.reveal, .reveal-stagger');

if (!prefersReduced && 'IntersectionObserver' in window) {
  // Hide now, animate in as they enter
  targets.forEach((el) => el.classList.add('will-reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}
