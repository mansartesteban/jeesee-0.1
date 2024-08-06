import Color from "@/application/engine/lib/Color";
import Rotation from "@/application/engine/lib/geometry/Rotation";
import Vector2 from "@/application/engine/lib/geometry/Vector2";
import Draw from "./Draw";
import { IDrawable } from "../Draw";
import Viewer2d from "../core/Viewers/Viewer2d";

class CircleScreen implements IDrawable {
  #position: Vector2;
  #radius: number;
  #color: Color;
  #angle: Rotation;
  #direction: Vector2;

  constructor(
    position: Vector2 = new Vector2(),
    radius: number = 1,
    color: Color = new Color(),
    angle: Rotation = new Rotation(Math.PI * 2, true),
    direction: Vector2 = new Vector2()
  ) {
    this.#position = position;
    this.#radius = radius;
    this.#color = color;
    this.#angle = angle;
    this.#direction = direction;
  }

  get position() {
    return this.#position;
  }

  get radius() {
    return this.#radius;
  }

  get color() {
    return this.#color;
  }

  get angle() {
    return this.#angle;
  }

  get direction() {
    return this.#direction;
  }

  set position(position: Vector2) {
    this.#position = position;
  }
  set radius(radius: number) {
    this.#radius = radius;
  }
  set color(color: Color) {
    this.#color = color;
  }
  set angle(angle: Rotation) {
    this.#angle = angle;
  }
  set direction(direction: Vector2) {
    this.#direction = direction;
  }

  draw(viewer: Viewer2d) {
    let ctx = viewer.ctx;
    Draw.draw(viewer, () => {
      ctx.fillStyle = this.#color._toString;

      let positionOnScreen = this.#position;

      ctx.arc(
        positionOnScreen.x,
        positionOnScreen.y,
        this.#radius,
        this.#direction.rotation.angle - this.#angle.angle / 2,
        this.#direction.rotation.angle + this.#angle.angle / 2
      );
      if (this.#angle.angle % (2 * Math.PI) !== 0) {
        ctx.lineTo(positionOnScreen.x, positionOnScreen.y);
      }

      ctx.fill();
      return ["fillStyle"];
    });
  }
}

export default CircleScreen;
