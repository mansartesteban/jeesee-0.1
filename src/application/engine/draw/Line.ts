import Color from "@/application/engine/lib/Color";
import Vector2 from "@/application/engine/lib/geometry/Vector2";
import Draw from "./Draw";
import { IDrawable } from "../Draw";
import Viewer2d from "../core/Viewers/Viewer2d";

class Line implements IDrawable {
  #from: Vector2;
  #to: Vector2;
  #color: Color;
  #dashes: number[] | string[];
  #thickness: number;

  constructor(
    from: Vector2 = new Vector2(),
    to: Vector2 = new Vector2(),
    color: Color = new Color(),
    thickness: number = 1,
    dashes: number[] | string[] = []
  ) {
    this.#from = from;
    this.#to = to;
    this.#color = color;
    this.#dashes = dashes;
    this.#thickness = thickness;
  }

  get from() {
    return this.#from;
  }
  get to() {
    return this.#to;
  }
  get color() {
    return this.#color;
  }
  get dashes() {
    return this.#dashes;
  }
  get thickness() {
    return this.#thickness;
  }

  set from(from: Vector2) {
    this.#from = from;
  }
  set to(to: Vector2) {
    this.#to = to;
  }
  set color(color: Color) {
    this.#color = color;
  }
  set dashes(dashes: number[] | string[]) {
    this.#dashes = dashes;
  }
  set thickness(thickness: number) {
    this.#thickness = thickness;
  }

  draw(viewer: Viewer2d) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      const dashes = this.#dashes.map((dash: string | number) =>
        typeof dash === "string" ? parseInt(dash) : dash
      );
      ctx.setLineDash(dashes);
      ctx.strokeStyle = this.color._toString;
      ctx.lineWidth = this.thickness;

      ctx.moveTo(this.from.x, this.from.y);
      ctx.lineTo(this.to.x, this.to.y);
      ctx.stroke();

      return ["strokeStyle", "setLineDash", "lineWidth"];
    });
  }
}

export default Line;
