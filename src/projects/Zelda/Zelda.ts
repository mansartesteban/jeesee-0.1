import Project from "@/application/engine/core/Project";
import Character from "./Scenes/Character/Character";
import Scene from "../../application/engine/core/Scene";
import Inputs from "../../application/engine/Inputs";

class Zelda extends Project {
  options: TProjectOptions = {
    name: "Zelda",
    engine: "2d",
  };

  inputs?: Inputs;
  constructor() {
    super();
  }

  setup() {
    this.addScene(new Scene("main", this.viewer));
    let character = new Character(this.getScene("main"));

    this.inputs = new Inputs(document.body);
  }
  loop() {
    console.log(this.inputs?.collector);
  }
}

export default Zelda;
