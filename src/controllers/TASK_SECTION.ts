import { ipcRenderer } from "electron";

const allTasks = [
  { id: 1, listId: 1, name: "first", completed: false },
  { id: 2, listId: 1, name: "second", completed: false },
  { id: 3, listId: 1, name: "third", completed: true },
  { id: 4, listId: 1, name: "first", completed: false },
  { id: 5, listId: 1, name: "second", completed: false },
  { id: 6, listId: 2, name: "third", completed: true },
  { id: 7, listId: 2, name: "first", completed: false },
  { id: 8, listId: 3, name: "second", completed: false },
  { id: 9, listId: 3, name: "third", completed: true },
  { id: 10, listId: 3, name: "first", completed: false },
  { id: 11, listId: 3, name: "second", completed: false },
  { id: 12, listId: 4, name: "third", completed: true },
  { id: 13, listId: 4, name: "first", completed: false },
  { id: 14, listId: 4, name: "second", completed: false },
  { id: 15, listId: 4, name: "third", completed: true },
  { id: 16, listId: 4, name: "first", completed: false },
  { id: 17, listId: 4, name: "second", completed: false },
  { id: 18, listId: 4, name: "third", completed: true },
  { id: 19, listId: 2, name: "first", completed: false },
  { id: 20, listId: 3, name: "second", completed: false },
  { id: 21, listId: 3, name: "third", completed: true },
];

if (allTasks.length) {
  allTasks.forEach((task) => {
    const container = document.querySelector(".task-container");
    const taskNode = document.createElement("div");
    taskNode.setAttribute("id", task.id.toString());

    const actionsNode = document.createElement("div");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const editText = document.createTextNode("edit");
    const deleteText = document.createTextNode("delete");
    editButton.appendChild(editText);
    deleteButton.appendChild(deleteText);
    actionsNode.appendChild(editButton);
    actionsNode.appendChild(deleteButton);
    actionsNode.classList.add(...["actions-container", "hide"]);
    editButton.classList.add("secondary-button");
    deleteButton.classList.add("secondary-button");

    const textNode = document.createElement("p");
    const text = document.createTextNode(task.name);
    textNode.appendChild(text);

    taskNode.classList.add("task");
    taskNode.appendChild(textNode);
    taskNode.appendChild(actionsNode);
    container?.appendChild(taskNode);
    taskNode.addEventListener("click", onTaskClicked);
    taskNode.addEventListener("dblclick", onTaskDblClicked);
  });
}

const addListButton = document.querySelector(".add-task-button");
addListButton?.addEventListener("click", addNewList);

function addNewList() {
  ipcRenderer.send("add-task", true);
}

let lastSelectedTaskActions: Element = null;

function onTaskClicked(event: PointerEvent) {
  const taskNode = event.currentTarget as HTMLDivElement;
  const actionsNode = taskNode.querySelector(".actions-container");
  actionsNode.classList.remove("hide");
  const lastSelectedTask = lastSelectedTaskActions?.parentElement;
  if (lastSelectedTaskActions && lastSelectedTask?.id !== taskNode.id) {
    lastSelectedTaskActions.classList.add("hide");
  }
  lastSelectedTaskActions = actionsNode;
}

function onTaskDblClicked(event: PointerEvent) {
  const taskNode = event.currentTarget as HTMLDivElement;
  if (taskNode.classList.contains("completed")) {
    taskNode.classList.remove("completed");
  } else taskNode.classList.add("completed");
}
