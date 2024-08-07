import Rotation from "@/application/engine/lib/geometry/Rotation";
import Vector2 from "@/application/engine/lib/geometry/Vector2";
import Viewer2d from "../core/Viewers/Viewer2d";
import { IDrawable, TSpriteOptions } from "../Draw";

class Sprite implements IDrawable {
  #path: string;
  #columns: number;
  #rows: number;
  #count: number;
  #scale: number;
  offsetRotation: Rotation;

  #img: HTMLImageElement;
  #imgLoaded: Boolean;

  #current: number;

  constructor(path: string, options: TSpriteOptions = {}) {
    this.#path = path;
    this.#columns = options.columns || 1;
    this.#rows = options.rows || 1;
    this.#count = this.#rows * this.#columns || 1;
    this.#scale = options.scale || 1;
    this.offsetRotation = options.offsetRotation || new Rotation();
    this.#current = 0;

    this.#img = new Image();
    this.#imgLoaded = false;

    this.#loadImage();
  }

  get current() {
    return this.#current;
  }

  set current(position: number) {
    this.#current = position;
  }

  #loadImage() {
    this.#img.onload = () => {
      this.#imgLoaded = true;
    };
    this.#img.src = this.#path;
  }

  next(steps: number = 1) {
    this.#current += steps;
    if (this.#current > this.#count - 1) {
      this.#current = 0;
    }
  }

  prev(steps: number = 1) {
    this.#current -= steps;
    if (this.#current < 0) {
      this.#current = this.#count - 1;
    }
  }

  draw(
    viewer: Viewer2d,
    position: Vector2 = new Vector2(),
    rotation: Rotation = new Rotation()
  ) {
    let ctx = viewer.ctx;
    if (this.#imgLoaded) {
      let current = new Vector2(
        this.#current % this.#columns,
        Math.floor(this.#current / this.#columns)
      );

      let spriteWidth = this.#img.width / this.#columns;
      let spriteHeight = this.#img.height / this.#rows;
      let displayedWidth = spriteWidth * this.#scale;
      let displayedHeight = spriteHeight * this.#scale;

      ctx.save();
      ctx.translate(position.x, position.y);
      ctx.rotate(-rotation.sub(this.offsetRotation).angle);
      ctx.translate(-position.x, -position.y);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        this.#img,
        current.x * spriteWidth,
        current.y * spriteHeight,
        spriteWidth,
        spriteHeight,
        position.x - displayedWidth / 2,
        position.y - displayedHeight / 2,
        displayedWidth,
        displayedHeight
      );
      ctx.restore();
    }
  }
}

export default Sprite;
