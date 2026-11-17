import { gsap } from 'gsap';

/**
 * Page-load choreography only. No scroll-driven animation by design.
 * Elements start hidden via the `.motion` class (set in <head> only when
 * reduced motion is not requested), so no-JS and reduced-motion users see everything.
 */
const root = document.documentElement;

if (root.classList.contains('motion')) {
  const q = (sel: string) => Array.from(document.querySelectorAll<HTMLElement | SVGElement>(sel));

  const targets = {
    strip: q('[data-strip] > span'),
    header: q('[data-reveal-header]'),
    lines: q('.hero [data-reveal-line]'),
    meta: q('.hero__meta'),
    copy: q('.hero__lede, .hero__ctas'),
    ticks: q('[data-dial-ticks]'),
    center: q('[data-dial-center]'),
    arcs: q('[data-dial-arc]'),
    labels: q('[data-dial-label]'),
    loop: q('[data-dial-loop]'),
    caption: q('.dial__caption'),
    partners: q('.hero__partners'),
  };

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      // Hand control back to CSS (hover states rely on stylesheet values).
      root.classList.remove('motion');
      gsap.set(Object.values(targets).flat(), { clearProps: 'all' });
    },
  });

  tl.fromTo(targets.strip, { scaleX: 0 }, { scaleX: 1, duration: 0.45, stagger: 0.06, ease: 'power2.inOut' })
    .fromTo(targets.header, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.25')
    .fromTo(targets.lines, { yPercent: 105 }, { yPercent: 0, duration: 0.85, stagger: 0.08, ease: 'power4.out' }, '-=0.3')
    .fromTo(targets.meta, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '<')
    .fromTo(targets.copy, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 }, '-=0.55')
    // Dial: ticks + symbol, then each lifecycle arc draws in order
    .fromTo(targets.ticks, { opacity: 0 }, { opacity: 1, duration: 0.45 }, '-=0.8')
    .fromTo(targets.center, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power4.out' }, '<')
    .fromTo(
      targets.arcs,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 0.36, stagger: 0.22, ease: 'power2.inOut' },
      '-=0.35'
    )
    .fromTo(targets.labels, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.22 }, '<+0.12')
    .fromTo(targets.loop, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.3 }, '-=0.1')
    .fromTo(targets.caption, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '<')
    .fromTo(targets.partners, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.9');
}
