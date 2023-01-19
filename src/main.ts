import { app, ipcMain } from "electron";
import Window from "./window";

let mainWindow: Window, todoWindow: Window | null;

let file = `${__dirname}/index.html`;
let addFile = `${__dirname}/gui/ADD_LIST.html`;

function createMainWindow() {
  mainWindow = new Window(file);
  mainWindow.window.webContents.send("updateHTML", true);
  ipcMain.on("add-list", createTodoWindow);
}

function createTodoWindow() {
  if (!todoWindow) {
    todoWindow = new Window(addFile, {
      width: 200,
      height: 200,
      parent: mainWindow.window,
      frame: false,
    });

    todoWindow.window.on("closed", () => {
      todoWindow = null;
    });

    todoWindow.window.removeMenu();
  }
}

app.on("ready", createMainWindow);
app.on("window-all-closed", app.quit);
