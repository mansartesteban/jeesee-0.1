import Project from "./Project";

class Engine2D {
  project?: Project;

  constructor() {
    this.loop();
  }

  setProject(project: Project) {
    this.project = project;
  }

  loop() {
    if (this.project) {
      this.project.scenes.forEach((scene) => scene.update());
    }

    window.requestAnimationFrame(this.loop.bind(this));
  }
}

export default Engine2D;
