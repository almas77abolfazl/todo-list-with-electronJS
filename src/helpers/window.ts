import { BrowserWindow } from "electron";

const defaultProps: Readonly<Electron.BrowserWindowConstructorOptions> = {
  show: false,
  backgroundColor: "#d5cea3",
  titleBarStyle: "hidden",
  titleBarOverlay: {
    color: "#bfb88d",
    symbolColor: "#000",
    height: 26,
  },
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
  },
};

class Window {
  window: BrowserWindow;
  constructor(
    file: string,
    options?: Electron.BrowserWindowConstructorOptions
  ) {
    this.window = new BrowserWindow({ ...defaultProps, ...options });
    this.window.loadFile(file);
    this.window.once("ready-to-show", this.window.show);
  }
}

export default Window;
