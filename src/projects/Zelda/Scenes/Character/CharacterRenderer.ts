import Img from "../../Assets/sprite7.png";
import Sprite from "../../../../application/engine/draw/Sprite";
import Viewer2d from "../../../../application/engine/core/Viewers/Viewer2d";
import Render2DComponent from "../../../../application/engine/core/Components/RenderComponent";
import Entity from "../../../../application/engine/core/Entity";
import SpriteSequence from "../../../../application/engine/draw/SpriteSequence";
import { direction } from "./CharacterBehaviour";
import CharacterMediator from "./CharacterMediator";

class CharacterRenderer extends Render2DComponent {
  viewer: Viewer2d;

  sprite?: Sprite;

  #activeSequence!: SpriteSequence;

  sequences: { [key: number]: SpriteSequence } = {};

  mediator: CharacterMediator;

  constructor(mediator: CharacterMediator, viewer: Viewer2d) {
    super();
    this.mediator = mediator;
    this.mediator.addRenderer(this);
    this.viewer = viewer;

    this.createSequences();
  }

  get activeSequence(): SpriteSequence {
    return this.#activeSequence;
  }

  set activeSequence(activeSequence: SpriteSequence) {
    this.#activeSequence = activeSequence;

    // This kind of thing which seems to be useless but is not :D
    this.#activeSequence.current = this.#activeSequence.current;
  }

  createSequences() {
    this.sprite = new Sprite(Img, {
      columns: 10,
      rows: 8,
      scale: 0.75,
    });

    this.sequences[direction.TOP] = new SpriteSequence(
      this.sprite,
      [60, 61, 62, 63, 64, 65, 66, 67, 68, 69]
    );
    this.sequences[direction.BOTTOM] = new SpriteSequence(
      this.sprite,
      [40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
    );
    this.sequences[direction.LEFT] = new SpriteSequence(
      this.sprite,
      [50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    );
    this.sequences[direction.RIGHT] = new SpriteSequence(
      this.sprite,
      [79, 78, 77, 76, 75, 74, 73, 72, 71, 70]
    );
    this.sequences[direction.STANDING] = new SpriteSequence(this.sprite, [0]);
    this.activeSequence = this.sequences[0];
  }

  changeDirection(direction: direction) {
    this.activeSequence = this.sequences[direction];
  }

  animate() {
    this.activeSequence.next();
  }

  render(entity: Entity) {
    this.activeSequence.draw(entity.scene.viewer);
  }
}

export default CharacterRenderer;
