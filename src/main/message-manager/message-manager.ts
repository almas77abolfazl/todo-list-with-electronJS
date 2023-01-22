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

export function onCreateMainWindow(): void {
  ipcMain.on("addList", (_event: Electron.IpcMainEvent, _args) => {
    showListWindow();
  });
  ipcMain.on("editList", (_event: Electron.IpcMainEvent, listId) => {
    showListWindow(listId);
  });
  ipcMain.on(
    "saveList",
    (_event: Electron.IpcMainEvent, title: string, listId: string) => {
      saveNewList(title, listId);
    }
  );
  ipcMain.on("deleteList", (_event: Electron.IpcMainEvent, listId: string) => {
    deleteList(listId);
  });
  ipcMain.on("addTask", (_event: Electron.IpcMainEvent, listId: string) => {
    addNewTask(listId);
  });
  ipcMain.on("saveTask", (_event: Electron.IpcMainEvent, title: string) => {
    saveNewTask(title);
  });
  ipcMain.on(
    "getTasksByListId",
    (_event: Electron.IpcMainEvent, listId: string) => {
      getTasksByListId(listId);
    }
  );
  setTimeout((timeOut) => {
    sendAllLists();
    clearTimeout(timeOut);
  }, 1000);
}
