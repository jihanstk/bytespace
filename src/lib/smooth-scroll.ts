import type Lenis from "lenis";

let instance: Lenis | null = null;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

/** Scrolls to an element, going through Lenis when smooth scrolling is active. */
export function scrollToElement(element: HTMLElement, offset = 0) {
  if (instance) {
    instance.scrollTo(element, { offset });
    return;
  }
  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top });
}
