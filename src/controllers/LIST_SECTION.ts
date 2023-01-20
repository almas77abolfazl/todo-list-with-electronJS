import { ipcRenderer } from "electron";
import { List } from "../interfaces/list.interface";

let allLists: List[] = [];
let lastSelectedList: HTMLLIElement = null;
const searchElement = document.querySelector.bind(document);
const searchAllElement = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);

searchElement(".add-list-button")?.addEventListener("click", addNewList);
loadLists();

ipcRenderer.on("lists", (event: Electron.IpcRendererEvent, lists: List[]) => {
  allLists = lists;
  removeListsFromDom();
  loadLists();
});

function removeListsFromDom(): void {
  searchAllElement("li").forEach((el) => {
    el.remove();
  });
}

function addNewList(): void {
  ipcRenderer.send("add-list", true);
}

function loadLists(): void {
  if (allLists.length) {
    allLists.forEach((list, index) => {
      const container = searchElement(".list-container");
      const node = createElement("li");
      const text = createTextNode(list.title);
      node.appendChild(text);
      container?.appendChild(node);
      if (index === 0) {
        node.classList.add("is-selected");
        lastSelectedList = node;
      }
      node.addEventListener("click", onListClicked);
    });
  }
}

function onListClicked(event: PointerEvent): void {
  const listNode = event.currentTarget as HTMLLIElement;
  listNode.classList.add("is-selected");
  if (lastSelectedList) lastSelectedList.classList.remove("is-selected");
  lastSelectedList = listNode;
}
