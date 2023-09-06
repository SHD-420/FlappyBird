import { GameEntity } from "../utils";

export default class Background extends GameEntity {
  render(): void {
    this.ctx.fillStyle = "#222224";
    this.ctx.fillRect(0, 0, this.game.width, this.game.height);
  }
}
