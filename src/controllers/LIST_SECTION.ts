import { ipcRenderer } from "electron";

const allLists = [
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
  "first",
  "second",
  "third",
];
let lastSelectedList: HTMLLIElement = null;
if (allLists.length) {
  allLists.forEach((list, index) => {
    const container = document.querySelector(".list-container");
    const node = document.createElement("li");
    const text = document.createTextNode(list);
    node.appendChild(text);
    container?.appendChild(node);
    if (index === 0) {
      node.classList.add("is-selected");
      lastSelectedList = node;
    }
    node.addEventListener("click", onListClicked);
  });
}

const addListButton = document.querySelector(".add-list-button");
addListButton?.addEventListener("click", addNewList);

function addNewList() {
  ipcRenderer.send("add-list", true);
}

function onListClicked(event: PointerEvent) {
  const listNode = event.currentTarget as HTMLLIElement;
  listNode.classList.add("is-selected");
  if (lastSelectedList) {
    lastSelectedList.classList.remove("is-selected");
  }
  lastSelectedList = listNode;
}
