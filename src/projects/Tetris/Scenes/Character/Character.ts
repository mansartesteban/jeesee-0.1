import Entity from "../../../../application/engine/core/Entity";
import CharacterRenderer from "./CharacterRenderer";

class Character extends Entity {
  // implement behaviour
  // implement render
  // implement rigidBody
  setup() {
    this.addComponent(new CharacterRenderer(this.scene.viewer));
  }
}

export default Character;
