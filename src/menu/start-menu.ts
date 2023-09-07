import { el } from "./dom-utils";
import anime from "animejs";

export default function createStartMenu({
  onStartClick,
}: {
  onStartClick: () => void;
}) {
  const startMenuContent = el("div")
    .class("will-change-transform")
    .children([
      el("button")
        .text("PLAY")
        .on("click", async () => {
          anime({
            targets: startMenu,
            opacity: 0,
            easing: "easeOutExpo",
            duration: 250,
            complete() {
              onStartClick();
              startMenu.remove();
            },
          });
        }),
    ]);

  const startMenu = el("div")
    .class("start-menu", "will-change-transform", "will-change-opacity")
    .children([startMenuContent]).el;

  const enterTimeline = anime.timeline();

  enterTimeline.add({
    targets: startMenu,
    scale: [0.5, 1],
    easing: "spring",
  });

  enterTimeline.add(
    {
      targets: startMenuContent.el,
      translateY: [40, 0],
      scale: [0, 1],
      easing: "easeOutExpo",
    },
    300
  );

  return startMenu;
}
