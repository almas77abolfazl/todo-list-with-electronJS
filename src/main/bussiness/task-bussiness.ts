import Window from "../../helpers/window";
import crypto from "crypto";
import { Task } from "../../interfaces/task.interface";
import { allTasks, store } from "../store-manager/store-manager";
import { mainWindow } from "../../main";

let taskWindowUrl = `${__dirname}/gui/task-window.html`;
let taskWindow: Window;
let currentListId: string = null;

export function showTaskWindow(listId: string, taskId?: string): void {
  currentListId = listId;
  taskWindow = new Window(taskWindowUrl, {
    title: "Add New Task",
    width: 300,
    height: 100,
    modal: true,
    resizable: false,
    parent: mainWindow.window,
  });
  if (!!taskId) {
    taskWindow.window.on("show", () => {
      const task = allTasks.find((x) => x.listId === listId && x.id == taskId);
      taskWindow.window.webContents.send("getTaskDefaultValue", task);
    });
  }
  taskWindow.window.on("close", () => {
    taskWindow = null;
  });
}

export function saveTask(title: string, taskId: string): void {
  if (!!taskId) {
    const task = allTasks.find((x) => x.id === taskId);
    task.title = title;
  } else {
    const newList: Task = {
      id: crypto.randomUUID(),
      title,
      listId: currentListId,
      completed: false,
    };
    allTasks.push(newList);
  }
  store.set("tasks", allTasks);
  taskWindow?.window.close();
  getTasksByListId(currentListId);
}

export function deleteTask(listId: string, taskId: string): void {
  const taskIndex = allTasks.findIndex(
    (x) => x.listId == listId && x.id == taskId
  );
  if (taskIndex >= 0) {
    allTasks.splice(taskIndex, 1);
    store.set("tasks", allTasks);
    getTasksByListId(listId);
  }
}

export function getTasksByListId(listId: string): void {
  const tasks = allTasks.filter((task) => task.listId == listId);
  mainWindow.window.webContents.send("loadTasksByListId", tasks);
}

export function completedChanges(
  completed: boolean,
  taskId: string,
  listId: string
): void {
  const task = allTasks.find((task) => task.id == taskId);
  task.completed = completed;
  store.set("tasks", allTasks);
  getTasksByListId(listId);
}
