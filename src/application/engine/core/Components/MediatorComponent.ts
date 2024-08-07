import Component from "../Component";

class MediatorComponent {
  components: Component[];

  constructor(...components: Component[]) {
    this.components = components;
  }
}

export default MediatorComponent;
