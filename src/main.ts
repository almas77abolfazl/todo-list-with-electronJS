import { app } from "electron";
import Window from "./helpers/window";

import { onCreateMainWindow } from "./main/message-manager/message-manager";

let mainWindow: Window;
let indexHtmlFileAddress = `${__dirname}/index.html`;

function createMainWindow(): void {
  mainWindow = new Window(indexHtmlFileAddress);
  mainWindow.window.webContents.openDevTools();
  onCreateMainWindow(mainWindow);
}

app.on("ready", createMainWindow);
app.on("window-all-closed", app.quit);
