import Window from "../../helpers/window";
import crypto from "crypto";
import { allLists, allTasks, store } from "../store-manager/store-manager";
import { List } from "../../interfaces/list.interface";
import { mainWindow } from "../main";
import { getTasksByListId } from "./task-bussiness";

let listWindowUrl = `${__dirname}\\gui\\list-section\\list-window.html`;
let listWindow: Window;

console.log("*******************   " + __dirname + "   ********************");
console.log(
  "*******************   " + listWindowUrl + "   ********************"
);

export function sendAllLists() {
  mainWindow.window.webContents.send("loadLists", allLists);
}

export function showListWindow(listId?: string): void {
  console.log("hiiii");
  console.log(__dirname);
  console.log(listWindowUrl);

  listWindow = new Window(listWindowUrl, {
    title: !!listId ? "Edit List" : "Add New List",
    width: 300,
    height: 100,
    modal: true,
    resizable: false,
    parent: mainWindow.window,
  });
  if (!!listId) {
    listWindow.window.on("show", () => {
      const list = allLists.find((x) => x.id === listId);
      listWindow.window.webContents.send("getListDefaultValue", list);
    });
  }
  listWindow.window.on("close", () => {
    listWindow = null;
  });
}

export function saveList(title: string, listId: string): void {
  if (listId) {
    const list = allLists.find((x) => x.id === listId);
    list.title = title;
  } else {
    const newList: List = { id: crypto.randomUUID(), title };
    allLists.push(newList);
  }
  store.set("lists", allLists);
  listWindow?.window.close();
  mainWindow.window.webContents.send("loadLists", allLists);
}

export function deleteList(listId: string): void {
  const listIndex = allLists.findIndex((x) => x.id == listId);
  if (listIndex >= 0) {
    const tasksThatShouldBeDeleted = allTasks.filter((x) => x.listId == listId);
    tasksThatShouldBeDeleted.forEach((task) => {
      const taskIndex = allTasks.findIndex((x) => x.id == task.id);
      allTasks.splice(taskIndex, 1);
      store.set("tasks", allTasks);
      getTasksByListId(allLists[0].id);
    });
    allLists.splice(listIndex, 1);
    store.set("lists", allLists);
    mainWindow.window.webContents.send("loadLists", allLists);
  }
}
