import Store from "electron-store";

import { List } from "../../interfaces/list.interface";
import { Task } from "../../interfaces/task.interface";

export const store = new Store();
export let allLists: List[] = (store.get("lists") as List[]) ?? [];
export let allTasks: Task[] = (store.get("tasks") as Task[]) ?? [];
