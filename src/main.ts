import { app, ipcMain } from "electron";
import Window from "./window";
import Store from "electron-store";
import crypto from "crypto";
import { List } from "./interfaces/list.interface";

let mainWindow: Window;
let addListWindow: Window;

let file = `${__dirname}/index.html`;
let addFile = `${__dirname}/gui/ADD_LIST.html`;

const store = new Store();
let allLists: List[] = [];

function createMainWindow() {
  mainWindow = new Window(file);
  mainWindow.window.webContents.send("updateHTML", true);
  ipcMain.on("add-list", addNewList);
  ipcMain.on("save-list", saveNewList);
  setTimeout((timeOut) => {
    allLists = (store.get("lists") as List[]) ?? [];
    mainWindow.window.webContents.send("lists", allLists);
    clearTimeout(timeOut);
  }, 500);
}

function addNewList(event: Electron.IpcMainEvent, args) {
  addListWindow = new Window(addFile, {
    title: "Add New List",
    width: 300,
    height: 100,
    modal: true,
    resizable: false,
    autoHideMenuBar: true,
    parent: mainWindow.window,
  });
  addListWindow.window.on("close", () => {
    addListWindow = null;
  });
}

function saveNewList(event: Electron.IpcMainEvent, title: string) {
  const newList = { id: crypto.randomUUID(), title };
  allLists.push(newList);
  store.set("lists", allLists);
  addListWindow?.window.close();
  mainWindow.window.webContents.send("lists", allLists);
}

app.on("ready", createMainWindow);
app.on("window-all-closed", app.quit);
