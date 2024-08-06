import Img from "@/projects/Tetris/Assets/sprite6.png";
import Sprite from "../../../../application/engine/draw/Sprite";
import Viewer2d from "../../../../application/engine/core/Viewers/Viewer2d";
import Render2DComponent from "../../../../application/engine/core/Components/RenderComponent";
import Entity from "../../../../application/engine/core/Entity";

class CharacterRenderer extends Render2DComponent {
  viewer: Viewer2d;

  sprite: Sprite;
  time = 0;

  constructor(viewer: Viewer2d) {
    super();
    this.viewer = viewer;
    this.sprite = new Sprite(Img, {
      columns: 30,
      rows: 8,
      scale: 3,
      count: 240,
    });
  }

  render(entity: Entity) {
    if (this.time % 6 === 0) {
      this.sprite.next();
    }
    this.sprite.draw(entity.scene.viewer);
    this.time++;
  }
}

export default CharacterRenderer;
