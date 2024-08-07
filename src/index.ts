import Application from "./application/Application";
import Zelda from "./projects/Zelda/Zelda";

Application.start().then(() => {
  Application.loadProject(Zelda);
});

import "@/assets/styles/main.scss";
