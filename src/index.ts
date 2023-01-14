import electron from "electron";
import Window from "./window";

let mainWindow: Window, todoWindow: Window | null;

let file = `${__dirname}/index.html`;
let addFile = `${__dirname}/gui/ADD_LIST.html`;

function createMainWindow() {
  mainWindow = new Window(file);
  mainWindow.webContents.send("updateHTML", true);
  electron.ipcMain.on("add-list", createTodoWindow);
}

function createTodoWindow() {
  if (!todoWindow) {
    todoWindow = new Window(addFile, {
      width: 200,
      height: 200,
      parent: mainWindow,
      frame: false,
    });

    todoWindow.on("closed", () => {
      todoWindow = null;
    });

    todoWindow.removeMenu();
  }
}

electron.app.on("ready", createMainWindow);
electron.app.on("window-all-closed", electron.app.quit);
