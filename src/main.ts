import Background from "./entities/Background";
import Player from "./entities/Player";
import Stage from "./entities/Stage";
import createGameOverMenu from "./menu/game-over-menu";
import createStartMenu from "./menu/start-menu";

import "./style.css";

class Game {
  private readonly canvas = document.createElement("canvas");

  // declare game entities
  private readonly backgroud: Background;
  private readonly stage: Stage;
  private readonly player: Player;

  constructor(private readonly container: Element) {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("Error trying to get canvas context!");

    this.canvas.width = Math.min(window.innerWidth, 768);
    this.canvas.height = 500;

    // initialize entities
    const gameData = {
      width: this.canvas.width,
      height: this.canvas.height,
    };

    this.backgroud = new Background(ctx, gameData);
    this.stage = new Stage(ctx, gameData);
    this.player = new Player(ctx, gameData);

    // handle screen resize
    window.addEventListener("resize", () => {
      const newGameWidth = Math.min(window.innerWidth, 768);

      // update the canvas on window resize
      this.canvas.width = newGameWidth;

      // update game width for each entity on window resize
      this.stage.game.width = newGameWidth;
      this.backgroud.game.width = newGameWidth;
    });

    // attach start menu and game to DOM
    this.container.appendChild(
      createStartMenu({
        onStartClick: () => this.start(),
      })
    );

    this.container.appendChild(this.canvas);
  }

  /**
   * Render each frame
   */
  private animate(time: number, lastTime?: number) {
    const dt = time - (lastTime ?? time);

    this.backgroud.render();
    this.stage.render(dt);
    this.player.render();

    // check if player collided
    if (
      this.player.position.y + this.player.radius >= this.canvas.height ||
      this.stage.didPlayerCollide({
        ...this.player.position,
        radius: this.player.radius,
      })
    ) {
      this.container.appendChild(
        createGameOverMenu({
          onReplayClick: () => this.reset(),
        })
      );
      return;
    }

    requestAnimationFrame((newTime) => this.animate(newTime, time));
  }

  /**
   * Start game animation
   */
  private start() {
    window.addEventListener("click", () => {
      this.player.setInput();
    });

    requestAnimationFrame(this.animate.bind(this));
  }

  private reset() {
    this.stage.reset();
    this.player.reset();
    this.start();
  }
}

const app = document.querySelector("#app");

if (!app) throw new Error("Element with selector #app not found!");

new Game(app);
