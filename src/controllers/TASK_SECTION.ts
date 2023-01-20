import { ipcRenderer } from "electron";
import { Task } from "../interfaces/task.interface";

const allTasks: Task[] = [];
let lastSelectedTaskActions: Element = null;
const searchElement = document.querySelector.bind(document);
const createElement = document.createElement.bind(document);
const createTextNode = document.createTextNode.bind(document);

searchElement(".add-task-button")?.addEventListener("click", addNewList);
loadTasks();

function addNewList(): void {
  ipcRenderer.send("add-task", true);
}

function loadTasks(): void {
  if (allTasks.length) {
    allTasks.forEach((task) => {
      const container = searchElement(".task-container");
      const taskNode = createElement("div");
      taskNode.setAttribute("id", task.id.toString());

      const actionsNode = createElement("div");
      const editButton = createElement("button");
      const deleteButton = createElement("button");
      const editText = createTextNode("edit");
      const deleteText = createTextNode("delete");
      editButton.appendChild(editText);
      deleteButton.appendChild(deleteText);
      actionsNode.appendChild(editButton);
      actionsNode.appendChild(deleteButton);
      actionsNode.classList.add(...["actions-container", "hide"]);
      editButton.classList.add("secondary-button");
      deleteButton.classList.add("secondary-button");

      const textNode = createElement("p");
      const text = createTextNode(task.title);
      textNode.appendChild(text);

      taskNode.classList.add("task");
      taskNode.appendChild(textNode);
      taskNode.appendChild(actionsNode);
      container?.appendChild(taskNode);
      taskNode.addEventListener("click", onTaskClicked);
      taskNode.addEventListener("dblclick", onTaskDblClicked);
    });
  }
}

function onTaskClicked(event: PointerEvent): void {
  const taskNode = event.currentTarget as HTMLDivElement;
  const actionsNode = taskNode.querySelector(".actions-container");
  actionsNode.classList.remove("hide");
  const lastSelectedTask = lastSelectedTaskActions?.parentElement;
  if (lastSelectedTaskActions && lastSelectedTask?.id !== taskNode.id) {
    lastSelectedTaskActions.classList.add("hide");
  }
  lastSelectedTaskActions = actionsNode;
}

function onTaskDblClicked(event: PointerEvent): void {
  const taskNode = event.currentTarget as HTMLDivElement;
  if (taskNode.classList.contains("completed")) {
    taskNode.classList.remove("completed");
  } else taskNode.classList.add("completed");
}
