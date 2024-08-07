// class CharacterBehaviourMappingInput {
//     Inputs.map(Preference.moveForwardKey, CharacterBehaviour.moveForward)
//     Inputs.map(Preference.moveForwardKey, CharacterBehaviour.moveForward)
//     Inputs.map(Preference.moveForwardKey, CharacterBehaviour.moveForward)
//     Inputs.map(Preference.moveForwardKey, CharacterBehaviour.moveForward)
// }

import Component from "../../../../application/engine/core/Component";
import CharacterMediator from "./CharacterMediator";

export enum direction {
  STANDING,
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}
class CharacterBehaviour extends Component {
  mediator: CharacterMediator;
  constructor(mediator: CharacterMediator) {
    super();
    this.mediator = mediator;
    this.mediator.addBehaviour(this);
  }

  moveTop() {
    this.mediator.changeDirection(direction.TOP);
  }

  moveBottom() {
    this.mediator.changeDirection(direction.BOTTOM);
  }

  moveLeft() {
    this.mediator.changeDirection(direction.LEFT);
  }

  moveRight() {
    this.mediator.changeDirection(direction.RIGHT);
  }

  standing() {
    this.mediator.changeDirection(direction.STANDING);
  }
}

export default CharacterBehaviour;
