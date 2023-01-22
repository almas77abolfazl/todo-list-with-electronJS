import Window from "../../helpers/window";
import crypto from "crypto";
import { allLists, store } from "../store-manager/store-manager";
import { List } from "../../interfaces/list.interface";

let addListUrl = `${__dirname}/gui/list-window.html`;
let addListWindow: Window;

export function sendAllLists(mainWindow: Window) {
  mainWindow.window.webContents.send("loadLists", allLists);
}

export function showListWindow(mainWindow: Window, listId?: string): void {
  addListWindow = new Window(addListUrl, {
    title: !!listId ? "Edit List" : "Add New List",
    width: 300,
    height: 100,
    modal: true,
    resizable: false,
    parent: mainWindow.window,
  });
  if (!!listId) {
    setTimeout((t) => {
      const list = allLists.find((x) => x.id === listId);
      addListWindow.window.webContents.send("getListDefaultValue", list);
      clearTimeout(t);
    }, 1000);
  }
  addListWindow.window.on("close", () => {
    addListWindow = null;
  });
}

export function saveNewList(
  mainWindow: Window,
  title: string,
  listId: string
): void {
  if (listId) {
    const list = allLists.find((x) => x.id === listId);
    list.title = title;
  } else {
    const newList: List = { id: crypto.randomUUID(), title };
    allLists.push(newList);
  }
  store.set("lists", allLists);
  addListWindow?.window.close();
  mainWindow.window.webContents.send("loadLists", allLists);
}
