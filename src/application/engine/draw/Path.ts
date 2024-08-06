import Viewer2d from "../core/Viewers/Viewer2d";
import { IDrawable } from "../Draw";
import Vector2 from "../lib/geometry/Vector2";

class Path implements IDrawable {
  checkpoints: Path[] = [];

  save() {}

  back(count: number) {}

  draw(viewer: Viewer2d) {
    let ctx = viewer.ctx;
  }
}

export default Path;
