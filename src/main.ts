import { app, ipcMain } from "electron";
import Window from "./window";
import Store from "electron-store";
import crypto from "crypto";
import { List } from "./interfaces/list.interface";
import { Task } from "./interfaces/task.interface";

let mainWindow: Window;
let addListWindow: Window;
let addTaskWindow: Window;

let file = `${__dirname}/index.html`;
let addListUrl = `${__dirname}/gui/ADD_LIST.html`;
let addTaskUrl = `${__dirname}/gui/ADD_TASK.html`;

const store = new Store();
let allLists: List[] = (store.get("lists") as List[]) ?? [];
let allTasks: Task[] = (store.get("tasks") as Task[]) ?? [];

let currentListId: string = null;

function createMainWindow() {
  mainWindow = new Window(file);
  mainWindow.window.webContents.send("updateHTML", true);
  mainWindow.window.webContents.openDevTools();
  ipcMain.on("addList", addNewList);
  ipcMain.on("saveList", saveNewList);
  ipcMain.on("addTask", addNewTask);
  ipcMain.on("saveTask", saveNewTask);
  ipcMain.on("getTasksByListId", getTasksByListId);
  setTimeout((timeOut) => {
    mainWindow.window.webContents.send("loadLists", allLists);
    clearTimeout(timeOut);
  }, 1000);
}

function addNewList(event: Electron.IpcMainEvent, args) {
  addListWindow = new Window(addListUrl, {
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
  const newList: List = { id: crypto.randomUUID(), title };
  allLists.push(newList);
  store.set("lists", allLists);
  addListWindow?.window.close();
  mainWindow.window.webContents.send("loadLists", allLists);
}

function addNewTask(event: Electron.IpcMainEvent, listId: string) {
  currentListId = listId;
  addTaskWindow = new Window(addTaskUrl, {
    title: "Add New Task",
    width: 300,
    height: 100,
    modal: true,
    resizable: false,
    autoHideMenuBar: true,
    parent: mainWindow.window,
  });
  addTaskWindow.window.on("close", () => {
    addTaskWindow = null;
  });
}

function saveNewTask(event: Electron.IpcMainEvent, title: string) {
  const newList: Task = {
    id: crypto.randomUUID(),
    title,
    listId: currentListId,
    completed: false,
  };
  allTasks.push(newList);
  store.set("tasks", allTasks);
  addTaskWindow?.window.close();
  getTasksByListId(null, currentListId);
}

function getTasksByListId(_event: Electron.IpcMainEvent, listId: string) {
  const tasks = allTasks.filter((task) => task.listId == listId);
  mainWindow.window.webContents.send("loadTasksByListId", tasks);
}

app.on("ready", createMainWindow);
app.on("window-all-closed", app.quit);
