import { ipcRenderer } from "electron";
import { DomHelper } from "../../../helpers/dom-helper";
import { List } from "../../../interfaces/list.interface";
import { TodoListContainer } from "../todo-list-container/todo-list-container";

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
  const container = DomHelper.searchElement(".list-container");
  if (allLists.length) {
    DomHelper.searchElement(".empty-list")?.remove();
    allLists.forEach((list, index) => {
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
  } else {
    const pNode = DomHelper.createElement("p");
    pNode.classList.add("empty-list");
    const text = DomHelper.createTextNode("There is no list!");
    pNode.appendChild(text);
    container?.appendChild(pNode);
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

function addNewList(): void {
  ipcRenderer.send("addList", true);
}

function editNewList(): void {
  ipcRenderer.send("editList", lastSelectedList.id);
}

function deleteNewList(): void {
  if (lastSelectedList && confirm("are you sure?!") == true) {
    ipcRenderer.send("deleteList", lastSelectedList.id);
  }
}

setTimeout(() => {
  DomHelper.searchElement(".delete-list-button")?.addEventListener(
    "click",
    deleteNewList
  );
  DomHelper.searchElement(".add-list-button")?.addEventListener(
    "click",
    addNewList
  );
  DomHelper.searchElement(".edit-list-button")?.addEventListener(
    "click",
    editNewList
  );
}, 500);
