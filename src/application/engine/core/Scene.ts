import Entity from "@/application/engine/core/Entity";
import Viewer2d from "./Viewers/Viewer2d";

class Scene {
  entities: Entity[];
  viewer: Viewer2d;
  initialized: Boolean = false;

  name: String = "";

  constructor(name: string, viewer: Viewer2d) {
    this.name = name;
    this.viewer = viewer;
    this.entities = [];
    this.initialized = true;
  }

  isInitilized() {
    if (!this.initialized) {
      throw "Scene class has not been initialized";
    }
  }

  addEntity(entity: Entity) {
    this.isInitilized();
    this.entities.push(entity);
  }

  removeEntity(entityToDelete: Entity) {
    this.isInitilized();
    const foundIndex = this.entities.findIndex(
      (entity) => entity === entityToDelete
    );
    if (foundIndex) {
      this.entities.splice(foundIndex, 1);
    }
  }

  update() {
    this.isInitilized();
    this.viewer.refresh();
    this.entities.forEach((entity) => entity.update());
  }
}

export default Scene;
