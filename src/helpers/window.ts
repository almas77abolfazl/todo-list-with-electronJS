import { BrowserWindow } from "electron";

const defaultProps: Readonly<any> = {
  width: 800,
  height: 800,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
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
