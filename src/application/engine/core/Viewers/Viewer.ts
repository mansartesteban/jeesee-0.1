import ImplementError from "../../../error/ImplementError";
import IViewer from "./IViewer";

class Viewer implements IViewer {
  render(node: Element): void {
    throw new ImplementError("render", "Viewer");
  }
}

export default Viewer;
