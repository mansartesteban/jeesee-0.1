import MediatorComponent from "../../../../application/engine/core/Components/MediatorComponent";
import CharacterBehaviour, { direction } from "./CharacterBehaviour";
import CharacterRenderer from "./CharacterRenderer";

class CharacterMediator extends MediatorComponent {
  characterRenderer?: CharacterRenderer;
  characterBehaviour?: CharacterBehaviour;

  constructor() {
    super();
  }

  addBehaviour(behaviour: CharacterBehaviour) {
    this.characterBehaviour = behaviour;
  }

  addRenderer(renderer: CharacterRenderer) {
    this.characterRenderer = renderer;
  }

  changeDirection(direction: direction) {
    if (this.characterRenderer) {
      this.characterRenderer.changeDirection(direction);
    }
  }

  animate() {
    if (this.characterRenderer) {
      this.characterRenderer.animate();
    }
  }
}

export default CharacterMediator;
