import Color from "../../lib/Color";
import Vector2 from "../../lib/geometry/Vector2";
import IViewer from "./Viewer";

class Viewer2d implements IViewer {
  size: Vector2;
  color: Color;
  #ctx?: CanvasRenderingContext2D;

  constructor(options?: TViewer2dOptions) {
    this.size = options?.size || new Vector2();
    this.color = options?.color || Color.Black;
  }

  get ctx(): CanvasRenderingContext2D {
    if (!this.#ctx) {
      throw new Error("No CanvasRenderingContext2D existing");
    }
    return this.#ctx;
  }

  set ctx(ctx: CanvasRenderingContext2D) {
    this.#ctx = ctx;
  }

  render(node: Element) {
    const canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Unable to get context '2d' from canvas, aborting !");
    }

    this.ctx = ctx;

    canvas.width = this.size.x;
    canvas.height = this.size.y;

    this.ctx.translate(this.size.x / 2, this.size.y / 2);
    this.ctx.fillStyle = this.color._toString;
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);

    node.append(canvas);
  }
  refresh() {
    this.ctx.fillStyle = this.color._toString;
    this.ctx.fillRect(
      -this.size.x / 2,
      -this.size.y / 2,
      this.size.x,
      this.size.y
    );
  }
}

export default Viewer2d;
