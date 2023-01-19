import { ipcRenderer } from "electron";

const allLists = ["first", "second", "third"];

if (allLists.length) {
  allLists.forEach((list) => {
    const container = document.querySelector(".list-container");
    const node = document.createElement("li");
    const text = document.createTextNode(list);
    node.appendChild(text);
    container?.appendChild(node);
  });
}

const addListButton = document.querySelector(".add-list-button");
addListButton?.addEventListener("click", addNewList);

function addNewList() {
  ipcRenderer.send("add-list", true);
}
