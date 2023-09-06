import anime from "animejs";
import { el } from "./dom-utils";

export default function createGameOverMenu({
  onReplayClick,
  score,
}: {
  score: number;
  onReplayClick: () => void;
}) {
  let didClickReplay = false;

  const gameOverMenuContent = el("div").children([
    el("p").text(`SCORE: ${score}`),
    el("div").children([
      el("button")
        .text("REPLAY")
        .on("click", () => {
          // handle click only once
          if (didClickReplay) return;

          didClickReplay = true;

          const exitTimeline = anime.timeline({
            easing: "easeOutExpo",
          });

          exitTimeline.add({
            targets: [Array.from(gameOverMenuContent.el.children)],
            opacity: 0,
            scale: 1.5,
            delay: anime.stagger(200),
            complete: onReplayClick,
          });
          exitTimeline.add({
            targets: gameOverMenu,
            opacity: 0,
          });
        }),
    ]),
  ]);

  const gameOverMenu = el("div")
    .class("game-over-menu")
    .children([gameOverMenuContent]).el;

  const enterTimeline = anime.timeline({
    delay: 300,
  });

  enterTimeline.add({
    targets: gameOverMenu,
    opacity: [0, 1],
    easing: "easeOutExpo",
  });

  enterTimeline.add(
    {
      targets: gameOverMenuContent.el,
      translateY: [40, 0],
      scale: [0, 1],
      easing: "easeOutExpo",
      duration: 400,
    },
    400
  );

  return gameOverMenu;
}
