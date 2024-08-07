import Viewer2d from "../core/Viewers/Viewer2d";
import Sprite from "./Sprite";

class SpriteSequence {
  sprite: Sprite;
  positions: number[];

  #current: number;

  constructor(sprite: Sprite, positions: number[]) {
    this.sprite = sprite;
    this.positions = positions;
    this.#current = 0;
    this.sprite.current = this.positions[this.current];
  }

  get current() {
    return this.#current;
  }

  set current(current: number) {
    this.#current = current;
    this.sprite.current = this.positions[this.current];
  }

  next() {
    this.current++;
    if (this.current >= this.positions.length) {
      this.current = 0;
    }
  }

  prev() {
    this.current--;
    if (this.current < 0) {
      this.current = this.positions.length - 1;
    }
  }

  draw(viewer: Viewer2d) {
    this.sprite.draw(viewer);
  }
}

export default SpriteSequence;
