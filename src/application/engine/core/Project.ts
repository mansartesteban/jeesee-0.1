import ImplementError from "../../error/ImplementError";
import Vector2 from "../lib/geometry/Vector2";
import Scene from "./Scene";
import Viewer2d from "./Viewers/Viewer2d";

class Project {
  scenes: Scene[] = [];
  options: TProjectOptions = {
    name: "New project",
    engine: "2D",
  };

  viewer: Viewer2d;

  constructor(options?: TProjectOptions) {
    this.options = { ...this.options, ...options };

    this.viewer = this.createViewer();
    this.setup();
  }

  createViewer() {
    let viewer = new Viewer2d({
      size: new Vector2(window.innerWidth, window.innerHeight),
    });
    let app = document.querySelector("#app");
    if (app) {
      viewer.render(app);
    }
    return viewer;
  }

  addScene(scene: Scene) {
    this.scenes.push(scene);
  }

  getScene(sceneName: String): Scene {
    let foundScene = this.scenes.find(
      (scene: Scene) => scene.name === sceneName
    );
    if (!foundScene) {
      throw new Error(`Scene with the name "${sceneName} was not found"`);
    }
    return foundScene;
  }

  setup() {
    throw new ImplementError("setup", "Project");
  }
}

export default Project;
