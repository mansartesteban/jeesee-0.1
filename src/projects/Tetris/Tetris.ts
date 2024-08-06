import Project from "@/application/engine/core/Project";
import Character from "./Scenes/Character/Character";
import Scene from "../../application/engine/core/Scene";

class Tetris extends Project {
  options: TProjectOptions = {
    name: "Tetris",
    engine: "2d",
  };

  constructor() {
    super();
  }

  setup() {
    this.addScene(new Scene("main", this.viewer));
    let character = new Character(this.getScene("main"));
  }
}

export default Tetris;
