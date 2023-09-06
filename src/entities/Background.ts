import { GameEntity } from "../utils";

export default class Background extends GameEntity {
  render(): void {
    this.ctx.clearRect(0, 0, this.game.width, this.game.height);
  }
}
