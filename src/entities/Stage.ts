import { GameEntity, randomIntBetween } from "../utils";

type Pillar = {
  x: number;
  upperHeight: number;
  lowerHeight: number;
};

const INITIAL_PILLARS = [{ x: 600, lowerHeight: 50, upperHeight: 50 }];

export default class Stage extends GameEntity {
  readonly config = {
    gutter: 160, // distance between 2 pillars
    pillarWidth: 40,
  };

  currentPillars: Pillar[] = INITIAL_PILLARS;

  render(dt: number) {
    this.ctx.fillStyle = "white";
    this.ctx.fillStyle = "black";

    const newPillars: Pillar[] = [];

    const dx = Math.floor(dt / 2);

    this.currentPillars.forEach((p) => {
      const newX = p.x - dx;

      // if pillar is out of frame (to the left), dont include it
      if (newX < -this.config.pillarWidth) return;

      newPillars.push({
        ...p,
        x: newX,
      });
    });

    let nextPillarX = newPillars.length
      ? newPillars[newPillars.length - 1].x +
        this.config.pillarWidth +
        this.config.gutter
      : 0;

    while (nextPillarX < this.game.width) {
      const newPillar: Pillar = {
        x: nextPillarX,
        lowerHeight: randomIntBetween(100, 175),
        upperHeight: randomIntBetween(100, 175),
      };
      newPillars.push(newPillar);
      nextPillarX = newPillar.x + this.config.pillarWidth + this.config.gutter;
    }

    this.currentPillars = newPillars;

    this.ctx.fillStyle = "#444";

    for (const pillar of this.currentPillars) {
      this.ctx.fillRect(
        pillar.x,
        0,
        this.config.pillarWidth,
        pillar.upperHeight
      );
      this.ctx.fillRect(
        pillar.x,
        this.game.height - pillar.lowerHeight,
        this.config.pillarWidth,
        pillar.lowerHeight
      );
    }
  }

  // public API

  public didPlayerCollide(player: { x: number; y: number; radius: number }) {
    for (const pillar of this.currentPillars) {
      if (
        player.x + player.radius >= pillar.x &&
        player.x + player.radius < pillar.x + this.config.pillarWidth &&
        (player.y - player.radius <= pillar.upperHeight ||
          player.y + player.radius >= this.game.height - pillar.lowerHeight)
      )
        return true;
    }

    return false;
  }

  public reset() {
    this.currentPillars = INITIAL_PILLARS;
  }
}
