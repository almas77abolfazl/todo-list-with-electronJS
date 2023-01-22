import { ipcMain } from "electron";
import Window from "../../helpers/window";
import {
  addNewList,
  saveNewList,
  sendAllLists,
} from "../bussiness/list-bussiness";
import {
  addNewTask,
  saveNewTask,
  getTasksByListId,
} from "../bussiness/task-bussiness";

export function onCreateMainWindow(mainWindow: Window): void {
  ipcMain.on("addList", (_event: Electron.IpcMainEvent, _args) => {
    addNewList(mainWindow);
  });
  ipcMain.on("saveList", (_event: Electron.IpcMainEvent, title: string) => {
    saveNewList(mainWindow, title);
  });
  ipcMain.on("addTask", (_event: Electron.IpcMainEvent, listId: string) => {
    addNewTask(mainWindow, listId);
  });
  ipcMain.on("saveTask", (_event: Electron.IpcMainEvent, title: string) => {
    saveNewTask(title);
  });
  ipcMain.on(
    "getTasksByListId",
    (_event: Electron.IpcMainEvent, listId: string) => {
      getTasksByListId(mainWindow, listId);
    }
  );
  setTimeout((timeOut) => {
    sendAllLists(mainWindow);
    clearTimeout(timeOut);
  }, 1500);
}
