import Engine2D from "./engine/core/Engine2D";
import Project from "./engine/core/Project";

class Application {
  static activeProject: Project;
  static engine: Engine2D;

  static start() {
    // loadui
    // loadstore
    // - loadLastproject
    this.engine = new Engine2D();

    return new Promise((resolve) => {
      resolve(true);
    });
  }

  static loadProject(project: typeof Project) {
    this.activeProject = new project();
    this.engine.setProject(this.activeProject);
  }
}

export default Application;
