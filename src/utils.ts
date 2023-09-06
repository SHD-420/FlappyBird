export abstract class GameEntity {
  abstract render(dt: number): void;
  
  constructor(
    protected readonly ctx: CanvasRenderingContext2D,
    public game: { width: number; height: number }
  ) {}
}

export const randomIntBetween = (min: number, max: number) =>
  Math.floor(Math.random() * min + max - min);
