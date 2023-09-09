import anime from "animejs";
import { el } from "../utils";

export default function createGameOverMenu({
  onReplayClick,
  score,
}: {
  score: number;
  onReplayClick: () => void;
}) {
  let didClickReplay = false;

  const gameOverMenuContent = el("div")
    .class("will-change-transform")
    .children([
      el("p").text(`SCORE: ${score}`),
      el("div").children([
        el("button")
          .text("REPLAY")
          .on("click", () => {
            // handle click only once
            if (didClickReplay) return;

            didClickReplay = true;

            anime({
              targets: gameOverMenu,
              opacity: 0,
              easing: "easeOutExpo",
              complete: () => onReplayClick(),
            });
          }),
      ]),
    ]);

  const gameOverMenu = el("div")
    .class("game-over-menu", "will-change-opacity", "will-change-transform")
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
      easing: "spring",
    },
    400
  );

  return gameOverMenu;
}
