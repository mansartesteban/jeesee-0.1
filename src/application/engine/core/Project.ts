import Observer from "../../commons/Observer";
import ImplementError from "../../error/ImplementError";
import Vector2 from "../lib/geometry/Vector2";
import Scene from "./Scene";
import Viewer2d from "./Viewers/Viewer2d";

enum Events {
  INITIALIZED = "INITIALIZED",
}
class Project {
  scenes: Scene[] = [];
  options: TProjectOptions = {
    name: "New project",
    engine: "2D",
  };

  viewer: Viewer2d;

  loopCallback?: Function;

  observer: Observer;

  constructor(options?: TProjectOptions) {
    this.options = { ...this.options, ...options };

    this.viewer = this.createViewer();
    this.observer = new Observer(Object.keys(Events));
    setTimeout(this.setup.bind(this), 0);
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

  loop() {}
}

export default Project;
