import IViewer from "./core/Viewers/Viewer";

interface IDrawable {
  draw(viewer: IViewer, any?: any): void;
}
interface ISDrawable {
  new (...args: any[]): any;
  draw(viewer: IViewer, any?: any): void;
}

type TSpriteOptions = {
  columns?: number;
  rows?: number;
  count?: number;
  scale?: number;
  offsetRotation?: Rotation;
};
