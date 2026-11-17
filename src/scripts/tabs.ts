import { gsap } from 'gsap';

/**
 * Accessible tabs with a GSAP crossfade.
 * Markup: [data-tabs="horizontal|vertical"] containing [role=tab] buttons and [role=tabpanel] panels.
 */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

export function initTabs(root: HTMLElement) {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const vertical = root.dataset.tabs === 'vertical';

  const select = (next: HTMLButtonElement, focus = false) => {
    const current = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    if (focus) next.focus();
    if (current === next) return;

    const currentPanel = current ? document.getElementById(current.getAttribute('aria-controls') ?? '') : null;
    const nextPanel = document.getElementById(next.getAttribute('aria-controls') ?? '');
    if (!nextPanel) return;

    tabs.forEach((t) => {
      const on = t === next;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });

    if (currentPanel) {
      gsap.killTweensOf([currentPanel, nextPanel]);
      currentPanel.hidden = true;
      gsap.set(currentPanel, { clearProps: 'opacity,transform' });
    }
    nextPanel.hidden = false;

    if (reduce.matches) return;
    gsap.fromTo(
      nextPanel,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', clearProps: 'transform' }
    );
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
      const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
      let target: HTMLButtonElement | undefined;
      if (e.key === nextKey || (vertical && e.key === 'ArrowRight')) target = tabs[(i + 1) % tabs.length];
      else if (e.key === prevKey || (vertical && e.key === 'ArrowLeft')) target = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') target = tabs[0];
      else if (e.key === 'End') target = tabs[tabs.length - 1];
      if (target) {
        e.preventDefault();
        select(target, true);
      }
    });
  });
}

document.querySelectorAll<HTMLElement>('[data-tabs]').forEach(initTabs);
