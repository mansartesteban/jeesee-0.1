import Observer from "../../commons/Observer";
import Project from "./Project";

enum Events {
  INITIALIZED = "INITIALIZED",
}

class Engine2D {
  project?: Project;

  observer: Observer;

  constructor() {
    this.observer = new Observer(Object.keys(Events));
    this.observer.$on(Events.INITIALIZED, this.loop.bind(this));
  }

  setProject(project: Project) {
    this.project = project;
    this.observer.$emit(Events.INITIALIZED);
  }

  loop() {
    if (this.project) {
      this.project.loop();
      this.project.scenes.forEach((scene) => scene.update());
    }

    window.requestAnimationFrame(this.loop.bind(this));
  }
}

export default Engine2D;
