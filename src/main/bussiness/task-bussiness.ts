import Window from "../../helpers/window";
import crypto from "crypto";
import { Task } from "../../interfaces/task.interface";
import { allTasks, store } from "../store-manager/store-manager";

let addTaskUrl = `${__dirname}/gui/task-window.html`;
let addTaskWindow: Window;
let currentListId: string = null;

export function addNewTask(mainWindow: Window, listId: string): void {
  currentListId = listId;
  addTaskWindow = new Window(addTaskUrl, {
    title: "Add New Task",
    width: 300,
    height: 100,
    modal: true,
    resizable: false,
    parent: mainWindow.window,
  });
  addTaskWindow.window.webContents.openDevTools();
  addTaskWindow.window.on("close", () => {
    addTaskWindow = null;
  });
}

export function saveNewTask(title: string): void {
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

export function getTasksByListId(mainWindow: Window, listId: string): void {
  const tasks = allTasks.filter((task) => task.listId == listId);
  mainWindow.window.webContents.send("loadTasksByListId", tasks);
}
