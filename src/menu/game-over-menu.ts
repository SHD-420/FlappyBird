import { el } from "./dom-utils";

export default function createGameOverMenu({
    onReplayClick,
  }: {
    onReplayClick: () => void;
  }) {
    const gameOverMenu = el("div")
      .class("start-menu")
      .children([
        el("button")
          .text("Replay")
          .on("click", () => {
            onReplayClick();
            gameOverMenu.remove();
          }),
      ]).el;
  
    return gameOverMenu;
  }
  