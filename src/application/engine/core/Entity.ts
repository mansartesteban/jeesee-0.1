import ArrayUtils from "@/application/engine/lib/Arrays";
import Component from "@/application/engine/core/Component";
import Scene from "@/application/engine/core/Scene";
import ImplementError from "../../error/ImplementError";

class Entity {
  components: Component[] = [];

  scene: Scene;

  constructor(scene: Scene, ...components: Component[]) {
    this.components = components;
    this.scene = scene;
    this.scene.addEntity(this);

    setTimeout(this.setup.bind(this), 0);
  }

  addComponent(component: Component) {
    this.components.push(component);
  }

  removeComponent(component: Component) {
    let foundComponent = this.components.findIndex(
      (entityComponent) => entityComponent == component
    );
    if (foundComponent !== -1) {
      this.components.splice(foundComponent, 1);
    }
  }

  removeComponents(componentType: { new (): Component }) {
    let foundIndexes = ArrayUtils.findIndexMultiple(
      this.components,
      (component: Component) => component instanceof componentType
    );
    if (foundIndexes) {
      ArrayUtils.removeMultiple(this.components, foundIndexes);
    }
  }

  getComponent(componentType: { new (): Component }) {
    return this.components.find((component) => {
      return component instanceof componentType;
    });
  }

  update() {
    this.updateEntity();
    this.components.forEach((component) => component.updateComponent(this));
  }

  setup() {
    throw new ImplementError("setup", "Entity");
  }
  updateEntity() {}

  delete() {
    // this.scene.removeEntity(this);
  }
}

export default Entity;
