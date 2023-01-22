import { ipcRenderer } from "electron";
import { DomHelper } from "../../helpers/dom-helper";
import { List } from "../../interfaces/list.interface";
import { TodoListContainer } from "./TODO_LIST_CONTAINER";

let allLists: List[] = [];
let lastSelectedList: HTMLElement = null;

ipcRenderer.on(
  "loadLists",
  (event: Electron.IpcRendererEvent, lists: List[]) => {
    allLists = lists;
    updateLists();
  }
);

function updateLists(): void {
  removeListsFromDom();
  loadLists();
}

function removeListsFromDom(): void {
  DomHelper.searchAllElement("li")?.forEach((el) => {
    el.remove();
  });
}

function loadLists(): void {
  if (allLists.length) {
    allLists.forEach((list, index) => {
      const container = DomHelper.searchElement(".list-container");
      const listNode = DomHelper.createElement("li");
      listNode.setAttribute("id", list.id.toString());
      const text = DomHelper.createTextNode(list.title);
      listNode.appendChild(text);
      container?.appendChild(listNode);
      if (index === 0) {
        listNode.classList.add("is-selected");
        lastSelectedList = listNode;
        TodoListContainer.prototype.selectedListId = listNode.id;
        ipcRenderer.send("getTasksByListId", listNode.id);
      }
      listNode.addEventListener("click", onListClicked);
    });
  }
}

function onListClicked(event: PointerEvent): void {
  const listNode = event.currentTarget as HTMLLIElement;
  if (listNode.id !== lastSelectedList.id) {
    listNode.classList.add("is-selected");
    if (lastSelectedList) lastSelectedList.classList.remove("is-selected");
    lastSelectedList = listNode;
    TodoListContainer.prototype.selectedListId = listNode.id;
    ipcRenderer.send("getTasksByListId", listNode.id);
  }
}

DomHelper.searchElement(".add-list-button")?.addEventListener(
  "click",
  addNewList
);

function addNewList(): void {
  ipcRenderer.send("addList", true);
}

DomHelper.searchElement(".edit-list-button")?.addEventListener(
  "click",
  editNewList
);

function editNewList(): void {
  ipcRenderer.send("editList", lastSelectedList.id);
}

DomHelper.searchElement(".delete-list-button")?.addEventListener(
  "click",
  deleteNewList
);

function deleteNewList(): void {
  ipcRenderer.send("deleteList", true);
}
