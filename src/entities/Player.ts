import { GameEntity } from "../utils";

const INITIAL_SPEED = 0.75;

export default class Player extends GameEntity {
  private pos = {
    x: 80,
    y: this.game.height / 4,
  };

  private readonly acceleration = 0.5;
  private speed = INITIAL_SPEED;

  private didInput = false; // true when user inputs (click or tap or spacebar)

  render() {
    this.ctx.fillStyle = "red";

    if (this.didInput) {
      this.didInput = false;
      this.speed = -Math.max(Math.abs(this.speed), 5);
    }

    this.speed += this.acceleration;
    this.pos.y += this.speed;

    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }

  // public API

  public setInput() {
    this.didInput = true;
  }
  public reset() {
    this.speed = INITIAL_SPEED;
    this.didInput = false;
    this.pos.y = this.game.height / 4;
  }
  public get position(): { x: number; y: number } {
    return this.pos;
  }

  public readonly radius = 20;
}
