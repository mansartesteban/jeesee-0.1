import Component from "../../../../application/engine/core/Component";
import Entity from "../../../../application/engine/core/Entity";
import Scene from "../../../../application/engine/core/Scene";
import CharacterBehaviour, { direction } from "./CharacterBehaviour";
import CharacterMediator from "./CharacterMediator";
import CharacterRenderer from "./CharacterRenderer";
class Character extends Entity {
  // implement behaviour
  // implement render
  // implement rigidBody
  mediator?: CharacterMediator;
  i = 0;
  setup() {
    let mediator = new CharacterMediator();
    let behaviour = new CharacterBehaviour(mediator);
    let renderer = new CharacterRenderer(mediator, this.scene.viewer);
    this.addComponent(renderer);
    this.addComponent(behaviour);

    this.mediator = mediator;

    document.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        this.mediator?.changeDirection(direction.TOP);
      }

      if (e.key === "s") {
        this.mediator?.changeDirection(direction.BOTTOM);
      }

      if (e.key === "q") {
        this.mediator?.changeDirection(direction.LEFT);
      }

      if (e.key === "d") {
        this.mediator?.changeDirection(direction.RIGHT);
      }
    });
    document.addEventListener("keyup", (e) => {
      this.mediator?.changeDirection(direction.STANDING);
    });
    this.mediator.changeDirection(direction.LEFT);
  }

  updateEntity() {
    this.i++;
    if (this.i % 10 === 0) {
      this.mediator?.animate();
    }
  }
}

export default Character;
