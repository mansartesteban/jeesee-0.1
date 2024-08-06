import Application from "./application/Application";
import Tetris from "./projects/Tetris/Tetris";

Application.start().then(() => {
  Application.loadProject(Tetris);
});

import "@/assets/styles/main.scss";
