export abstract class GameEntity {
  abstract render(dt: number): void;

  constructor(
    protected readonly ctx: CanvasRenderingContext2D,
    public game: { width: number; height: number }
  ) {}
}

export const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * min + max - min);


// DOM utils

type DOMHelpers<T = HTMLElement> = {
  el: T;
  children: (c: (DOMHelpers | HTMLElement)[]) => DOMHelpers<T>;
  on: <K extends keyof HTMLElementEventMap>(
    t: K,
    h: (ev: HTMLVideoElementEventMap[K]) => void
  ) => DOMHelpers<T>;
  class: (...c: string[]) => DOMHelpers<T>;
  attr: (k: string, v: string) => DOMHelpers<T>;
  text: (v: string) => DOMHelpers<T>;
};

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
    el: element,
  };
  return helpers as DOMHelpers<T>;
};

export function el<K extends keyof HTMLElementTagNameMap>(tag: K) {
  const element = document.createElement(tag);
  return makeDOMHelpers(element);
}

el.from = makeDOMHelpers;
