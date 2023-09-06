import anime from "animejs";
import { el } from "./dom-utils";

export default function createScoreBoard() {
  const scoreBoardContent = el("p");

  const scoreBoard = el("div")
    .class("score-board")
    .children([scoreBoardContent]);

  const updatableScoreBoard = scoreBoard.el as HTMLDivElement & {
    update: (newVal: number) => void;
    hide: () => void
  };
  updatableScoreBoard.update = (newVal) => {
    scoreBoardContent.text(`${newVal}`);
  };

  updatableScoreBoard.hide = () => {
    anime({
      targets: updatableScoreBoard,
      scale: 0,
      complete: () => {
        scoreBoard.attr("style", "");
        updatableScoreBoard.remove();
      },
    });
  };


  return updatableScoreBoard;
}
