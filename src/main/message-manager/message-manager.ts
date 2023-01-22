import { ipcMain } from "electron";
import { mainWindow } from "../../main";
import {
  showListWindow,
  saveNewList,
  sendAllLists,
  deleteList,
} from "../bussiness/list-bussiness";
import {
  showTaskWindow,
  saveNewTask,
  getTasksByListId,
} from "../bussiness/task-bussiness";

export function onCreateMainWindow(): void {
  mainWindow.window.on("show", () => {
    setTimeout((t) => {
      sendAllLists();
      clearTimeout(t)
    }, 500);
  });

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
    showTaskWindow(listId);
  });
  ipcMain.on(
    "editTask",
    (_event: Electron.IpcMainEvent, listId: string, taskId: string) => {
      showTaskWindow(listId, taskId);
    }
  );
  ipcMain.on(
    "saveTask",
    (_event: Electron.IpcMainEvent, title: string, taskId: string) => {
      saveNewTask(title, taskId);
    }
  );
  ipcMain.on(
    "getTasksByListId",
    (_event: Electron.IpcMainEvent, listId: string) => {
      getTasksByListId(listId);
    }
  );
}
