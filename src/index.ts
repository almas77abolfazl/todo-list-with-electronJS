import { app, ipcMain } from "electron";
import * as path from "path";
import Window from "./window";
// import DataStore from './data_store'

let mainWindow: Window, todoWindow: Window | null;

let file = path.join(process.cwd(), "index.html");
let addFile = path.join(process.cwd(), "add.html");

function createMainWindow() {
  mainWindow = new Window(file);

  mainWindow.once("show", () => {
    // mainWindow.webContents.send("todos", todoData.getTodos());
  });

  ipcMain.on("add-todo-window", createTodoWindow);
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

app.on("ready", createMainWindow);
app.on("window-all-closed", app.quit);
