type DOMHelpers<T = HTMLElement, U = (v: string) => DOMHelpers<T>> = {
  el: T;
  children: (c: (DOMHelpers | HTMLElement)[]) => DOMHelpers<T>;
  on: <K extends keyof HTMLElementEventMap>(
    t: K,
    h: (ev: HTMLVideoElementEventMap[K]) => void
  ) => DOMHelpers<T>;
  class: (...c: string[]) => DOMHelpers<T>;
  attr: (k: string, v: string) => DOMHelpers<T>;
  text: (v: string) => DOMHelpers<T>;
  id: U;
} & (T extends HTMLImageElement
  ? {
      src: U;
      alt: U;
    }
  : T extends HTMLAnchorElement
  ? {
      href: U;
      target: U;
    }
  : {});

const makeDOMHelpers = <T extends HTMLElement>(element: T) => {
  const helpers: DOMHelpers<HTMLElement> = {
    children: (nodes) => {
      element.childNodes.forEach((n) => n.remove());
      nodes.forEach((n) => {
        if (n instanceof HTMLElement) return element.appendChild(n);
        return element.appendChild(n.el);
      });
      return helpers;
    },
    on: (type, handler) => {
      element.addEventListener(type, handler as EventListener);
      return helpers;
    },
    class: (classes) => {
      element.classList.add(classes);
      return helpers;
    },
    attr: (key, value) => {
      element.setAttribute(key, value);
      return helpers;
    },
    text: (value) => {
      element.textContent = value;

      return helpers;
    },
    id: (value) => {
      element.id = value;
      return helpers;
    },
    el: element,
  };

  if (element instanceof HTMLImageElement) {
    type ImgHelpers = DOMHelpers<HTMLImageElement>;
    (helpers as ImgHelpers).src = (src) => {
      element.src = src;
      return helpers as ImgHelpers;
    };
    (helpers as ImgHelpers).alt = (alt) => {
      element.alt = alt;
      return helpers as ImgHelpers;
    };
  }
  if (element instanceof HTMLAnchorElement) {
    type AHelpers = DOMHelpers<HTMLAnchorElement>;
    (helpers as AHelpers).href = (href) => {
      element.href = href;
      return helpers as AHelpers;
    };
    (helpers as AHelpers).target = (target) => {
      element.target = target;
      return helpers as AHelpers;
    };
  }
  return helpers as DOMHelpers<T>;
};

export function el<K extends keyof HTMLElementTagNameMap>(tag: K) {
  const element = document.createElement(tag);
  return makeDOMHelpers(element);
}

el.from = makeDOMHelpers;
