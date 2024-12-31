import { app, Menu } from "electron";
import Window from "../helpers/window";
import { onCreateMainWindow } from "./message-manager/message-manager";

export let mainWindow: Window;
let indexHtmlFileAddress = `${__dirname}/index.html`;

function createMainWindow(): void {
  Menu.setApplicationMenu(null);
  mainWindow = new Window(indexHtmlFileAddress, {
    width: 800,
    height: 800,
    minWidth: 300,
    minHeight: 300,
  });
  onCreateMainWindow();
}

app.on("ready", createMainWindow);
app.on("window-all-closed", app.quit);
