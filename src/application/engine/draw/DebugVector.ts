import NumericUtils from "@/application/engine/lib/Numeric";
import Color from "@/application/engine/lib/Color";
import Rotation from "@/application/engine/lib/geometry/Rotation";
import Vector2 from "@/application/engine/lib/geometry/Vector2";
import Draw from "./Draw";
import Viewer2d from "../core/Viewers/Viewer2d";
import { IDrawable } from "../Draw";

class DebugVector implements IDrawable {
  #from: Vector2;
  #to: Vector2;
  #color: Color;
  #thickness: number;

  #frame: number = 0;

  constructor(
    from: Vector2 = new Vector2(),
    to: Vector2 = new Vector2(),
    color: Color = Color.Fuchsia,
    thickness: number = 5
  ) {
    this.#from = from;
    this.#to = to;
    this.#color = color;
    this.#thickness = thickness;
  }

  get from(): Vector2 {
    return this.#from;
  }
  get to(): Vector2 {
    return this.#to;
  }

  set from(from: Vector2) {
    this.#from = from;
  }
  set to(to: Vector2) {
    this.#to = to;
  }

  draw(viewer: Viewer2d) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.strokeStyle = this.#color._toString;
      ctx.lineWidth = this.#thickness;
      ctx.fillStyle = this.#color._toString;

      let arrowSize = NumericUtils.clamp(this.#thickness * 3, 10, 1000);
      if (Vector2.from(this.from).to(this.to).length <= arrowSize) {
        let color = this.#frame % 4 < 2 ? "#ff0000" : "#ffffff";
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
      }

      this.to.add(
        Vector2.from(this.from).to(this.to).normalized.multiply(-arrowSize)
      );
      let front = this.to
        .copy()
        .add(
          Vector2.from(this.from).to(this.to).normalized.multiply(arrowSize)
        );
      let frontDirection = Vector2.from(this.to).to(front).normalized;
      let arrowSides = Math.sin(Math.PI / 5) * arrowSize;

      let left = frontDirection
        .rotate(new Rotation(Math.PI / 2))
        .multiply(arrowSides)
        .add(this.to);
      let right = frontDirection
        .rotate(new Rotation(-Math.PI / 2))
        .multiply(arrowSides)
        .add(this.to);

      ctx.moveTo(this.from.x, this.from.y);
      ctx.lineTo(this.to.x, this.to.y);
      ctx.stroke();

      ctx.moveTo(front.x, front.y);
      ctx.lineTo(left.x, left.y);
      ctx.lineTo(right.x, right.y);
      ctx.lineTo(front.x, front.y);
      ctx.fill();

      return ["strokeStyle", "lineWidth", "fillStyle"];
    });
    this.#frame++;
  }
}

export default DebugVector;
