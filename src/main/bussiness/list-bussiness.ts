import Window from "../../helpers/window";
import crypto from "crypto";
import { allLists, store } from "../store-manager/store-manager";
import { List } from "../../interfaces/list.interface";

let addListUrl = `${__dirname}/gui/ADD_LIST.html`;
let addListWindow: Window;

export function sendAllLists(mainWindow: Window) {
  mainWindow.window.webContents.send("loadLists", allLists);
}

export function addNewList(mainWindow: Window): void {
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

export function saveNewList(mainWindow: Window, title: string): void {
  const newList: List = { id: crypto.randomUUID(), title };
  allLists.push(newList);
  store.set("lists", allLists);
  addListWindow?.window.close();
  mainWindow.window.webContents.send("loadLists", allLists);
}
