import { el } from "./dom-utils";

export default function createStartMenu({
  onStartClick,
}: {
  onStartClick: () => void;
}) {
  const startMenu = el("div")
    .class("start-menu")
    .children([
      el("button")
        .text("Start")
        .on("click", () => {
          onStartClick();
          startMenu.remove();
        }),
    ]).el;

  return startMenu;
}
