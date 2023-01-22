import { ipcMain } from "electron";
import Window from "../../helpers/window";
import {
  showListWindow,
  saveNewList,
  sendAllLists,
  deleteList,
} from "../bussiness/list-bussiness";
import {
  addNewTask,
  saveNewTask,
  getTasksByListId,
} from "../bussiness/task-bussiness";

export function onCreateMainWindow(mainWindow: Window): void {
  ipcMain.on("addList", (_event: Electron.IpcMainEvent, _args) => {
    showListWindow(mainWindow);
  });
  ipcMain.on("editList", (_event: Electron.IpcMainEvent, listId) => {
    showListWindow(mainWindow, listId);
  });
  ipcMain.on(
    "saveList",
    (_event: Electron.IpcMainEvent, title: string, listId: string) => {
      saveNewList(mainWindow, title, listId);
    }
  );
  ipcMain.on("deleteList", (_event: Electron.IpcMainEvent, listId: string) => {
    deleteList(mainWindow, listId);
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
